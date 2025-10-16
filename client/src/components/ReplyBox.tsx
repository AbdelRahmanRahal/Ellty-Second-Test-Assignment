import { useState } from "react"
import OpButton from "./OpButton"
import Textbox from "./Textbox"
import "./ReplyBox.css"

interface ReplyBoxProps {
  id: string
}

const ReplyBox = ({ id }: ReplyBoxProps) => {
  const [isReplying, setIsReplying] = useState(false)

  const handleReplyClick = () => {
    if (isReplying) {
      // This is the second click, which will eventually post the reply.
      // For now, we'll log to the console and reset the state.
      console.log("Posting reply...")
      // TODO: Implement logic to get selected operator and textbox value.
      // TODO: Implement server submission.
      setIsReplying(false)
    } else {
      // This is the first click, reveal the controls.
      setIsReplying(true)
    }
  }

  return (
    <div className="reply-box">
      <button
        className={`submit-button ${isReplying ? "is-replying" : ""}`}
        onClick={handleReplyClick}
      >
        {isReplying ? "Post" : "Reply"}
      </button>
      <div className={`reply-controls ${isReplying ? "visible" : ""}`}>
        <OpButton name={`op-group-${id}`} Op="+" />
        <OpButton name={`op-group-${id}`} Op="-" />
        <OpButton name={`op-group-${id}`} Op="×" />
        <OpButton name={`op-group-${id}`} Op="/" />
        <Textbox placeholder="Reply..." />
      </div>
    </div>
  )
}

export default ReplyBox
