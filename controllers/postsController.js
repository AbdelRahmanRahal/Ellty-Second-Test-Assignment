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
  // author_id is attached by the requireAuth middleware
  const { author_id } = req;
  const { parent_id, base_number, operation, operand } = req.body;

  try {
    const newPost = await Post.create({
      author_id,
      parent_id,
      base_number,
      operation,
      operand,
    })

    // To ensure the response includes the author's name, we can fetch the full post data
    const createdPostWithAuthor = await Post.findById(newPost.id);

    if (!createdPostWithAuthor) {
      return res.status(404).json({ error: "Could not retrieve created post." });
    }

    res.status(201).json(createdPostWithAuthor);
  } catch (err) {
    console.error(err.message)
    // The DB constraint will catch invalid post types
    res.status(500).json({ error: "Database error or invalid post data" })
  }
}
