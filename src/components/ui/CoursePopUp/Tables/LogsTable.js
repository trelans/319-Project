import React, {useEffect, useState} from "react";
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
import axios from "axios";
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

var notifss = []
var notifsRe = []







const originalRows: waitingCourse[] = notifss


export default function BasicTable(props ) {
    const [rows, setRows] = useState(originalRows);
    const [searched, setSearched] = useState("");
    const [notifs, setNotifs] = useState(  {

    });
    const classes = useStyles()

    var isDataGeldiMi = false
    console.log("rows")
console.log(rows)



    useEffect(async () => {

        const res = await axios.get(`http://localhost:8080/notifications`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        setRows (res.data)
            console.log(rows)
    }, []);



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
                                    <TableCell align="left">{
                                       row.updatedAt
                                        }</TableCell>
                                    <TableCell align="left">{row.text}</TableCell>
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
