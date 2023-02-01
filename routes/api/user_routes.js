import express from "express";
import {
  getUsers,
  handleLogin,
  handleSignup,
  handleLogout,
} from "../../controllers/userController.js";
import { person_schema, login_schema } from "../../config/validation.js";
import validate from "../../middleware/validationMiddleWare.js";
import verifyUserToken from "../../middleware/authVerifyMiddleWare.js";

const router = express.Router();

router.route("/").get(verifyUserToken, getUsers);
router.route("/signup").post(validate(person_schema), handleSignup);
router.route("/login").post(validate(login_schema), handleLogin);
router.route("/logout").get(verifyUserToken, handleLogout);
export default router;
