import pool from "../db.js"

export const Post = {
  /**
   * @description Get all posts with their authors, ordered by creation time.
   * This is a flat list of all posts.
   * @returns {Promise<Array>} A promise that resolves to an array of posts.
   */
  async findAll() {
    const { rows } = await pool.query(`
      SELECT
        p.id,
        p.parent_id,
        p.base_number,
        p.operation,
        p.operand,
        u.full_name AS author,
        p.created_at
      FROM posts p
      JOIN users u ON u.id = p.author_id
      ORDER BY p.created_at
    `)
    return rows
  },

  /**
   * @description Create a new post.
   * @param {object} postData - The data for the new post.
   * @returns {Promise<object>} A promise that resolves to the created post.
   */
  async create({ author_id, parent_id, base_number, operation, operand }) {
    const { rows } = await pool.query(
      `INSERT INTO posts (author_id, parent_id, base_number, operation, operand)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [author_id, parent_id, base_number, operation, operand]
    )
    return rows[0]
  },

  /**
   * @description Find a single post by its ID, including the author's full name.
   * @param {number} id - The ID of the post to find.
   * @returns {Promise<object|undefined>} A promise that resolves to the post object or undefined if not found.
   */
  async findById(id) {
    const { rows } = await pool.query(`
      SELECT
        p.id,
        p.parent_id,
        p.base_number,
        p.operation,
        p.operand,
        u.full_name AS author,
        p.created_at
      FROM posts p
      JOIN users u ON u.id = p.author_id
      WHERE p.id = $1
    `, [id]);
    return rows[0];
  }
}
