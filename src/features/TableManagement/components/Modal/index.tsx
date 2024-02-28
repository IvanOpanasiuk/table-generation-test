import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import {Button, CustomSelect} from "../../../../components";
import { TableRow } from "../../../../types.ts";
import {citiesOptions} from "../../config";

import './style.scss';

type ModalProps = {
    isOpen: boolean;
    rowData: TableRow | null;
    onSave: (newData: Partial<TableRow>) => void;
    onDelete: (id: string) => void;
    onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, rowData, onSave, onDelete, onClose }) => {
    const [formData, setFormData] = useState<Partial<TableRow>>({});

    useEffect(() => {
        if (rowData) {
            setFormData(rowData);
        }
    }, [rowData]);

    if (!isOpen || !rowData) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        onDelete(rowData.id);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (selectedOption: any) => {
        setFormData(prev => ({ ...prev, city: selectedOption.value }));
    };

    return ReactDOM.createPortal(
        <div className="edit-modal__overlay">
            <div className="edit-modal">
                <div className="edit-modal__header">
                    <Button className="edit-modal__close-btn" onClick={onClose}>&times;</Button>
                </div>
                <form onSubmit={handleSubmit} className="edit-modal__form">
                    <div className="edit-modal__form-group">
                        <label htmlFor="name">Name</label>
                        <input id="name" name="name" value={formData.name || ''} onChange={handleChange} />
                    </div>
                    <div className="edit-modal__form-group">
                        <label htmlFor="surname">Surname</label>
                        <input id="surname" name="surname" value={formData.surname || ''} onChange={handleChange} />
                    </div>
                    <div className="edit-modal__form-group">
                        <label htmlFor="age">Age</label>
                        <input id="age" name="age" type="number" value={formData.age?.toString() || ''} onChange={handleChange} />
                    </div>
                    <div className="edit-modal__form-group">
                        <label htmlFor="city">City</label>
                        <CustomSelect
                            name="city"
                            options={citiesOptions}
                            value={citiesOptions.find(option => option.value === formData.city)}
                            onChange={handleSelectChange}
                            defaultValue={citiesOptions[0].value}
                        />
                    </div>
                    <div className={'edit-modal__form-button'}>
                        <Button type="submit" className="edit-modal__save-btn">Agree</Button>
                        <Button className="edit-modal__delete-btn" onClick={handleDelete}>Delete</Button>
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};
