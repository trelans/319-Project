import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import styles from "../coursePopUp.module.css"
import {handleRequests} from "../../../../pages/requests";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

let loaded = false

export default function BasicTable(props) {
    const [rows, setRows] = useState([]);
    const [searched, setSearched] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const eqCourses = props.courses
    const bilkentCourse = props.selectedBilkentCourse
    console.log(bilkentCourse)
    console.log(isLoading)
    console.log(loaded)


    useEffect(() => {
        loaded = false
    }, [rows])


    if (!loaded) {
        handleRequests(null, {
            "courseCode": bilkentCourse.courseCode,
            "hostUniName": props.hostUniName
        }, "preapproval-student-popup", "1", (response, status) => {
            console.log("a")
            const arr = []
            response.eqCourseData.map((course) => {
                arr.push({
                    id: "",
                    courseCode: course.courseCode,
                    courseName: course.courseName,
                    credit: course.credits,
                    isMultiple: false,
                })
            })
            console.log(arr)
            setRows(arr)
            setIsLoading(false)
            loaded = true
        })
    }


    props.closePopUp(false)

    const requestSearch = (searchedVal: string) => {
        const filteredRows = rows.filter((row) => {
            return row.courseCode.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    const handleRemoveSpecificRow = idx => {

        rows.splice(idx, 1);
        setRows(rows);
    };


    const handleItemClick = item => {
        item["idx"] = bilkentCourse["idx"]
        props.setArrFunc(item)
        props.closePopUp(true)
    }

    if (isLoading) {
        return <div><p>Loading...</p></div>
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
                    <Table className={styles.tableCt} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align={"right"}>Course Code</TableCell>

                                <TableCell align="right">Course Name</TableCell>
                                <TableCell align="right">ECTS Credits</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, idx) => (
                                <TableRow key={idx}>
                                    <TableCell align="right">{row.courseCode}</TableCell>
                                    <TableCell align="right">{row.courseName}</TableCell>
                                    <TableCell align="center">{row.credit}</TableCell>
                                    <TableCell align="right">
                                        <button onClick={() => {
                                            handleItemClick(row);
                                            handleRemoveSpecificRow(idx)
                                        }}>Select Course
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <br/>
        </>
    );
}
