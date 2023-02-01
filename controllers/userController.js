import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../model/User.js";
import jwt from "jsonwebtoken";

export const handleSignup = async (req, res) => {
  const duplicate = await User.findOne({ email: req.body.email }).exec();
  if (duplicate)
    return res.status(409).json({ message: "User already exists" });

  try {
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    const result = await User.create({
      names: req.body.names,
      email: req.body.email,
      password: hashedPwd,
      token: "",
    });

    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const handleLogin = async (req, res) => {
  const foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser) return res.status(400).json({ message: "User not found" });

  let match = await bcrypt.compare(req.body.password, foundUser.password);
  if (match) {
    const token = jwt.sign(
      {
        userInfo: {
          names: foundUser.names,
          email: foundUser.email,
        },
      },
      process.env.JWT_SEKRET,
      { expiresIn: "1h" }
    );

    foundUser.token = token;
    let result = await foundUser.save();

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 60 * 60 * 1000,
    });
    return res.json(result);
  }

  res.status(400).json({ message: "invalid credentials" });
};
export const handleLogout = async (req, res) => {
  const currentUser = await User.findOne({ email: req.user.email });

  if (!currentUser) return res.sendStatus(400);

  currentUser.token = "";
  const result = await currentUser.save();

  res.json({ message: "Logged out" });
};
export const getUsers = async (req, res) => {
  const users = await User.find();

  if (!users) return res.status(400).json({ message: "No users found" });

  res.json(users);
};
export default { handleSignup, handleLogin, getUsers, handleLogout };
