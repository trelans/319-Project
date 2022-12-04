import { Link } from "react-router-dom";

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


interface Column {
    id: 'name' | 'surname' | 'id' | 'duration' | 'gpa' | 'eng101' | 'eng102' | 'total';
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
        id: 'gpa',
        label: 'GPA',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'eng101',
        label: 'ENG 101',
        minWidth: 100,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'eng102',
        label: 'ENG 102',
        minWidth: 100,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'total',
        label: 'Total',
        minWidth: 100,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
];

interface Data {
    name: string;
    surname: string;
    id: number;
    duration: string;
    gpa: number;
    total: number;
    eng101: string;
    eng102: string;
}

function createData(
    name: string,
    surname: string,
    id: number,
    duration: string,
    gpa: number,
    eng101: string,
    eng102: string,
    total: number

): Data {
    // Data maybe fetched here??
    return { name, surname, id, duration, gpa , eng101, eng102 ,  total};
}

const rows = [
    createData('Kutay', 'Şenyiğit', 21902377, "Fall", 3.55, "A","A",  85.00),
    createData('Kutay', 'Şenyiğit', 21902377, "Fall", 3.55, "A","A", 85.00),
    createData('Kutay', 'Şenyiğit', 21902377, "Fall", 3.55, "A", "A", 85.00),
    createData('Kutay', 'Şenyiğit', 21902377, "Fall", 3.55, "A","A", 85.00),
    createData('Kutay', 'Şenyiğit', 21902377, "Fall", 3.55, "A","A", 85.00),
    createData('Kutay', 'Şenyiğit', 21902377, "Fall", 3.55, "A","A", 85.00),
    createData('Kutay', 'Şenyiğit', 21902377, "Fall", 3.55, "A","A", 85.00),
    createData('Kutay', 'Şenyiğit', 21902377, "Fall", 3.55, "A","A", 85.00),
    createData('Kutay', 'Şenyiğit', 21902377, "Fall", 3.55, "A","A", 85.00),
    createData('Kutay', 'Şenyiğit', 21902377, "Fall", 3.55, "A", "A", 85.00),
    createData('Kutay', 'Şenyiğit', 21902377, "Fall", 3.55, "A", "A", 85.00),
    createData('Kutay', 'Şenyiğit', 21902377, "Fall", 3.55, "A", "A", 85.00),
    createData('Kutay', 'Şenyiğit', 21902377, "Fall", 3.55, "A", "A", 85.00),
    createData('Kutay', 'Şenyiğit', 21902377, "Fall", 3.55, "A", "A", 85.00),
];

export default function StickyHeadTable() {
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

