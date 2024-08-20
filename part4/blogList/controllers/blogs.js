import express from "express";
import "express-async-errors";
const blogsRouter = express.Router();
import Blog from "../models/blog.js";

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const body = req.body;

  const user = req.user;

  if (!body.title || !body.url) {
    return res.status(400).json({ error: "title or url is missing" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  const user = req.user;
  if (user.id.toString() !== blog.user.toString()) {
    return res
      .status(401)
      .json({ error: "user unauthorized to delete this blog" });
  }
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

blogsRouter.put("/:id", async (req, res) => {
  const body = req.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });
  res.json(updatedBlog);
});

export default blogsRouter;
