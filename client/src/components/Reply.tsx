import "./Reply.css"
import ReplyBox from "./ReplyBox"

interface ReplyProps {
  id: string
  author: string
  // The content will be the number from the parent and the operator
  number: number
  replies?: ReplyProps[]
}

const Reply = ({ id, author, number, replies }: ReplyProps) => {
  return (
    <div className="reply-container">
      <div className="reply">
        <h4>{author}</h4>
        <p>{number}</p>
        <ReplyBox id={id} />
      </div>
      {replies && replies.length > 0 && (
        <div className="reply-children">
          {replies.map((reply) => (
            <Reply key={reply.id} {...reply} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Reply
