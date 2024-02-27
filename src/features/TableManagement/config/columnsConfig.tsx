import { ColumnsType } from '../../../types';

export const columns: ColumnsType = [
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
        accessor: 'actions',
        Cell: ({ row }: any) => {
            return (
                <div>
                    <button onClick={() => console.log('Edit', row.original)}>Edit</button>
                    <button onClick={() => console.log('Delete', row.original)}>Delete</button>
                </div>
            );
        },
    }
];

export default columns;
