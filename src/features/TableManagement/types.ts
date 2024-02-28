import { combineReducers } from "@reduxjs/toolkit";
import tableReducer, * as tableActions from "./store/slice/tableSlice.ts";
import modalReducer, * as modalActions from "./store/slice/modalSlice.ts";
import formsReducer from "./store/slice/formSlice.ts";

const rootReducer = combineReducers({
  table: tableReducer,
  modal: modalReducer,
  forms: formsReducer,
});

type TableActions = ReturnType<
  (typeof tableActions)[keyof typeof tableActions]
>;
type ModalActions = ReturnType<
  // @ts-ignore
  (typeof modalActions)[keyof typeof modalActions]
>;

export type RootAction = TableActions | ModalActions;

export type RootState = ReturnType<typeof rootReducer>;

export interface IFormData {
  name: string;
  surname: string;
  age: number;
  city: string;
}

export type ErrorType = Record<string, string>;
