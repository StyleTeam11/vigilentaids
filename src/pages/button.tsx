import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  className = "", 
  disabled = false 
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;