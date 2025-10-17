import express from "express"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"

const app = express()
const PORT = process.env.PORT || 3000
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : []

// Middleware
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true)
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        "The CORS policy for this site does not allow access from the specified Origin."
      return callback(new Error(msg), false)
    }
    return callback(null, true)
  },
}

app.use(cors(corsOptions))
// app.use(cors()) // Enable Cross-Origin Resource Sharing (FOR DEV ONLY)
app.use(express.json()) // To parse JSON bodies

// Import routes
import postsRoutes from "./routes/postsRoutes.js"

// API Routes
app.use("/api/posts", postsRoutes)
app.use("/api/users", userRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

export default app
