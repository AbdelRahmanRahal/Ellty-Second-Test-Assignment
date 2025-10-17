import express from "express"
import { getAllPosts, createPost } from "../controllers/postsController.js"
import requireAuth from "../middleware/requireAuth.js"

const router = express.Router()

router.get("/", getAllPosts)
router.post("/", requireAuth, createPost)

export default router
