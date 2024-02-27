import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
    name: string;
    surname: string;
    age: string;
    city: string;
}

interface SyncFormDataAction {
    type: string;
    payload: FormData;
}

const initialState: FormData = {
    name: '',
    surname: '',
    age: '',
    city: 'riga',
};

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        updateFormData: (state, action: PayloadAction<FormData>) => {
            return { ...state, ...action.payload };
        },
        syncFormsData: (state, action: PayloadAction<FormData>) => {
            return { ...state, ...action.payload };
        },
        resetFormData: () => initialState,
    },
});

export const { updateFormData, syncFormsData, resetFormData,clearFormData } = formSlice.actions;

export default formSlice.reducer;
