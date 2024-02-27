import {FormEvent, useCallback, useState} from 'react';

import { resetFormData, updateFormData} from "../../store/slice/formSlice.ts";
import { Button, CustomSelect, Input } from "../../../../components";
import {addRowToFirstTable} from "../../store/slice/tableSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import {citiesOptions} from "../../config";
import {RootState} from "../../types.ts";

import './style.scss';

const FormComponent = () => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const formData = useSelector((state: RootState) => state.forms);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        dispatch(updateFormData({ ...formData, [name]: value }));
    }, [dispatch, formData]);

    const handleSelect = useCallback((selectedOption) => {
        dispatch(updateFormData({ ...formData, city: selectedOption.value }));
    }, [dispatch, formData]);

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(addRowToFirstTable({
            ...formData,
            age: parseInt(formData.age, 10),
        }));
        dispatch(resetFormData());
        setErrors({});
    };

    const inputsMap = new Map([
        ['name', { type: 'text', name: 'name', value: formData.name, placeholder: 'Name', className: 'input-field' }],
        ['surname', { type: 'text', name: 'surname', value: formData.surname, placeholder: 'Surname', className: 'input-field' }],
        ['age', { type: 'number', name: 'age', value: formData.age, placeholder: 'Age', className: 'input-field' }],
    ]);

    return (
        <div className="user-form-container">
            <form onSubmit={handleSubmit} className="user-form">
                {Array.from(inputsMap.values()).map((input, index) => (
                    <div key={index}>
                        <Input
                            key={index}
                            {...input}
                            onChange={handleChange}
                        />
                        {errors[input.name] && <span style={{fontSize: '10px', color: 'red'}} className="error">{errors[input.name]}</span>}
                    </div>
                ))}

                <CustomSelect
                    name="city"
                    options={citiesOptions}
                    onChange={handleSelect}
                    value={citiesOptions.find(option => option.value === formData.city)}
                    defaultValue={citiesOptions[0]}
                />

                <Button className='submit-button'>ADD</Button>
            </form>
        </div>
    );
};

export default FormComponent;
