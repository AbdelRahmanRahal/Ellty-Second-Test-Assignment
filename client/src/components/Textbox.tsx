import "./Textbox.css"

interface TextboxProps {
  placeholder?: string
}

const Textbox = ({ placeholder }: TextboxProps) => {
  return (
    <input
      type="number"
      className="textbox"
      placeholder={placeholder}
      onKeyDown={(event) => {
        // Allow: backspace, tab, delete, arrows, and numbers
        if (
          !["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"].includes(
            event.key
          ) &&
          !/[0-9]/.test(event.key)
        ) {
          event.preventDefault()
        }
      }}
    />
  )
}

export default Textbox
