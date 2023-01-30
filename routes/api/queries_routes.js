import express from "express";
import {
  getAllQueries,
  createNewQuery,
  deleteQuery,
} from "../../controllers/queryController.js";

const router = express.Router();

router.route("/").get(getAllQueries).post(createNewQuery);

router.route("/:id").delete(deleteQuery);
export default router;
