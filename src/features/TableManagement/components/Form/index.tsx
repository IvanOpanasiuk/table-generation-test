import React, { FormEvent, useCallback, useState } from "react";

import { resetFormData, updateFormData } from "../../store/slice/formSlice.ts";
import { Button, CustomSelect, Input } from "../../../../components";
import { addRowToFirstTable } from "../../store/slice/tableSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "../../../../utils/";
import { citiesOptions } from "../../config";
import { RootState, IFormData, ErrorType } from "../../types.ts";
import { inputsMap } from "../../constants";

import "./style.scss";

const FormComponent = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<ErrorType>({});
  const formData: IFormData = useSelector((state: RootState) => state.forms);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      dispatch(updateFormData({ ...formData, [name]: value }));
    },
    [dispatch, formData],
  );

  const handleSelect = useCallback(
    (selectedOption: any) => {
      dispatch(updateFormData({ ...formData, city: selectedOption.value }));
    },
    [dispatch, formData],
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isValid, errors } = validate(formData);

    if (isValid) {
      dispatch(
        addRowToFirstTable({
          ...formData,
          age: formData.age,
        }),
      );
      dispatch(resetFormData());
      setErrors({});
      return;
    }

    setErrors(errors as ErrorType);
    return;
  };

  return (
    <div className="user-form-container">
      <form onSubmit={handleSubmit} className="user-form">
        {Array.from(inputsMap(formData).values()).map((input, index) => (
          <div key={index}>
            <Input key={index} {...input} onChange={handleChange} />
            <span className={`error ${errors[input.name] && "visible"}`}>
              {errors[input.name]}
            </span>
          </div>
        ))}

        <CustomSelect
          name="city"
          options={citiesOptions}
          onChange={handleSelect}
          value={citiesOptions.find(
            (option) =>
              option.value.toLowerCase() === formData.city.toLowerCase(),
          )}
          defaultValue={citiesOptions[0]}
        />

        <Button type="submit" className="submit-button">
          ADD
        </Button>
      </form>
    </div>
  );
};

export default FormComponent;
