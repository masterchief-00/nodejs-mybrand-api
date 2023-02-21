import express from "express";
import { project_schema } from "../../config/validation.js";
import path from "path";
import {
  createNewProject,
  findProject,
  getAllProjects,
} from "../../controllers/projectsController.js";
import verifyUserToken from "../../middleware/authVerifyMiddleWare.js";
import multer from "multer";
import validate from "../../middleware/validationMiddleWare.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router
  .route("/")
  .get(getAllProjects)
  .post(
    [verifyUserToken, upload.array("image"), validate(project_schema)],
    createNewProject
  );

router.route("/:id").get(findProject);

export default router;

/**
 * @openapi
 *  components:
 *      schemas:
 *          Project:
 *              type: object
 *              properties:
 *                  title:
 *                    type: string
 *                  description:
 *                    type: string
 *                  image :
 *                    type: string
 *                    format: binary
 *                  tools :
 *                    type: string
 *          Project_success:
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
 */

/**
 * @openapi
 * '/projects':
 *  get:
 *     tags:
 *     - Projects
 *     summary: Get all projects
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
 *                description:
 *                  type: string
 *                image:
 *                  type: string
 *                tools:
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
 * '/projects':
 *  post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Projects
 *     summary: create a new project
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             $ref: '#components/schemas/Project'
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
 *                description:
 *                  type: string
 *                image:
 *                  type: string
 *                tools:
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
 * /projects/{id}:
 *  get:
 *        tags:
 *        - Projects
 *        summary: get a single project
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
 *                 $ref: '#components/schemas/Project_success'
 *          400:
 *            description: Bad request
 */
