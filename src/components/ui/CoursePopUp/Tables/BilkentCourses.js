import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";

interface food {
    courseCode: string;
    courseName: string;
    credit: number;
    eqCourse: string;
}

const useStyles = makeStyles({
    table: {
        minWidth: 650
    }
});

const originalRows: courses[] = [
    { courseCode: "CS 202", courseName: "Fundamental Structures of Computer Science I", credit: 6.0, eqCourse: "Select" },
    { courseCode: "CS 224", courseName: "Computer Organization", credit: 6.0, eqCourse: "Select" },
    { courseCode: "CS 342", courseName: "Operating Systems", credit: 6.0, eqCourse: "Select"},
    { courseCode: "IE 400", courseName: "Principles of Engineering Management", credit: 6.0, eqCourse: "Select"},
    { courseCode: "None", courseName: "Arts Core Elective", credit: 6.0, eqCourse: "Select"},
    { courseCode: "None", courseName: "Technical Elective", credit: 6.0, eqCourse: "Select"}
];

export default function BasicTable() {
    const [rows, setRows] = useState(originalRows);
    const [searched, setSearched] = useState("");
    const classes = useStyles();

    const requestSearch = (searchedVal: string) => {
        const filteredRows = originalRows.filter((row) => {
            return row.courseCode.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    return (
        <>
            <Paper>
                <SearchBar
                    value={searched}
                    onChange={(searchVal) => requestSearch(searchVal)}
                    onCancelSearch={() => cancelSearch()}
                />
                <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align={"right"}>Course Code</TableCell>

                                <TableCell align="right">Course Name</TableCell>
                                <TableCell align="right">ECTS Credits</TableCell>
                                <TableCell align="right">Equivalent Course</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>

                                    <TableCell align="right">{row.courseCode}</TableCell>
                                    <TableCell align="right">{row.courseName}</TableCell>
                                    <TableCell align="right">{row.credit}</TableCell>
                                    <TableCell align="right">{row.eqCourse}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <br />

        </>
    );
}