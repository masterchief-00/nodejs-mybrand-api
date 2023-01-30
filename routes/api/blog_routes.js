import express from "express";
import {
  getAllBlogs,
  createNewBlog,
  updateBlog,
  findBlog,
  deleteBlog
} from "../../controllers/blogsController.js";

const router = express.Router();

router.route("/").get(getAllBlogs).post(createNewBlog);

router.route("/:id").put(updateBlog).get(findBlog).delete(deleteBlog);

export default router;
