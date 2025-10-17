import "./Post.css"
import ReplyBox from "./ReplyBox.tsx"
import Reply, { type ReplyData } from "./Reply.tsx"

interface PostProps {
  id: string
  author: string
  number: number
  replies?: ReplyData[]
  onReplyPosted: () => void
  isAuthenticated: boolean
  // TODO: implement date posted feature later
  // date: Date
}

const Post = ({
  id,
  author,
  number,
  replies,
  onReplyPosted,
  isAuthenticated,
}: PostProps) => {
  return (
    <div className="post-with-replies-container">
      <div className="post">
        <h4>{author}</h4>
        <p>{number}</p>
        {isAuthenticated && <ReplyBox id={id} onReplyPosted={onReplyPosted} />}
      </div>
      {replies && replies.length > 0 && (
        <div className="post-replies">
          {replies.map((reply) => (
            <Reply
              key={reply.id}
              {...reply}
              parentNumber={number}
              onReplyPosted={onReplyPosted}
              isAuthenticated={isAuthenticated}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Post
