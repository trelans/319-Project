import { Link } from "react-router-dom";

import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


interface Column {
    id: 'name' | 'surname' | 'id' | 'duration' | 'placement'| 'total';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'surname', label: 'Surname', minWidth: 100 },
    {
        id: 'id',
        label: 'ID',
        minWidth: 170,
        align: 'right',

    },
    {
        id: 'duration',
        label: 'Duration',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'placement',
        label: 'Placement',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'total',
        label: 'Total',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
];

interface Data {
    name: string;
    surname: string;
    id: string;
    duration: string;
    placement: string;
    total: number;
}

function createData(
    name: string,
    surname: string,
    id: string,
    duration: string,
    placement: string,
    total: number,
): Data {
    // Data maybe fetched here??
    return { name, surname, id, duration, placement ,  total};
}

let rows = [
    createData('Kutay', 'Şenyiğit', "21902377", "Fall", "Kingston University", 85.00),
    createData('Kutay', 'Şenyiğit', "21902377", "Fall", "Kingston University", 85.00),
    createData('Kutay', 'Şenyiğit', "21902377", "Fall", "Kingston University", 85.00),
    createData('Kutay', 'Şenyiğit', "21902377", "Fall", "Kingston University", 85.00),
    createData('Kutay', 'Şenyiğit', "21902377", "Fall", "Kingston University", 85.00),
    createData('Kutay', 'Şenyiğit', "21902377", "Fall", "Kingston University", 85.00),
    createData('Kutay', 'Şenyiğit', "21902377", "Fall", "Kingston University", 85.00),
    createData('Kutay', 'Şenyiğit', "21902377", "Fall", "Kingston University", 85.00),
    createData('Kutay', 'Şenyiğit', "21902377", "Fall", "Kingston University", 85.00),
    createData('Kutay', 'Şenyiğit', "21902377", "Fall", "Kingston University", 85.00),
    createData('Kutay', 'Şenyiğit', "21902377", "Fall", "Kingston University", 85.00),
    createData('Kutay', 'Şenyiğit', "21902377", "Fall", "Kingston University", 85.00),
    createData('Kutay', 'Şenyiğit', "21902377", "Fall", "Kingston University", 85.00),
    createData('Kutay', 'Şenyiğit', "21902377", "Fall", "Kingston University", 85.00),
    createData('Kutay', 'Şenyiğit', "21902377", "Fall", "Kingston University", 85.00),
];

export default function StickyHeadTable(list) {
    rows = list.rows
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

