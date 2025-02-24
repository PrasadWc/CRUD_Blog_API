import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

  const app = express();
  app.use(cookieParser());
  app.use(express.json());

  app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true, 
    })
);

  app.listen(5050, () => {
    console.log("server listening on port 5050");
  });

  app.use("/users", userRoutes);
  app.use("/posts", postRoutes);