import express from "express";
import validate from "../../middleware/validationMiddleWare.js";
import { blog_schema, comment_schema } from "../../config/validation.js";

import {
  getAllBlogs,
  createNewBlog,
  updateBlog,
  findBlog,
  deleteBlog,
  likeBlog,
} from "../../controllers/blogsController.js";
import { commentToBlog } from "../../controllers/commentsController.js";
import multer from "multer";
import verifyUserToken from "../../middleware/authVerifyMiddleWare.js";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

/**
 * @openapi
 *  components:
 *      schemas:
 *          Blog:
 *              type: object
 *              properties:
 *                  title:
 *                    type: string
 *                  body:
 *                    type: string
 *                  image :
 *                    type: string
 *                    format: binary
 */

/**
 * @openapi
 * '/blogs':
 *  get:
 *     tags:
 *     - Blogs
 *     summary: Get all blogs
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                body:
 *                  type: string
 *                image:
 *                  type: string
 *                author:
 *                  type: string
 *                date:
 *                  type: string
 *                _id:
 *                  type: string
 *                __v:
 *                  type: number
 *       400:
 *         description: Bad request
 */

/**
 * @openapi
 * '/blogs':
 *  post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Blogs
 *     summary: create a new blog
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             $ref: '#components/schemas/Blog'
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *          application/json:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                body:
 *                  type: string
 *                image:
 *                  type: string                
 *                _id:
 *                  type: string
 *                __v:
 *                  type: number
 *       400:
 *         description: Bad request
 */

/**
 * @openapi
 * '/blogs':
 *  post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Blogs
 *     summary: create a new blog
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             $ref: '#components/schemas/Blog'
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *          application/json:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                body:
 *                  type: string
 *                image:
 *                  type: string                
 *                _id:
 *                  type: string
 *                __v:
 *                  type: number
 *       400:
 *         description: Bad request
 */

router
  .route("/")
  .get(getAllBlogs)
  .post(
    [verifyUserToken, upload.single("image"), validate(blog_schema)],
    createNewBlog
  );

router
  .route("/:id/comments")
  .post([verifyUserToken, validate(comment_schema)], commentToBlog);

router.route("/:id/likes").get(verifyUserToken, likeBlog);

router
  .route("/:id")
  .put(
    [verifyUserToken, upload.single("image"), validate(blog_schema)],
    updateBlog
  )
  .get(findBlog)
  .delete(verifyUserToken, deleteBlog);

export default router;
