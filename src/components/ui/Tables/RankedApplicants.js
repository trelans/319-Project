import {Link} from "react-router-dom";

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
    id: 'Name' | 'Surname' | 'ID' | 'Faculty' | 'Department' | 'Duration' | 'Total Points' | "Preferred University #1" | "Preferred University #2" | "Preferred University #3" | "Preferred University #4" | "Preferred University #5";
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns = [
    {id: 'First Name', label: 'Name', minWidth: 170},
    {id: 'Lastname', label: 'Surname', minWidth: 100},
    {
        id: 'Student ID Number',
        label: 'ID',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'Faculty',
        label: 'Faculty',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'Department',
        label: 'Department',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'Duration Preferred',
        label: 'Duration Preferred',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'Total Points',
        label: 'Total Points',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: "Preferred University #1",
        label: "Preferred University #1",
        minWidth: 170,
        align: 'right',
    },
    {
        id: "Preferred University #2",
        label: "Preferred University #2",
        minWidth: 170,
        align: 'right',
    },
    {
        id: "Preferred University #3",
        label: "Preferred University #3",
        minWidth: 170,
        align: 'right',
    },
    {
        id: "Preferred University #4",
        label: "Preferred University #4",
        minWidth: 170,
        align: 'right',
    },
    {
        id: "Preferred University #5",
        label: "Preferred University #5",
        minWidth: 170,
        align: 'right',
    },
];


export default function StickyHeadTable(list) {
    const rows = list.rows
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
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <TableContainer sx={{maxHeight: 440}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
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

