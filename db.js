import pkg from "pg"
import dotenv from "dotenv"

dotenv.config()
const { Pool } = pkg

// Connect to PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export default pool
