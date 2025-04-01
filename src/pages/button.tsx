import React from "react";

interface ButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, className, children }) => {
  return (
    <button onClick={onClick} className={`p-2 bg-blue-500 text-white rounded ${className}`}>
      {children}
    </button>
  );
};

export default Button;
