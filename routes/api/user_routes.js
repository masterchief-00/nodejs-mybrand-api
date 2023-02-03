import express from "express";
import passport from "passport";
import {
  getUsers,
  handleLogin_simple,
  handleLogout,
  handleSignup_simple,
} from "../../controllers/userController.js";
import { person_schema, login_schema } from "../../config/validation.js";
import validate from "../../middleware/validationMiddleWare.js";
import verifyUserToken from "../../middleware/authVerifyMiddleWare.js";

const router = express.Router();

router.route("/").get(verifyUserToken, getUsers);
router
  .route("/signup")
  .post(
    [
      validate(person_schema),
      passport.authenticate("local-signup", { session: false }),
    ],
    handleSignup_simple
  );
router
  .route("/login")
  .post(
    [
      validate(login_schema),
      passport.authenticate("local-login", { session: false }),
    ],
    handleLogin_simple
  );
router.route("/logout").get(verifyUserToken, handleLogout);
export default router;
