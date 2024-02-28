import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { Epic } from 'redux-observable';
import tableReducer from './slice/tableSlice.ts';
import modalReducer from './slice/modalSlice.ts';
import formsReducer from './slice/formSlice.ts';
import { RootAction, RootState } from '../types';
import {rootEpic} from "../epics";


const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>();

export const store = configureStore({
    reducer: {
        table: tableReducer,
        modal: modalReducer,
        forms: formsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(epicMiddleware),
});

export type AppDispatch = typeof store.dispatch;

epicMiddleware.run(rootEpic as unknown as Epic<RootAction, RootAction, RootState>);

