import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { produce } from "immer";
import { IFormData } from "../../types.ts";

const initialState: IFormData = {
  name: "",
  surname: "",
  age: 18,
  city: "Riga",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<IFormData>) => {
      return produce(state, (draftState) => {
        Object.assign(draftState, action.payload);
      });
    },
    syncFormsData: (state, action: PayloadAction<FormData>) => {
      return produce(state, (draftState) => {
        Object.assign(draftState, action.payload);
      });
    },
    resetFormData: () => initialState,
  },
});

export const { updateFormData, syncFormsData, resetFormData } =
  formSlice.actions;

export default formSlice.reducer;
