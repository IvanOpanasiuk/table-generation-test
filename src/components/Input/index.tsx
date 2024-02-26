import React from 'react';
import './styles.module.scss';

interface InputProps {
    key: string | number;
    name: string;
    type: string;
    placeholder?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

export const Input: React.FC<InputProps> = ({ name = 'name', type = 'text', placeholder, value, onChange, className }) => {
    return (
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`input ${className}`}
        />
    );
};
