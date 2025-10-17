import { useState, type FormEvent } from "react"
import { createPost } from "../api/posts.ts"
import Button from "./Button.tsx"
import Textbox from "./Textbox.tsx"
import "./NewPostForm.css"

interface NewPostFormProps {
  onPostCreated: () => void
}

const NewPostForm = ({ onPostCreated }: NewPostFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const baseNumberValue = formData.get("base_number") as string

    if (!baseNumberValue) {
      setError("Please enter a starting number.")
      setIsLoading(false)
      return
    }

    const base_number = parseInt(baseNumberValue, 10)

    const userSession = localStorage.getItem("user")
    if (!userSession) {
      setError("You must be logged in to post.")
      setIsLoading(false)
      return
    }
    const { token } = JSON.parse(userSession)

    try {
      await createPost({ base_number }, token)
      onPostCreated()
      e.currentTarget.reset() // Reset form on success
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="new-post-form" onSubmit={handleSubmit}>
      <h3>Create a New Post</h3>
      <div className="form-content">
        <Textbox name="base_number" placeholder="Number..." />
        <Button
          type="submit"
          label={isLoading ? "Posting..." : "Post"}
          disabled={isLoading}
        />
      </div>
      {error && <p className="form-error">{error}</p>}
    </form>
  )
}

export default NewPostForm
