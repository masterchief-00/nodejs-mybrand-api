import express from "express";
import validate from "../../config/validationMiddleWare.js";
import { blog_schema } from "../../config/validation.js";

import {
  getAllBlogs,
  createNewBlog,
  updateBlog,
  findBlog,
  deleteBlog,
} from "../../controllers/blogsController.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router
  .route("/")
  .get(getAllBlogs)
  .post([upload.single("image"), validate(blog_schema)], createNewBlog);

router
  .route("/:id")
  .put([upload.single("image"), validate(blog_schema)], updateBlog)
  .get(findBlog)
  .delete(deleteBlog);

export default router;
