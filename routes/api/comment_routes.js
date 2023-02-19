import express from "express";
import {
  findComment,
  getReplies,
  likeComment,
  replyToComment,
} from "../../controllers/commentsController.js";
import verifyUserToken from "../../middleware/authVerifyMiddleWare.js";
const router = express.Router();

/**
 * @openapi
 * /comments/{id}/likes:
 *  get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Comment & likes
 *     summary: like a comment
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

/**
 * @openapi
 * /comments/{id}:
 *  get:
 *        security:
 *        - bearerAuth: []
 *        tags:
 *        - Comment & likes
 *        summary: get a single comment
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
 *               type: object
 *               properties:
 *                   _id:
 *                     type: string
 *                   blog_id:
 *                     type: string
 *                   coment:
 *                     type: string
 *                   names:
 *                     type: string
 *                   date:
 *                     type: string
 *                   __v:
 *                     type: number
 *          400:
 *            description: Bad request
 */

/**
 * @openapi
 * /comments/{id}/reply:
 *  post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Comment & likes
 *     summary: reply on a comment
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
 * /comments/{id}/replies:
 *  get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Comment & likes
 *     summary: get replies by comment id
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

router.route("/:id").get(verifyUserToken, findComment);

router.route("/:id/replies").get(verifyUserToken, getReplies);

router.route("/:id/reply").post(verifyUserToken, replyToComment);

router.route("/:id/likes").get(verifyUserToken, likeComment);

export default router;
