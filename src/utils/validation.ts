import {IFormData} from "../features/TableManagement/types.ts";

interface IValidationErrors {
    name?: string;
    surname?: string;
    age?: string;
    city?: string;
}

export const validate = (data: IFormData): { isValid: boolean; errors: IValidationErrors } => {
    const errors: IValidationErrors = {};
    let isValid = true;

    if (!data.name.trim().match(/^[A-Za-z]+$/)) {
        errors.name = 'Name is required and must contain letters only.';
        isValid = false;
    }

    if (!data.surname.trim().match(/^[A-Za-z]+$/)) {
        errors.surname = 'Surname is required and must contain letters only.';
        isValid = false;
    }

    if (!data.age || isNaN(data.age) || data.age <= 0) {
        errors.age = 'Age must be a number greater than 0.';
        isValid = false;
    }

    return { isValid, errors };
};
