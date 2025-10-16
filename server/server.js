import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import postsRoutes from "./routes/posts.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// API Routes
app.use("/api/posts", postsRoutes)

app.get("/", (req, res) => {
  res.send("Backend is running 🚀")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
