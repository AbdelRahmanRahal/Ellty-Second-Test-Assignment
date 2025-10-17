import "./Button.css"

interface ButtonProps {
  label: string
  color?: string
  className?: string
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  onClick?: (event: any) => void
}

const Button = ({
  label,
  color = "#1d87d8",
  className,
  disabled = false,
  type = "button",
  onClick,
}: ButtonProps) => {
  const buttonStyle = {
    "--button-color": color,
  } as React.CSSProperties

  return (
    <button
      type={type}
      className={className ? `${className} btn` : "btn"}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default Button
