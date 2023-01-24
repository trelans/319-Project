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
  courseCode: number;
  courseName: number;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const originalRows: waitingCourse[] = [
  {
    request: "1",
    courseCode: "CS 331",
    courseName: "Fundamental Fundamental Fundementaling",
  },
  {
    request: "2",
    courseCode: "CS 331",
    courseName: "Fundamental Fundamental Fundementaling",
  },
  {
    request: "3",
    courseCode: "CS 331",
    courseName: "Fundamental Fundamental Fundementaling",
  },
  {
    request: "4",
    courseCode: "CS 331",
    courseName: "Fundamental Fundamental Fundementaling",
  },
  {
    request: "5",
    courseCode: "CS 331",
    courseName: "Fundamental Fundamental Fundementaling",
  },
  {
    request: "6",
    courseCode: "CS 331",
    courseName: "Fundamental Fundamental Fundementaling",
  },
];

export default function BasicTable() {
  const [rows, setRows] = useState(originalRows);
  const [searched, setSearched] = useState("");

  const [popupOpen, setPopup] = useState(false);

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

  function openNominatedCoursePopup() {
    setPopup(true);
  }

  function closePopup() {
    setPopup(false);
  }

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
                <TableCell align="left">Course Code</TableCell>
                <TableCell align="left">Course Name</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell component="th" scope="row">
                    {idx + 1}
                  </TableCell>
                  <TableCell align="left">{row.courseCode}</TableCell>
                  <TableCell align="left">{row.courseName}</TableCell>
                  <TableCell align="left">
                    <button onClick={openNominatedCoursePopup}>
                      Review Nomination Request
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <br />
      {popupOpen && <NominatedCoursePopup onCancel={closePopup} />}
      {popupOpen && <Backdrop />}
    </>
  );
}
