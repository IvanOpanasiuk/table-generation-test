import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IFormData} from "../../types.ts";

const initialState: IFormData = {
    name: '',
    surname: '',
    age: 18,
    city: 'riga',
};

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        updateFormData: (state, action: PayloadAction<IFormData>) => {
            return { ...state, ...action.payload };
        },
        syncFormsData: (state, action: PayloadAction<FormData>) => {
            return { ...state, ...action.payload };
        },
        resetFormData: () => initialState,
    },
});

export const {
    updateFormData,
    syncFormsData,
    resetFormData
} = formSlice.actions;

export default formSlice.reducer;
