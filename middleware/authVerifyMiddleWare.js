import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

export const verifyUserToken = (req, res, next) => {
  if (!req.headers.authorization && !req.cookies.user_token) {
    return res.status(401).json({ message: "Unauthorized request" });
  }

  const token = req.headers.authorization
    ? req.headers["authorization"].split(" ")[1]
    : req.cookies.user_token;

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SEKRET);
    req.user = decoded.userInfo;
    next();
  } catch (err) {
    res.status(400).json({ message: "invalid token" });
  }
};

export default verifyUserToken;
