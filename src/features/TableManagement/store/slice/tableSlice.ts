import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { produce } from "immer";
import { IData } from "../../../../types.ts";

interface ITable {
  id: string;
  rows: IData[];
}

interface ITableState {
  tables: { [key: string]: ITable };
}

const initialState: ITableState = {
  tables: {
    [uuid()]: {
      id: uuid(),
      rows: [
        { id: uuid(), name: "Iva", surname: "Op", age: 32, city: "Riga" },
        { id: uuid(), name: "John", surname: "Doe", age: 30, city: "Riga" },
      ],
    },
  },
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    addRowToFirstTable: (state, action: PayloadAction<Omit<IData, "id">>) => {
      const newRow: IData = { ...action.payload, id: uuid() };
      const firstTableKey = Object.keys(state.tables)[0];
      if (firstTableKey) {
        state.tables[firstTableKey].rows.push(newRow);
      } else {
        console.error("No tables available to add a row.");
      }
    },

    editTableRow: produce(
      (
        state,
        action: PayloadAction<{
          tableId: string;
          rowId: string;
          newData: Partial<IData>;
        }>,
      ) => {
        const { tableId, rowId, newData } = action.payload;
        const table = state.tables[tableId];
        const rowIndex = table.rows.findIndex((row: IData) => row.id === rowId);
        if (rowIndex > -1) {
          table.rows[rowIndex] = { ...table.rows[rowIndex], ...newData };
        }
      },
    ),

    deleteTableRow: produce(
      (
        state,
        action: PayloadAction<{
          tableId: string;
          rowId: string;
        }>,
      ) => {
        const { tableId, rowId } = action.payload;
        const table = state.tables[tableId];
        const rowIndex = table.rows.findIndex((row: IData) => row.id === rowId);
        if (rowIndex > -1) {
          table.rows.splice(rowIndex, 1);
        }
      },
    ),

    copyTable: produce((state, action: PayloadAction<string>) => {
      const tableId = action.payload;
      const tableCopy = {
        ...state.tables[tableId],
        id: uuid(),
        rows: state.tables[tableId].rows.map((row: IData) => ({ ...row })),
      };
      state.tables[tableCopy.id] = tableCopy;
    }),

    deleteTable: (state, action: PayloadAction<string>) => {
      const tableId = action.payload;
      delete state.tables[tableId];
    },
  },
});

export const {
  addRowToFirstTable,
  editTableRow,
  deleteTableRow,
  deleteTable,
  copyTable,
} = tableSlice.actions;

export default tableSlice.reducer;
