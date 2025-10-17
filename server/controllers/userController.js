import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, "USE ACTUAL JWT TOKEN HERE IN DEPLOYMENT", {
    expiresIn: "3d",
  });
};

/**
 * @description Sign up a new user
 * @route POST /api/users/signup
 */
export const signupUser = async (req, res) => {
  const { username, full_name, password } = req.body;

  if (!username || !full_name || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken." });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const user = await User.create({ username, full_name, password_hash });

    const token = createToken(user.id);

    res.status(201).json({ username: user.username, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @description Sign in an existing user
 * @route POST /api/users/signin
 */
export const signinUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = createToken(user.id);

    res.status(200).json({ username: user.username, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};