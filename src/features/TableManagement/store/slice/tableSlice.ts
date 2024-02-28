import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { IData } from '../../../../types.ts';

interface ITableRow extends Omit<IData, 'id'> {
    id: string;
}

interface ITable {
    id: string;
    rows: ITableRow[];
}

interface ITableState {
    tables: { [key: string]: ITable };
}

const initialState: ITableState = {
    tables: {
        [uuid()]: {
            id: uuid(),
            rows: [
                { id: uuid(), name: 'Iva', surname: 'Op', age: 32, city: 'Riga' },
                { id: uuid(), name: 'John', surname: 'Doe', age: 30, city: 'Riga' }
            ]
        }
    }
};

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        addRowToFirstTable: (state, action: PayloadAction<Omit<ITableRow, 'id'>>) => {
            const row = action.payload;
            const newRow = { ...row };

            const firstTableKey = Object.keys(state.tables)[0];
            if (firstTableKey) {
                state.tables[firstTableKey].rows.push(newRow);
            } else {
                console.error("No tables available to add a row.");
            }
        },

        editTableRow: (state, action: PayloadAction<{ tableId: string, rowId: string, newData: Partial<ITableRow> }>) => {
            const { tableId, rowId, newData } = action.payload;
            const table = state.tables[tableId];
            const rowIndex = table.rows.findIndex(row => row.id === rowId);
            if (rowIndex > -1) {
                table.rows[rowIndex] = { ...table.rows[rowIndex], ...newData };
            }
        },
        deleteTableRow: (state, action: PayloadAction<{ tableId: string, rowId: string }>) => {
            const { tableId, rowId } = action.payload;
            const table = state.tables[tableId];
            const rowIndex = table.rows.findIndex(row => row.id === rowId);
            if (rowIndex > -1) {
                table.rows.splice(rowIndex, 1);
            }
        },
        copyTable: (state, action: PayloadAction<string>) => {
            const tableId = action.payload;
            const tableCopy = { ...state.tables[tableId], id: uuid(), rows: state.tables[tableId].rows.map(row => ({ ...row })) };
            state.tables[tableCopy.id] = tableCopy;
        },
        deleteTable: (state, action: PayloadAction<string>) => {
            const tableId = action.payload;
            delete state.tables[tableId];
        },
    },
});

export const { addRowToFirstTable, editTableRow, deleteTableRow, deleteTable, copyTable } = tableSlice.actions;
export default tableSlice.reducer;