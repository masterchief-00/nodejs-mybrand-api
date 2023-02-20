import express from "express";
import {
  getAllQueries,
  createNewQuery,
  deleteQuery,
  markRead,
} from "../../controllers/queryController.js";
import validate from "../../middleware/validationMiddleWare.js";
import { query_schema } from "../../config/validation.js";
import verifyUserToken from "../../middleware/authVerifyMiddleWare.js";

const router = express.Router();
/**
 * @openapi
 *  components:
 *      schemas:
 *          Query:
 *              type: object
 *              properties:
 *                  email:
 *                    type: string
 *                  names:
 *                    type: string
 *                  body:
 *                    type: string
 *          Query_success:
 *              type: object
 *              properties:
 *                  email:
 *                    type: string
 *                  names:
 *                    type: string
 *                  body:
 *                    type: string
 *                  date:
 *                    type: string
 *                  __v:
 *                    type: number
 *                  _id:
 *                    type: string
 *          Query_delete:
 *            type: object
 *            properties:
 *                acknowledged:
 *                  type: boolean
 *                deletedCount:
 *                  type: number
 */

/**
 * @openapi
 * '/queries':
 *  get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Queries
 *     summary: Get all queries
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                names:
 *                  type: string
 *                email:
 *                  type: string
 *                body:
 *                  type: string
 *       400:
 *         description: Bad request
 */

/**
 * @openapi
 * '/queries':
 *  post:
 *     tags:
 *     - Queries
 *     summary: send a query
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Query'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Query_success'
 *       400:
 *         description: Bad request
 */

/**
 * @openapi
 * '/queries/{id}/status':
 *  get:
 *     security:
 *          - bearerAuth: []
 *     tags:
 *     - Queries
 *     summary: mark as read
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
 *            schema:
 *              $ref: '#components/schemas/Query_success'
 *       400:
 *         description: Bad request
 */

/**
 * @openapi
 * /queries/{id}:
 *  delete:
 *        tags:
 *        - Queries
 *        summary: delete a query
 *        parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *        security:
 *          - bearerAuth: []
 *        responses:
 *          200:
 *            description: Success
 *            content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/Query_delete'
 *          400:
 *            description: Bad request
 */
router
  .route("/")
  .get(verifyUserToken, getAllQueries)
  .post(validate(query_schema), createNewQuery);

router.route("/:id/status").get(verifyUserToken, markRead);

router.route("/:id").delete(verifyUserToken, deleteQuery);
export default router;
