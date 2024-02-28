import React, { useState, useEffect, useCallback, memo } from "react";
import ReactDOM from "react-dom";

import { Button, CustomSelect, Input } from "../../../../components";
import { ImageCross } from "../../../../components/CloseButton.tsx";
import { TableRow } from "../../../../types.ts";
import { validate } from "../../../../utils";
import { citiesOptions } from "../../config";
import { inputsMap } from "../../constants";
import { ErrorType, IFormData } from "../../types.ts";

import "./style.scss";

type ModalProps = {
  isOpen: boolean;
  rowData: TableRow | null;
  onSave: (newData: Partial<TableRow>) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
};

export const Modal: React.FC<ModalProps> = memo(
  ({ isOpen, rowData, onSave, onDelete, onClose }) => {
    const [formData, setFormData] = useState<Partial<TableRow>>({});
    const [errors, setErrors] = useState<ErrorType>({});

    if (!isOpen || !rowData) return null;

    useEffect(() => {
      if (rowData) {
        setFormData(rowData);
      }
    }, [rowData]);

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        const { isValid, errors } = validate(formData as IFormData);
        if (isValid) {
          onSave(formData);
        }
        setErrors(errors as ErrorType);
      },
      [formData, onSave],
    );

    const handleDelete = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        onDelete(rowData.id);
      },
      [onDelete, rowData],
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      },
      [setFormData],
    );

    const handleSelectChange = useCallback(
      (selectedOption: any) => {
        setFormData((prev) => ({ ...prev, city: selectedOption.value }));
      },
      [setFormData],
    );

    // @ts-ignore
    return ReactDOM.createPortal(
      <div className="edit-modal__overlay">
        <div className="edit-modal">
          <div className="edit-modal__header">
            <Button className="button-close" onClick={onClose}>
              <ImageCross width={"30"} height={"30"} />
            </Button>
          </div>
          <form className="edit-modal__form">
            {Array.from(inputsMap(formData as IFormData).values()).map(
              (input) => (
                <div className="edit-modal__form-group" key={input.name}>
                  <label htmlFor={input.name}>{input.label}</label>
                  <Input
                    name={input.name}
                    type={input.type}
                    value={input.value || ""}
                    onChange={handleChange}
                  />
                  <span className={`error ${errors[input.name] && "visible"}`}>
                    {errors[input.name]}
                  </span>
                </div>
              ),
            )}

            <div className="edit-modal__form-group">
              <label htmlFor="city">City</label>
              <CustomSelect
                name="city"
                options={citiesOptions}
                onChange={handleSelectChange}
                value={citiesOptions.find(
                  (option) =>
                    option.value.toLowerCase() === formData.city?.toLowerCase(),
                )}
                defaultValue={citiesOptions.find(
                  (option) =>
                    option.value.toLowerCase() === formData.city?.toLowerCase(),
                )}
              />
            </div>
            <div className={"edit-modal__form-button"}>
              <Button
                type="submit"
                className="edit-modal__save-btn"
                onClick={handleSubmit}
              >
                Agree
              </Button>
              <Button className="edit-modal__delete-btn" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </form>
        </div>
      </div>,
      document.getElementById("modal-root") as HTMLElement,
    );
  },
);
