import React, {useState} from 'react';
import { useTable } from 'react-table';

import { ColumnsType, TableRow } from "../../../../types";
import { useDispatch } from "react-redux";
import {deleteTableRow, editTableRow, deleteTable, copyTable} from "../../store/slice/tableSlice.ts";
import {Button, LinkButton} from "../../../../components";
import {Modal} from "../Modal";

import './style.scss';

type TableProps = {
    tableIndex: number;
    tableId: string;
    data: TableRow[];
};

export const TableComponent: React.FC<TableProps> = ({ tableIndex, tableId, data }) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRow, setEditingRow] = useState<TableRow | null>(null);

    const isMainTable = tableIndex === 0;

    const handleDelete = React.useCallback((rowId: string) => {
        dispatch(deleteTableRow({ tableId, rowId }));
        setIsModalOpen(false);
        setEditingRow(null);
    }, [dispatch, tableId]);


    const handleEdit = (rowData: TableRow) => {
        setEditingRow(rowData);
        setIsModalOpen(true);
    };

    const handleSave = (newData: Partial<TableRow>) => {
        if (editingRow && editingRow.id) {
            dispatch(editTableRow({
                tableId,
                rowId: editingRow.id,
                newData,
            }));
        }
        setIsModalOpen(false);
        setEditingRow(null);
    };

    const handleCopyTable = () => {

        dispatch(copyTable( tableId ));
    };

    const handleDeleteTable = () => {
        if(tableIndex === 0) {
            return;
        }

        dispatch(deleteTable( tableId ));
    };

    const columns: ColumnsType = React.useMemo(() => [
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
            Cell: ({ row }) => (
                <span>

                    <LinkButton className={'button-edit__row'} onClick={() => handleEdit(row.original)}>Edit</LinkButton>
                    <LinkButton className={'button-delete__row'} onClick={() => handleDelete(row.original.id)}>Delete</LinkButton>
                </span>
            ),
        },
    ], []);

    const tableData = React.useMemo(() => data, [data]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: tableData });


    return (
        <>
            <div className="table-header">
                { isMainTable && <Button onClick={handleCopyTable}>Copy Table</Button> }
                { !isMainTable && <Button className={'button-close__table'} onClick={handleDeleteTable}>X</Button> }
            </div>
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
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>

            {isModalOpen && editingRow && (
                <Modal
                    isOpen={isModalOpen}
                    rowData={editingRow}
                    onSave={handleSave}
                    onDelete={handleDelete}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>

    );
};
