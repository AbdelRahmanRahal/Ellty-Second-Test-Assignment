import "./Button.css"

interface ButtonProps {
  label: string
  color?: string
  className?: string
  disabled?: boolean
  onClick: (event: any) => void
}

const Button = ({
  label,
  color = "#1d87d8",
  className,
  disabled = false,
  onClick,
}: ButtonProps) => {
  const buttonStyle = {
    "--button-color": color,
  } as React.CSSProperties

  return (
    <button
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
