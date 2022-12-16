import { handleRequests } from "../requests";
import { useState, useRef } from "react";
import * as React from "react";
import Pdf from "react-to-pdf";

const durationTable = {
  0: "Fall",
  1: "Spring",
  2: "Year",
};

let loaded = false;

const ref = React.createRef();

function CourseTransferFormConvert() {
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
  const [ECTSCredits, setECTSCredits] = useState("");
  const [courses, setCourses] = useState([]);
  const [bilkentCourses, setBilkentCourses] = useState([]);
  const [isLoading, setLoading] = React.useState(true);

  return (
    <div>
      <div className="cp-center">
        <Pdf targetRef={ref} filename="LearningAgreementBeforeMobility.pdf">
          {({ toPdf }) => (
            <button className="cp-button" onClick={toPdf}>
              Download PDF
            </button>
          )}
        </Pdf>
      </div>
      <div ref={ref}>
        <div className="cp-container">
          <div className="cp-center">
            <h1 className="cp-h1">
              Course Transfer Form
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
        </div>
        <div className="cp-container">
          <div className="cp-center">
            <table className="cp-table">
              <tr className="cp-row">
                <td className="cp-col">Name of the host institution:</td>
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
        </div>
      </div>
    </div>
  );
}

export default CourseTransferFormConvert;
