import React from 'react';
// @ts-ignore
import Select, { ValueType, OptionTypeBase } from 'react-select';

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    name: string;
    options: Option[];
    value?: Option;
    onChange: (value: ValueType<OptionTypeBase>) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ name, options, onChange, value }) => {
    return (
        <Select
            name={name}
            options={options}
            onChange={onChange}
            value={value}
        />
    );
};
