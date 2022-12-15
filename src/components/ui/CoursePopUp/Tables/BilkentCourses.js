import React, { useState , useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import styles from "../coursePopUp.module.css"

interface food {
  id: number;
  courseCode: string;
  courseName: string;
  credit: number;
  eqCourse: string;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const originalRows: courses[] = [
  {
    id: "",
    courseCode: "CS 202",
    courseName: "Fundamental Structures of Computer Science I",
    credit: 6.0,
    eqCourse: "Select",
  },
  {
    id: "",
    courseCode: "CS 224",
    courseName: "Computer Organization",
    credit: 6.0,
    eqCourse: "Select",
  },
  {
    id: "",
    courseCode: "CS 342",
    courseName: "Operating Systems",
    credit: 6.0,
    eqCourse: "Select",
  },
  {
    id: "",
    courseCode: "IE 400",
    courseName: "Principles of Engineering Management",
    credit: 6.0,
    eqCourse: "Select",
  },
  {
    id: "",
    courseCode: "None",
    courseName: "Arts Core Elective",
    credit: 6.0,
    eqCourse: "Select",
  },
  {
    id: "",
    courseCode: "None",
    courseName: "Technical Elective",
    credit: 6.0,
    eqCourse: "Select",
  },
];

export default function BasicTable(props ) {
  const [rows, setRows] = useState(originalRows);
  const [searched, setSearched] = useState("");

  const classes = useStyles();


  props.closePopUp(false)

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

  const handleRemoveSpecificRow =  idx => {

    rows.splice(idx, 1);
    setRows(rows);
  };


  const handleItemClick = item => {

    props.setArrFunc(item)
    props.closePopUp(true)
  }

  return (
    <>
      <Paper>
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <TableContainer style={{height: 450}}>
          <Table className={styles.tableCt} aria-label="simple table" >
            <TableHead>
              <TableRow>
                <TableCell align={"right"}>Course Code</TableCell>

                <TableCell align="right">Course Name</TableCell>
                <TableCell align="right">ECTS Credits</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row,idx) => (
                <TableRow key={idx} >
                  <TableCell align="right">{row.courseCode}</TableCell>
                  <TableCell align="right">{row.courseName}</TableCell>
                  <TableCell align="center">{row.credit}</TableCell>
                  <TableCell align="right"><button onClick={() => { handleItemClick(row); handleRemoveSpecificRow(idx)}}>Select Course</button></TableCell>
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
