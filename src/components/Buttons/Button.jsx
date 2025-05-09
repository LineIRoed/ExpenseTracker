import React from "react";
import styles from "./buttons.module.css";

const Button = ({ children, onClick, className, buttonType, label }) => {
  return (
    <button
      className={`${styles.default} ${className}`}
      onClick={onClick}
      type={buttonType}
      aria-label={label}
    >
      {children}
    </button>
  );
};

export default Button;