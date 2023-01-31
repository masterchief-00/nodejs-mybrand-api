import express from "express";
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

router.route("/").get(getAllBlogs).post(upload.single("image"),createNewBlog);

router.route("/:id").put(updateBlog).get(findBlog).delete(deleteBlog);

export default router;
