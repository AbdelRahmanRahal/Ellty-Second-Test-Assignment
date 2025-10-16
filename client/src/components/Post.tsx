import "./Post.css"
import ReplyBox from "./ReplyBox"

interface PostProps {
  // TODO: implement user feature later
  id: string
  number: number
  // TODO: implement date posted feature later
  // date: Date
}

const Post = ({ id, number }: PostProps) => {
  return (
    <div className="post">
      <h4>AbdelRahman Rahal</h4>
      Test {id} {number}
      <ReplyBox id={id} />
    </div>
  )
}

export default Post
