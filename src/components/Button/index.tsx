import React, { memo } from "react";
import "./style.scss";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: any;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export const Button: React.FC<ButtonProps> = memo(
  ({ children, onClick, className, type }) => {
    return (
      <button type={type} className={`button ${className}`} onClick={onClick}>
        {children}
      </button>
    );
  },
);

export const LinkButton: React.FC<ButtonProps> = memo(
  ({ children, onClick, className }) => {
    return (
      <a className={`link-button ${className}`} onClick={onClick}>
        {children}
      </a>
    );
  },
);
