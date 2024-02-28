import React, { memo } from "react";
import "./style.scss";

type InputProps = {
  name: string;
  type: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export const Input: React.FC<InputProps> = memo(
  ({ className = "", ...props }) => {
    return <input {...props} className={`input ${className}`} />;
  },
);
