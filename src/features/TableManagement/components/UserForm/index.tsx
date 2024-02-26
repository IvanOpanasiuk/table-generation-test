import React, {useCallback, useState} from 'react';
import './styles.scss'
import {Button, CustomSelect, Input} from "../../../../components";
import {IOption} from "../../../../types.ts";

const initialState = {
    name: '',
    surname: '',
    age: '',
    city: 'Riga',
}

const UserFormComponent = () => {

    const options: IOption[] = [
        { value: 'riga', label: 'Riga' },
        { value: 'jurmala', label: 'Jurmala' },
        { value: 'daugavpils', label: 'Daugavpils' },
        { value: 'ventspils', label: 'Ventspils' },
    ];

    const [formData, setFormData] = useState(initialState);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }, [formData])

    const handleSelect = useCallback((selectedOption: IOption) => {
        setFormData({ ...formData, city: selectedOption.value });
    }, [formData]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setFormData(initialState);
    };

    const inputsMap = [
        { type: 'text', name: 'name', value: formData.name, placeholder: 'Name', className: 'inputField' },
        { type: 'text', name: 'surname', value: formData.surname, placeholder: 'Surname', className: 'inputField' },
        { type: 'number', name: 'age', value: formData.age, placeholder: 'Age', className: 'inputField' },
    ];

    return (
        <div className="userForm-container">
            <form onSubmit={handleSubmit} className="userForm">
                {inputsMap.map((input, index) => (
                    <Input key={index} {...input} onChange={handleChange} />
                ))}

                <CustomSelect name="city" options={options} onChange={handleSelect} value={options.find(option => option.value === formData.city)} />

                <Button className='submitButton'>
                    ADD
                </Button>
            </form>
        </div>
    );
};

export default UserFormComponent;
