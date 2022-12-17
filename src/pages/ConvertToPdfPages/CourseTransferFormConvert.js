import { handleRequests } from "../requests";
import { useState, useRef } from "react";
import * as React from "react";
import Pdf from "react-to-pdf";
import CourseTransferFormTable from "./PdfTables/CourseTransferFormTable";

const durationTable = {
  0: "Fall",
  1: "Spring",
  2: "Year",
};

const options = {
  orientation: "landscape",
  unit: "in",
  format: [15, 15],
  scale: 1,
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
        <Pdf
          targetRef={ref}
          filename="LearningAgreementBeforeMobility.pdf"
          options={options}
        >
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
            <h1 className="cp-h1">Course Transfer Form</h1>
          </div>
        </div>
        <div className="cp-container">
          <div className="cp-center">
            <CourseTransferFormTable />
          </div>
        </div>
        <div className="cp-container">
          <div className="cp-center">
            <table className="cp-table">
              <tr className="cp-row">
                <td className="cp-col">Approved By:</td>
                <td className="cp-col">Name:</td>
                <td className="cp-col">Signature:</td>
                <td className="cp-col">Date:</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Exchange Coordinator (exchange students only)</td>
                <td className="cp-col"></td>
                <td className="cp-col"></td>
                <td className="cp-col"></td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Chair</td>
                <td className="cp-col"></td>
                <td className="cp-col"></td>
                <td className="cp-col"></td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Dean/Director</td>
                <td className="cp-col"></td>
                <td className="cp-col"></td>
                <td className="cp-col"></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseTransferFormConvert;
