import React from "react";
import Select, { StylesConfig } from "react-select";
import { IOption } from "../../types.ts";

type CustomSelectProps = {
  name: string;
  options: IOption[];
  value?: IOption | null;
  defaultValue?: IOption | null;
  onChange: (value: IOption | null) => void;
};

const customStyles: StylesConfig = {
  dropdownIndicator: (provided, state) => ({
    ...provided,
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : undefined,
  }),
};

export const CustomSelect: React.FC<CustomSelectProps> = ({ ...props }) => {
  return (
    // @ts-ignore
    <Select styles={customStyles} {...props} />
  );
};
