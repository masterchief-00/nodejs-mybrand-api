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
  findBlogByCategory,
} from "../../controllers/blogsController.js";
import {
  commentToBlog,
  getComments,
} from "../../controllers/commentsController.js";
import multer from "multer";
import verifyUserToken from "../../middleware/authVerifyMiddleWare.js";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router
  .route("/")
  .get(getAllBlogs)
  .post(
    [verifyUserToken, upload.single("image"), validate(blog_schema)],
    createNewBlog
  );

router.route("/:id/similar").get(findBlogByCategory);

router
  .route("/:id/comments")
  .post([verifyUserToken, validate(comment_schema)], commentToBlog)
  .get(verifyUserToken, getComments);

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
 *                  category:
 *                    type: string
 *                  image :
 *                    type: string
 *                    format: binary
 *          Blog_success:
 *                 title:
 *                   type: string
 *                 body:
 *                   type: string
 *                 image :
 *                   type: string
 *                 author:
 *                   type: string
 *                 _id:
 *                   type: string
 *                 __v:
 *                   type: string
 *          Blog_delete:
 *                 type: object
 *                 properties:
 *                     acknowledged:
 *                       type: boolean
 *                     deletedCount:
 *                       type: number
 *          Comment:
 *                 type: object
 *                 properties:
 *                     comment:
 *                       type: string
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
 *                category:
 *                    type: string
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
 * /blogs/{id}:
 *  put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Blogs
 *     summary: update a blog
 *     parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
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
 * /blogs/{id}:
 *  get:
 *        tags:
 *        - Blogs
 *        summary: get a single blog
 *        parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *        responses:
 *          200:
 *            description: Success
 *            content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/Blog_success'
 *          400:
 *            description: Bad request
 */

/**
 * @openapi
 * /blogs/{id}/similar:
 *  get:
 *        tags:
 *        - Blogs
 *        summary: get blogs by category
 *        parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *        responses:
 *          200:
 *            description: Success
 *            content:
 *             application/json:
 *               type: array
 *             items:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 body:
 *                   type: string
 *                 image:
 *                   type: string
 *                 author:
 *                   type: string
 *                 date:
 *                   type: string
 *                 _id:
 *                   type: string
 *                 __v:
 *                   type: number
 *          400:
 *            description: Bad request
 */

/**
 * @openapi
 * /blogs/{id}:
 *  delete:
 *        security:
 *           - bearerAuth: []
 *        tags:
 *        - Blogs
 *        summary: delete a blog
 *        parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *        responses:
 *          200:
 *            description: Success
 *            content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/Blog_delete'
 *          400:
 *            description: Bad request
 */

/**
 * @openapi
 * /blogs/{id}/comments:
 *  post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Comment & likes
 *     summary: comment on a blog
 *     parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *           schema:
 *             $ref: '#components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       400:
 *         description: Bad request
 */

/**
 * @openapi
 * /blogs/{id}/comments:
 *  get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Comment & likes
 *     summary: get comments by blog id
 *     parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                blog_id:
 *                  type: string
 *                names:
 *                  type: string
 *                comment:
 *                  type: string
 *                date:
 *                  type: string
 *                _id:
 *                  type: string
 *       400:
 *         description: Bad request
 */

/**
 * @openapi
 * /blogs/{id}/likes:
 *  get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Comment & likes
 *     summary: like a blog
 *     parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       400:
 *         description: Bad request
 */
