import { test, after, beforeEach, describe } from "node:test";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import assert from "assert";
import {
  favoriteBlog,
  totalLikes,
  mostBlogs,
  mostLikes,
} from "../utils/list_helper.js";
import { blogs } from "./test_helper.js";
import Blog from "../models/blog.js";

const api = supertest(app);
const userLoged = async () => {
  const res = await api.post("/api/login").send({
    username: "gabriel",
    password: "gabriel",
  });
  return res.body;
};
describe("without conections to db", () => {
  test("total likes", () => {
    assert.strictEqual(totalLikes(blogs), 36);
  });

  test("favorite blog", () => {
    const favorite = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };
    assert.deepStrictEqual(favoriteBlog(blogs), favorite);
  });

  test("the most blogs", () => {
    const favorite = {
      author: "Robert C. Martin",
      blogs: 3,
    };
    assert.deepStrictEqual(mostBlogs(blogs), favorite);
  });

  test("the most likes", () => {
    const favorite = {
      author: "Edsger W. Dijkstra",
      likes: 17,
    };
    assert.deepStrictEqual(mostLikes(blogs), favorite);
  });

  describe("with connection to db", () => {
    beforeEach(async () => {
      await Blog.deleteMany({});
      await Blog.insertMany(blogs);
    });

    test("blogs are returned totally bogs 6 as json", async () => {
      const tokenUser = await userLoged();
      const blogs = await api
        .get("/api/blogs")
        .set("Authorization", `Bearer ${tokenUser.token}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(blogs.body.length, 6);
    });

    test("blogs berify proprety id", async () => {
      const tokenUser = await userLoged();
      const blogs = await api
        .get("/api/blogs")
        .set("Authorization", `Bearer ${tokenUser.token}`);
      blogs.body.forEach((blog) => {
        assert(blog.id);
      });
    });

    test("a valid blog can be added", async () => {
      const tokenUser = await userLoged();
      const newBlog = {
        title: "test",
        author: "test",
        url: "test",
        likes: 1,
        userId: "66c3c74aa5e763485feb7774",
      };
      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${tokenUser.token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const response = await api
        .get("/api/blogs")
        .set("Authorization", `Bearer ${tokenUser.token}`);
      const contents = response.body.map((r) => r.title);
      assert.strictEqual(response.body.length, blogs.length + 1);
      assert(contents.includes("test"));
    });

    test("if likes is missing, it will default to 0", async () => {
      const tokenUser = await userLoged();
      const newBlog = {
        title: "test2",
        author: "test2",
        url: "test2",
      };
      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${tokenUser.token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);
      const response = await api
        .get("/api/blogs")
        .set("Authorization", `Bearer ${tokenUser.token}`);
      const contents = response.body.map((r) => r.likes);
      assert(contents.includes(0));
    });

    test("if title and url is missing, return 400", async () => {
      const tokenUser = await userLoged();
      const newBlog = {
        author: "test3",
        likes: 3,
      };
      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${tokenUser.token}`)
        .send(newBlog)
        .expect(400);

      const response = await api
        .get("/api/blogs")
        .set("Authorization", `Bearer ${tokenUser.token}`);
      assert.strictEqual(response.body.length, blogs.length);
    });

    test("a blog can be deleted", async () => {
      const tokenUser = await userLoged();
      const response = await api
        .get("/api/blogs")
        .set("Authorization", `Bearer ${tokenUser.token}`);
      const blogToDelete = response.body[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `Bearer ${tokenUser.token}`)
        .expect(204);

      const blogsAtEnd = await api
        .get("/api/blogs")
        .set("Authorization", `Bearer ${tokenUser.token}`);
      assert.strictEqual(blogsAtEnd.body.length, blogs.length - 1);

      const contents = blogsAtEnd.body.map((r) => r.title);
      assert(!contents.includes(blogToDelete.title));
    });

    test("a blog can be updated", async () => {
      const tokenUser = await userLoged();
      const response = await api
        .get("/api/blogs")
        .set("Authorization", `Bearer ${tokenUser.token}`);
      const blogToUpdate = response.body[0];
      const newBlog = {
        likes: 100,
      };
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set("Authorization", `Bearer ${tokenUser.token}`)
        .send(newBlog)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await api
        .get("/api/blogs")
        .set("Authorization", `Bearer ${tokenUser.token}`);
      const blogUpdated = blogsAtEnd.body.find(
        (blog) => blog.id === blogToUpdate.id,
      );
      assert.strictEqual(blogUpdated.likes, 100);
    });

    test("a valid blog without token", async () => {
      const newBlog = {
        title: "testtoken",
        author: "testtoken",
        url: "testtoken",
        likes: 5,
        userId: "66c3c74aa5e763485feb7774",
      };
      const res = await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(401)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(res.body.error, "invalid token");
    });
    after(async () => {
      await mongoose.connection.close();
    });
  });
});
