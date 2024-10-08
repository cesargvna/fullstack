import bcrypt from "bcrypt";
import express from "express";
const usersRouter = express.Router();
import User from "../models/user.js";

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;
  if (password.length < 3) {
    return res
      .status(400)
      .json({ error: "password must be at least 3 characters long" });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });
  res.json(users);
});

export default usersRouter;
