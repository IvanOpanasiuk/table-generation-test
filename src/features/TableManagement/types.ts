import { combineReducers } from '@reduxjs/toolkit';
import tableReducer from './store/slice/tableSlice.ts';
import modalReducer from './store/slice/modalSlice.ts';
import formsReducer from './store/slice/formSlice.ts';
import * as tableActions from './store/slice/tableSlice.ts';
import * as modalActions from './store/slice/modalSlice.ts';

const rootReducer = combineReducers({
    table: tableReducer,
    modal: modalReducer,
    forms: formsReducer,
});


type TableActions = ReturnType<typeof tableActions[keyof typeof tableActions]>;
type ModalActions = ReturnType<typeof modalActions[keyof typeof modalActions]>;

export type RootAction = TableActions | ModalActions;

export type RootState = ReturnType<typeof rootReducer>;
