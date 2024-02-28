import React, {useState, useEffect, useCallback} from 'react';
import ReactDOM from 'react-dom';

import {Button, CustomSelect} from "../../../../components";
import { TableRow} from "../../../../types.ts";
import {validate} from "../../../../utils";
import {citiesOptions} from "../../config";
import {inputsMap} from "../../constants";

import './style.scss';
import {IFormData} from "../../types.ts";

type ModalProps = {
    isOpen: boolean;
    rowData: TableRow | null;
    onSave: (newData: Partial<TableRow>) => void;
    onDelete: (id: string) => void;
    onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, rowData, onSave, onDelete, onClose }) => {
    const [formData, setFormData] = useState<Partial<TableRow>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (rowData) {
            setFormData(rowData);
        }
    }, [rowData]);

    if (!isOpen || !rowData) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const {isValid, errors} = validate(formData as IFormData);
        if (isValid) {
            onSave(formData);
        }
        setErrors(errors as Record<string, string>);
    };

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        onDelete(rowData.id);
    };

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, [setFormData]);

    const handleSelectChange = useCallback((selectedOption: any) => {
        setFormData(prev => ({ ...prev, city: selectedOption.value }));
    }, [setFormData]);

    // @ts-ignore
    return ReactDOM.createPortal(
        <div className="edit-modal__overlay">
            <div className="edit-modal">
                <div className="edit-modal__header">
                    <Button className="button-close__modal" onClick={onClose}>&times;</Button>
                </div>
                <form className="edit-modal__form">
                    {Array.from(inputsMap(formData as IFormData).values()).map((input, index) => (
                        <div className="edit-modal__form-group" key={index}>
                            <label htmlFor={input.name}>{(input.name).toUpperCase()}</label>
                            <input
                                id={input.name}
                                name={input.name}
                                type={input.type}
                                value={input.value || ''}
                                onChange={handleChange}
                            />
                            <span className={`error ${errors[input.name] && 'visible'}`}>{errors[input.name]}</span>
                        </div>
                    ))}

                    <div className="edit-modal__form-group">
                        <label htmlFor="city">CITY</label>
                        <CustomSelect
                            name="city"
                            options={citiesOptions}
                            onChange={handleSelectChange}
                            value={citiesOptions.find(option => option.value === formData.city)}
                            defaultValue={citiesOptions.find(option => option.value === formData.city)}
                        />
                    </div>
                    <div className={'edit-modal__form-button'}>
                        <Button type="submit" className="edit-modal__save-btn" onClick={handleSubmit}>Agree</Button>
                        <Button className="edit-modal__delete-btn" onClick={handleDelete}>Delete</Button>
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById('modal-root') as HTMLElement
    );
};
