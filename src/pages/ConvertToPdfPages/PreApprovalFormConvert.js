import { handleRequests } from "../requests";
import { useState, useRef, useEffect } from "react";
import * as React from "react";
import Pdf from "react-to-pdf";
import PreApprovalFormCoursesTable from "./PdfTables/PreApprovalFormCoursesTable";
import {useLocation} from 'react-router-dom';

const durationTable = {
  0: "Fall",
  1: "Spring",
  2: "Year",
};

const options = {
  orientation: "landscape",
  unit: "in",
  format: [10, 15],
  scale: 1,
};

let loaded = false;

const ref = React.createRef();

function PreApprovalFormConvert() {
  const [selectCourseIsOpen, setCourseIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = React.useState();
  const [lastSelectedCourse, setLastSelectedCourse] = React.useState();
  const [eqCourse, setEqCourse] = React.useState();
  const childRef = useRef();

  const [candName, setCandName] = useState("");
  const [candSurname, setCandSurname] = useState("");
  const [candID, setCandID] = useState("");
  const [candDepartment, setCandDepartment] = useState("");
  const [hostUniName, setHostUniName] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [semester, setSemester] = useState("");
  const [duration, setDuration] = useState("");
  const [coordinatorName, setCoordinatorName] = useState("");
  const [signature, setSignature] = useState(""); // will be the digital signature of the coordinator
  const [date, setDate] = useState("");
  const [ECTSCredits, setECTSCredits] = useState("");
  const [courses, setCourses] = useState([]);
  const [bilkentCourses, setBilkentCourses] = useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  const location = useLocation();

  // the if clause is required otherwise react continuously rerender the page
  if (!loaded) {
    handleRequests(null, {}, "preapproval-student", "1", (response, status) => {
      setCandName(response.name);
      setCandSurname(response.surname);
      setCandID(response.id);
      setCandDepartment(response.department);
      setHostUniName(response.appliedInstitution);
      setAcademicYear(response.academicYear); // to be added
      setSemester(response.semester); // to be added
      setDuration(durationTable[response.duration]);
      setCoordinatorName(response.coordinatorName); // to be added
      setSignature(response.signature); // to be added
      setDate(response.date); // to be added
      setECTSCredits(response.ECTSCredits);
      setCourses(response.courses);
      setBilkentCourses(response.bilkentCourses);
      setData(location.state);
    });
    loaded = true;
    setLoading(false);
  }

  function x() {
    console.log(location.state);
  }

  if (isLoading) {
    return (
      <div className={"Page"}>
        <div className="App">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="cp-center">
        <Pdf targetRef={ref} filename="PreApprovalForm.pdf" options={options}>
          {({ toPdf }) => (
            <button className="cp-button" onClick={toPdf}>
              Download PDF
            </button>
          )}
        </Pdf>
      </div>
      <button onClick={x}>
        asfasd
      </button>
      <div ref={ref}>
        <div className="cp-container">
          <div className="cp-center">
            <h1 className="cp-h1">
              Course Exemption Pre-Approval Form for Outgoing Students
            </h1>
          </div>
        </div>
        <div className="cp-container">
          <div className="cp-center">
            <table className="cp-table">
              <tr className="cp-row">
                <td className="cp-col">Name:</td>
                <td className="cp-col">{candName}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Surname:</td>
                <td className="cp-col">{candSurname}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">ID Number:</td>
                <td className="cp-col">{candID}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Department:</td>
                <td className="cp-col">{candDepartment}</td>
              </tr>
            </table>
          </div>
          <div className="cp-center">
            <table className="cp-table">
              <tr className="cp-row">
                <td className="cp-col">Host Institution:</td>
                <td className="cp-col">{hostUniName}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Academic Year:</td>
                <td className="cp-col">{academicYear}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Semester:</td>
                <td className="cp-col">{semester}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Duration:</td>
                <td className="cp-col">{duration}</td>
              </tr>
            </table>
          </div>
          <div className="cp-center">
            <table className="cp-table">
              <tr className="cp-row">
                <td className="cp-col">Approved by:</td>
                <td className="cp-col">Exchange Coordinator</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Name:</td>
                <td className="cp-col">{coordinatorName}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Signature:</td>
                <td className="cp-col">{signature}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Date:</td>
                <td className="cp-col">{date}</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="cp-container">
          <div className="cp-center">
            <PreApprovalFormCoursesTable getData={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreApprovalFormConvert;
