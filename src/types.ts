import {Column} from "react-table";

export interface IData {
    id: string;
    name: string;
    surname: string;
    age: number;
    city: string;
}

export interface IOption {
    value: string;
    label: string;
}

export type ColumnsType = Column<IData>[]

export type TableRow = {
    id: string;
    name: string;
    surname: string;
    age: number;
    city: string;
};
