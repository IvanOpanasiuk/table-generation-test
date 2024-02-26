import React from 'react';
import {useTable} from 'react-table';
import './style.modules.scss';
import {ColumnsType, IData} from "../../../../types.ts";

type TableProps = {
    columns: ColumnsType,
    data: IData[]
};

export const TableComponent: React.FC<TableProps> = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <table {...getTableProps()} className="table">
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            )
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    );
}
