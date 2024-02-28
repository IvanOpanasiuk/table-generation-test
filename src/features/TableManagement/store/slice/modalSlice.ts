import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { produce } from "immer";
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
      return produce(state, (draftState) => {
        draftState.isOpen = true;
        draftState.rowData = action.payload;
      });
    },
    closeModal: (state) => {
      return produce(state, (draftState) => {
        draftState.isOpen = false;
        draftState.rowData = undefined;
      });
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
