import express from "express";
import {
  getAllQueries,
  createNewQuery,
  deleteQuery,
} from "../../controllers/queryController.js";
import validate from "../../middleware/validationMiddleWare.js";
import { query_schema } from "../../config/validation.js";
import verifyUserToken from "../../middleware/authVerifyMiddleWare.js";

const router = express.Router();

router
  .route("/")
  .get(verifyUserToken, getAllQueries)
  .post(validate(query_schema), createNewQuery);

router.route("/:id").delete(verifyUserToken, deleteQuery);
export default router;
