export const validate = (data) => {
    let isValid = true;
    let errors = {};

    if (!data.name.trim().match(/^[A-Za-z]+$/)) {
        errors.name = 'Name is required and must be letters only.';
        isValid = false;
    }

    if (!data.surname.trim().match(/^[A-Za-z]+$/)) {
        errors.surname = 'Surname is required and must be letters only.';
        isValid = false;
    }

    if (data.age || isNaN(data.age)) {
        errors.age = 'Age must be a number.';
        isValid = false;
    }

    return {isValid, errors};
};
