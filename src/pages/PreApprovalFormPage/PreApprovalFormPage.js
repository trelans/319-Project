import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@mui/material";
import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import TableAddRows from "./TableAddRows";
import Modal from "../../components/ui/CoursePopUp/Modal";
import Backdrop from "../../components/ui/CoursePopUp/Backdrop";
import { useState, useRef } from "react";
import * as React from "react";
import { useEffect } from "react";
import EqPopUp from "../../components/ui/CoursePopUp/PopUpForEquivalentCourse";
import NomNewCoursePopUp from "../../components/ui/CoursePopUp/PopUpForNominateNewCourse";
import { handleRequests } from "../requests";
import LoadingSpinner from "../../components/ui/loadingComponent";

const durationTable = {
  0: "Fall",
  1: "Spring",
  2: "Year",
};

let loaded = false;

function PreApprovalFormPage() {
  const [selectCourseIsOpen, setCourseIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = React.useState({});
  const [selectedCourseEq, setSelectedCourseEq] = React.useState({});
  const [lastSelectedCourse, setLastSelectedCourse] = React.useState();
  const [lastSelectedEq, setLastSelectedEq] = React.useState();
  const [eqCourse, setEqCourse] = React.useState();
  const [candName, setCandName] = useState("");
  const [candSurname, setCandSurname] = useState("");
  const [candID, setCandID] = useState("");
  const [candDepartment, setCandDepartment] = useState("");
  const [hostUniName, setHostUniName] = useState("");
  const [duration, setDuration] = useState("");
  const [ECTSCredits, setECTSCredits] = useState("");
  const [courses, setCourses] = useState([]);
  const [bilkentCourses, setBilkentCourses] = useState({});
  const [eqCourseGot, setEqCourseGot] = useState({});
  const [nomNewCourse, setNomNewCourse] = useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const childRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    handleSelect();
  }, [selectedCourse]);

  useEffect(() => {
    handleSelectEq();
  }, [eqCourseGot]);

  function selectCourse() {
    setCourseIsOpen(true);
  }

  function handleConvertPdf() {
    console.log(childRef.current.getTableInfo());
    navigate("/pre-approval-form-convert", {
      state: childRef.current.getTableInfo(),
    });
  }

  function handleSelect() {
    if (
      lastSelectedCourse === selectedCourse ||
      selectedCourse.courseCode === undefined
    ) {
      return;
    }

    bilkentCourses[selectedCourse.courseType].splice(
      bilkentCourses[selectedCourse.courseType].findIndex(
        (course) => course.courseCode === selectedCourse.courseCode
      ),
      1
    );
    childRef.current.bar(selectedCourse);

    setLastSelectedCourse(selectedCourse);
  }

  function handleSelectEq() {
    if (lastSelectedEq === eqCourseGot) {
      return;
    }
    console.log(eqCourseGot);
    if (childRef.current != null) {
      childRef.current.car(eqCourseGot);
    }
    //setLastSelectedEq(selectedCourse)
  }

  function closeSelectCourse() {
    setCourseIsOpen(false);
  }

  function closeSelectEqCourse() {
    setEqCourse(false);
  }

  function closeNominationPopup() {
    setNomNewCourse(false);
  }

  // the if clause is required otherwise react continuously rerender the page
  if (!loaded) {
    handleRequests(null, {}, "preapproval-student", "1", (response, status) => {
      setCandName(response.name);
      setCandSurname(response.surname);
      setCandID(response.id);
      setCandDepartment(response.department);
      setHostUniName(response.appliedInstitution);
      setDuration(durationTable[response.duration]);
      setECTSCredits(response.ECTSCredits);
      setCourses(response.bilkentCourses);
      setBilkentCourses(response.bilkentCourses);
      loaded = true;
      setLoading(false);
    });
  }

  if (isLoading) {
    return (
      <div className={"Page"}>
        <NavigationBar />
        <div className="lc-center1"><h3>Loading...</h3></div>
        <div className="lc-center2">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavigationBar />
      <div className="pafp-container">
        <h1 className="pafp-h1">Applicant Info:</h1>
        <table className="pafp-first-table">
          <tr>
            <td className="pafp-first-table-td">
              <p className="pafp-table-title">Name:</p>
            </td>
            <td className="pafp-first-table-td">
              <p className="ap-text-other">{candName}</p>
            </td>
          </tr>
          <tr>
            <td className="pafp-first-table-td">
              <p className="pafp-table-title">Surname:</p>
            </td>
            <td className="pafp-first-table-td">
              <p className="ap-text-other">{candSurname}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="pafp-table-title">ID Number:</p>
            </td>
            <td>
              <p className="ap-text-other">{candID}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="pafp-table-title">Department:</p>
            </td>
            <td>
              <p className="ap-text-other">{candDepartment}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="pafp-table-title">Host Institution Name:</p>
            </td>
            <td>
              <p className="ap-text-other">{hostUniName}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="pafp-table-title">Duration:</p>
            </td>
            <td>
              <p className="ap-text-other">Next {duration}</p>
            </td>
          </tr>
        </table>
        <div className="pafp-container2">
          <p className="pafp-alert">Course or Requirement to be Exempted</p>
          <p className="pafp-alert">
            Host Institution Courses to be Transferred Upon Approval
          </p>
        </div>
        <div className="pafp-flex-div">
          <TableAddRows
            getArrFunc={selectedCourse}
            selected={selectedCourse}
            ref={childRef}
            currentCourseForEq={setEqCourse}
            sendTotalCredits={setECTSCredits}
          />
        </div>
        <button className="btn btn-primary" onClick={selectCourse}>
          Add Course
        </button>
        <div>
          <table className="pafp-first-table">
            <tr>
              <td className="pafp-first-table-td">
                <p className="pafp-table-title">Total ECTS:</p>
              </td>
              <td className="pafp-first-table-td">
                <p className="ap-text-other">{ECTSCredits}</p>
              </td>
            </tr>
          </table>
          <table className="pafp-table-last">
            <tr>
              <td className="pafp-last-table-td"></td>
              <td className="pafp-last-table-td">
                <label className="pafp-label">
                  <Checkbox></Checkbox>I have read{" "}
                  <Link to="/info-page" className="pafp-link">
                    info
                  </Link>
                </label>
              </td>
              <td className="pafp-last-table-td">
                <p className="pafp-lined-header"></p>
              </td>
              <td className="pafp-last-table-td">
                <p className="pafp-lined-header"></p>
              </td>
              <td className="pafp-last-table-td">
                <p className="pafp-lined-header"></p>
              </td>
              <td className="pafp-last-table-td">
                <p className="pafp-lined-header">Approved By</p>
              </td>
              <td className="pafp-last-table-td">
                <p className="pafp-lined-header">Name</p>
              </td>
              <td className="pafp-last-table-td">
                <p className="pafp-lined-header">Signature</p>
              </td>
              <td className="pafp-last-table-td">
                <p className="pafp-lined-header">Date</p>
              </td>
            </tr>
            <tr>
              <td className="pafp-last-table-td">
                <button className="pafp-button" onClick={handleConvertPdf}>
                  Convert to PDF
                </button>
              </td>
              <td className="pafp-last-table-td">
                <button className="pafp-button-not-active">Submit Form</button>
              </td>
              <td className="pafp-last-table-td">
                <p className="pafp-lined-header"></p>
              </td>
              <td className="pafp-last-table-td">
                <p className="pafp-lined-header"></p>
              </td>
              <td className="pafp-last-table-td">
                <p className="pafp-lined-header"></p>
              </td>
              <td className="pafp-last-table-td">
                <p className="pafp-red-text">Not Approved</p>
              </td>
            </tr>
          </table>
        </div>
      </div>
      {selectCourseIsOpen && (
        <Modal
          courses={bilkentCourses}
          onCancel={closeSelectCourse}
          onSelect={handleSelect}
          setArrFunc={setSelectedCourse}
        />
      )}
      {selectCourseIsOpen && <Backdrop />}
      {eqCourse && <Backdrop />}
      {nomNewCourse && <Backdrop />}
      {eqCourse && (
        <EqPopUp
          onCancel={closeSelectEqCourse}
          bilkentCourse={eqCourse}
          eqCourses={eqCourse}
          hostUniName={hostUniName}
          setArrFunc={setEqCourseGot}
          onSelect={handleSelectEq}
          setNumFunc={setNomNewCourse}
        />
      )}
      {nomNewCourse && (
        <NomNewCoursePopUp
          bilkentCourse={nomNewCourse}
          hostUniName={hostUniName}
          onCancel={closeNominationPopup}
        />
      )}
    </div>
  );
}

export default PreApprovalFormPage;
