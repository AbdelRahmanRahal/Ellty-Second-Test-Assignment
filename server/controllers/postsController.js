import { Post } from "../models/postModel.js"

/**
 * @description Get all posts with their authors, ordered by creation time.
 * This is a flat list of all posts.
 */
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll()
    res.json(posts)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: "Database error while fetching posts" })
  }
}

/**
 * @description Create a new post.
 * It can be a root post (with base_number) or a reply (with parent_id, operation, operand).
 */
export const createPost = async (req, res) => {
  const { author_id, parent_id, base_number, operation, operand } = req.body

  // Basic validation
  if (!author_id) {
    return res.status(400).json({ error: "author_id is required" })
  }

  try {
    const newPost = await Post.create({
      author_id,
      parent_id,
      base_number,
      operation,
      operand,
    })
    res.status(201).json(newPost)
  } catch (err) {
    console.error(err.message)
    // The DB constraint will catch invalid post types
    res.status(500).json({ error: "Database error or invalid post data" })
  }
}
