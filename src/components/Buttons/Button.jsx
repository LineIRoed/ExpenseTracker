import React from "react";
import styles from "./buttons.module.css";

// Button component that renders a customizable button
const Button = ({ children, onClick, className,}) => {
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;