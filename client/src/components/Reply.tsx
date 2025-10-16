import "./Reply.css"
import ReplyBox from "./ReplyBox"

export interface ReplyData {
  id: string
  author: string
  operation: "+" | "-" | "×" | "/"
  operand: number
  replies?: ReplyData[]
}

interface ReplyProps extends ReplyData {
  parentNumber: number
}

const calculate = (base: number, op: string, operand: number): number => {
  switch (op) {
    case "+":
      return base + operand
    case "-":
      return base - operand
    case "×":
      return base * operand
    case "/":
      return base / operand
    default:
      return base
  }
}

const Reply = ({
  id,
  author,
  operation,
  operand,
  replies,
  parentNumber,
}: ReplyProps) => {
  const currentNumber = calculate(parentNumber, operation, operand)
  return (
    <div className="reply-container">
      <div className="reply">
        <h4>{author}</h4>
        <span className="reply-operation">{`${operation} ${operand}`}</span>
        <div className="reply-content">
          <p className="reply-result">{currentNumber}</p>
        </div>
        <ReplyBox id={id} />
      </div>
      {replies && replies.length > 0 && (
        <div className="reply-children">
          {replies.map((reply) => (
            <Reply key={reply.id} {...reply} parentNumber={currentNumber} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Reply
