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
import RatingPopup from "../UniversityRatingPopup";
import Backdrop from "../Backdrop";
import NominatedCoursePopup from "./NominatedCoursePopup";

interface waitingCourse {
    requestNo: string;
    date: string;
    notification: string;
}

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const originalRows: waitingCourse[] = [
    {
        requestNo: "1",
        date: "22/01/2022",
        notification: "User post preapproval form",
    },
    {
        requestNo: "1",
        date: "22/01/2022",
        notification: "User post preapproval form",
    },
    {
        requestNo: "1",
        date: "22/01/2022",
        notification: "User post preapproval form",
    },
    {
        requestNo: "1",
        date: "22/01/2022",
        notification: "User post preapproval form",
    },
    {
        requestNo: "1",
        date: "22/01/2022",
        notification: "User post preapproval form",
    },
    {
        requestNo: "1",
        date: "22/01/2022",
        notification: "User post preapproval form",
    },
];

export default function BasicTable() {
    const [rows, setRows] = useState(originalRows);
    const [searched, setSearched] = useState("");

    const classes = useStyles();

    const requestSearch = (searchedVal: string) => {
        const filteredRows = originalRows.filter((row) => {
            return row.name.toLowerCase().includes(searchedVal.toLowerCase());
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
                                <TableCell align="left">Request No</TableCell>
                                <TableCell align="left">Date</TableCell>
                                <TableCell align="left">Notification</TableCell>
                                <TableCell align="left"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, idx) => (
                                <TableRow key={idx}>
                                    <TableCell component="th" scope="row">
                                        {idx + 1}
                                    </TableCell>
                                    <TableCell align="left">{row.date}</TableCell>
                                    <TableCell align="left">{row.notification}</TableCell>
                                    <TableCell align="left">

                                    </TableCell>
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
