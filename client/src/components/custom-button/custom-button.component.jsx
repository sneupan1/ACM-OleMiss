import React from "react";
import "./custom-button.styles.scss";

const CustomButton = ({ children, variant, ...props }) => {
  return (
    <button className={`custom-button ${variant}`} {...props}>
      {children}
    </button>
  );
};

export default CustomButton;
