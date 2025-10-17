import express from "express"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors()) // Enable Cross-Origin Resource Sharing
app.use(express.json()) // To parse JSON bodies

// Import routes
import postsRoutes from "./routes/postsRoutes.js";

// API Routes
app.use("/api/posts", postsRoutes)
app.use("/api/users", userRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

export default app
