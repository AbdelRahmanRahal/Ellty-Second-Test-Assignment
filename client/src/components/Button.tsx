import "./Button.css"

interface ButtonProps {
  label: string
  color?: string
  className?: string
  onClick: () => void
}

const Button = ({
  label,
  color = "#1d87d8",
  className,
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
    >
      {label}
    </button>
  )
}

export default Button
