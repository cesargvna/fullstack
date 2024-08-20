import { test, after, beforeEach, describe } from "node:test";
import assert from "assert";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
const api = supertest(app);
import bcrypt from "bcrypt";

import User from "../models/user.js";

beforeEach(async () => {
  await User.deleteMany({});
  const password = "1234567";
  const user = new User({ username: "usuario", password });
  await user.save();
});

test("user not create with user not valid", async () => {
  const newUser = {
    username: "usuario",
    password: "12",
  };
  const res = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(
    res.body.error,
    "password must be at least 3 characters long",
  );
});

test("user not create with username already exist", async () => {
  const newUser = {
    username: "usuario",
    password: "1234567",
  };
  const res = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);
  assert.strictEqual(res.body.error, "Username must be unique");
});

after(async () => {
  await mongoose.connection.close();
});
