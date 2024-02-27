import React from 'react';
import Select, { ValueType } from 'react-select';

type CustomSelectProps = {
    name: string;
    options: { value: string; label: string }[];
    value?: ValueType<{ value: string; label: string }, false>;
    defaultValue?: ValueType<{ value: string; label: string }, false>;
    onChange: (value: ValueType<{ value: string; label: string }, false>) => void;
}


export const CustomSelect: React.FC<CustomSelectProps> = ({...props}) => {
    return (
        <Select
            styles={{
                dropdownIndicator: (provided, state) => ({
                    ...provided,
                    transform: state.selectProps.menuIsOpen && "rotate(180deg)"
                })
            }}

            {...props}

        />
    );
};
