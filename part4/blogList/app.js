import { MONGODB_URI } from "./utils/config.js";
import express from "express";
const app = express();
import middleware from "./utils/middleware.js";
import cors from "cors";
import mongoose from "mongoose";
import blogsRouter from "./controllers/blogs.js";
import usersRouter from "./controllers/users.js";
import loginRouter from "./controllers/login.js";
import { info } from "./utils/logger.js";

mongoose.set("strictQuery", false);
info("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    info(`connected to ${MONGODB_URI}`);
  })
  .catch((error) => {
    info("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
