import pool from "../db.js";

export const User = {
  /**
   * @description Create a new user.
   * @param {object} userData - The data for the new user.
   * @param {string} userData.username - The user's username.
   * @param {string} userData.full_name - The user's full name.
   * @param {string} userData.password_hash - The user's hashed password.
   * @returns {Promise<object>} A promise that resolves to the created user.
   */
  async create({ username, full_name, password_hash }) {
    const { rows } = await pool.query(
      `INSERT INTO users (username, full_name, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, username, full_name, password_hash`,
      [username, full_name, password_hash]
    );
    return rows[0];
  },

  /**
   * @description Find a user by their username.
   * @param {string} username - The username to search for.
   * @returns {Promise<object|undefined>} A promise that resolves to the user object or undefined if not found.
   */
  async findByUsername(username) {
    const { rows } = await pool.query(
      `SELECT id, username, full_name, password_hash
       FROM users
       WHERE username = $1`,
      [username]
    );
    return rows[0];
  },
};