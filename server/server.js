import express from "express"
import cors from "cors"
import postsRoutes from "./routes/postsRoutes.js"

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors()) // Enable Cross-Origin Resource Sharing
app.use(express.json()) // To parse JSON bodies

// API Routes
app.use("/api/posts", postsRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

export default app
