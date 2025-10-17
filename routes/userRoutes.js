import express from "express";
import { signupUser, signinUser } from "../controllers/userController.js";

const router = express.Router();

// Signup route
router.post("/signup", signupUser);

// Signin route
router.post("/signin", signinUser);

export default router;