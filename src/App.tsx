import React from 'react';
import { v4 as uuid } from 'uuid';

import {TableComponent} from './features/TableManagement/components/UserTable';
import UserForm from "./features/TableManagement/components/UserForm";
import {ColumnsType, IData} from './types';

import './App.scss';

const columns: ColumnsType = [
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Surname',
        accessor: 'surname',
    },
    {
        Header: 'Age',
        accessor: 'age',
    },
    {
        Header: 'City',
        accessor: 'city',
    },
    {
        Header: 'Actions',
        id: 'actions',
        Cell: ({ row }: any) => (
            <div>
                <button onClick={() => console.log(row.original.id)}>Edit</button>
                <button onClick={() => console.log(row.original.id)}>Delete</button>
            </div>
        ),
    },
];

const data: IData[] = [
    { id: uuid(), name: 'John', surname: 'Doe', age: 30, city: 'Riga' },
    { id: uuid(), name: 'John2', surname: 'Doe2', age: 25, city: 'Deco' },
    { id: uuid(), name: 'John3', surname: 'Doe3', age: 20, city: 'Nico' },
    { id: uuid(), name: 'John4', surname: 'Doe4', age: 15, city: 'Inga' },
];

const App: React.FC = () => {
    return <>
        <UserForm />
        <TableComponent columns={columns} data={data} />
    </>;
};

export default App;
