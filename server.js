import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/connectDB.js";
import blog_routes from "./routes/api/blog_routes.js";
import query_routes from "./routes/api/queries_routes.js";

const app = express();

// connect to db
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/blogs", blog_routes);
app.use("/query", query_routes);

mongoose.connection.once("open", () => {
  console.log("-->Connected to mongoDB");
  app.listen(5000, () => {
    console.log("-->All stations, be advised the server is up and running!");
  });
});
