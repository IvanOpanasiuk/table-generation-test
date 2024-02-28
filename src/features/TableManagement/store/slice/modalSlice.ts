import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TableRow } from "../../../../types.ts";

interface IModalState {
  isOpen: boolean;
  rowData?: TableRow;
}

const initialState: IModalState = {
  isOpen: false,
};

export const modalSlice = createSlice({
  name: "editModal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<TableRow>) => {
      state.isOpen = true;
      state.rowData = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.rowData = undefined;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
