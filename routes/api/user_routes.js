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

/**
 * @openapi
 *  components:
 *      schemas:
 *          Auth:
 *              type: object
 *              properties:
 *                  email:
 *                    type: string
 *                  password:
 *                    type: string
 *          Auth_success:
 *               type: object
 *               properties:
 *                  message:
 *                     type: string
 *                  token:
 *                     type: string
 */

/**
 * @openapi
 * '/users/login':
 *  post:
 *     tags:
 *     - Login
 *     summary: Authenticate user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Auth'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Auth_success'            
 *       400:
 *         description: Bad request
 */


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
