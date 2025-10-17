import { useState, type FormEvent } from "react"
import OpButton from "./OpButton"
import Textbox from "./Textbox"
import "./ReplyBox.css"
import { createPost } from "../api/posts"

interface ReplyBoxProps {
  id: string
  onReplyPosted: () => void // Callback to refresh posts
}

const ReplyBox = ({ id, onReplyPosted }: ReplyBoxProps) => {
  const [isReplying, setIsReplying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleToggleReply = () => {
    setIsReplying(!isReplying)
    setError(null) // Clear errors when toggling
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const operation = formData.get(`op-group-${id}`) as string | null
    const operandValue = formData.get("operand") as string

    if (!operation) {
      setError("Please select an operation.")
      setIsLoading(false)
      return
    }

    if (!operandValue) {
      setError("Please enter a number.")
      setIsLoading(false)
      return
    }

    const operand = parseInt(operandValue, 10)
    const parent_id = parseInt(id, 10)

    const userSession = localStorage.getItem("user")
    if (!userSession) {
      setError("You must be logged in to reply.")
      setIsLoading(false)
      return
    }
    const { token } = JSON.parse(userSession)

    try {
      await createPost({ parent_id, operation, operand }, token)
      // Reset form and state
      setIsReplying(false)
      onReplyPosted() // Trigger refresh in parent
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="reply-box" onSubmit={handleSubmit}>
      {!isReplying && (
        <button type="button" className="submit-button" onClick={handleToggleReply}>
          Reply
        </button>
      )}
      {isReplying && (
        <>
          <button type="submit" className="submit-button is-replying" disabled={isLoading}>
            {isLoading ? "Posting..." : "Post"}
          </button>
          <div className={`reply-controls ${isReplying ? "visible" : ""}`}>
            <OpButton name={`op-group-${id}`} Op="+" />
            <OpButton name={`op-group-${id}`} Op="-" />
            <OpButton name={`op-group-${id}`} Op="×" />
            <OpButton name={`op-group-${id}`} Op="/" />
            <Textbox name="operand" placeholder="Number..." />
            <button type="button" className="cancel-button" onClick={handleToggleReply}>
              Cancel
            </button>
            {error && <p className="reply-error">{error}</p>}
          </div>
        </>
      )}
    </form>
  )
}

export default ReplyBox
