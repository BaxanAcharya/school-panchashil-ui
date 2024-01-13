interface ButtonProps {
  text: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "reset" | "submit" | "button";
}

const Button = ({
  text,
  className,
  disabled,
  loading,
  type,
  onClick,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || loading ? true : false}
      type={`${type ? type : "button"}`}
      onClick={onClick}
      className={className}
    >
      {text}
    </button>
  );
};

export default Button;
