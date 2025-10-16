import "./OpButton.css"

interface OpButtonProps {
  Op: "+" | "-" | "×" | "/"
  name: string // Used to group radio buttons
}

const OpButton = ({ Op, name }: OpButtonProps) => {
  // Unique ID for the input and label pair
  const id = `op-button-${name}-${Op}`

  return (
    <div className="op-button-wrapper">
      <input type="radio" id={id} name={name} value={Op} className="op-radio-input" />
      <label htmlFor={id} className="op-button-label">{Op}</label>
    </div>
  )
}

export default OpButton
