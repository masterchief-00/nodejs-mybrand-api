import mongoose from "mongoose";
import app from "./server.js";

mongoose.connection.once("open", () => {
  console.log("-->Connected to mongoDB");
  app.listen(5000, () => {
    console.log("-->All stations, be advised the server is up and running!");
  });
});
