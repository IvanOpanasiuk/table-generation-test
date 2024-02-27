import React from 'react';
import {useSelector} from "react-redux";

import {TableComponent} from './features/TableManagement/components/Table';
import UserForm from "./features/TableManagement/components/Form";
import {RootState} from "./features/TableManagement/types.ts";

import './App.scss';

const App: React.FC = () => {
    const tables = useSelector((state: RootState) => state.table.tables);
    return <>
        <UserForm />
        <UserForm />
        {
            Object.entries(tables).map(([tableId, tableData], index) => (
                <TableComponent key={tableId} tableId={tableId} data={tableData.rows} tableIndex={index} />
            ))
        }
    </>;
};

export default App;
