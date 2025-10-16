import express from "express"
import { getAllPosts, createPost } from "../controllers/postsController.js"

const router = express.Router()

// GET /api/posts - Get all posts
router.get("/", getAllPosts)

// POST /api/posts - Create a new post
router.post("/", createPost)

export default router
