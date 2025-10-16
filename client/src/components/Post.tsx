import "./Post.css"
import ReplyBox from "./ReplyBox"
import Reply from "./Reply"

interface PostProps {
  // TODO: implement user feature later
  id: string
  author: string
  number: number
  replies?: Reply[]
  // TODO: implement date posted feature later
  // date: Date
}

const Post = ({ id, author, number, replies }: PostProps) => {
  return (
    <div className="post-with-replies-container">
      <div className="post">
        <h4>{author}</h4>
        <p>
          Test {id} {number}
        </p>
        <ReplyBox id={id} />
      </div>
      {replies && replies.length > 0 && (
        <div className="post-replies">
          {replies.map((reply) => (
            <Reply key={reply.id} {...reply} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Post
