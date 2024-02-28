import { IFormData } from "../types.ts";

export const inputsMap = (formData: IFormData) =>
  new Map([
    [
      "name",
      {
        type: "text",
        name: "name",
        label: "Name",
        value: formData.name,
        placeholder: "Name",
        className: "input-field",
      },
    ],
    [
      "surname",
      {
        type: "text",
        name: "surname",
        label: "Surname",
        value: formData.surname,
        placeholder: "Surname",
        className: "input-field",
      },
    ],
    [
      "age",
      {
        type: "number",
        name: "age",
        label: "Age",
        value: formData.age,
        placeholder: "Age",
        className: "input-field",
      },
    ],
  ]);
