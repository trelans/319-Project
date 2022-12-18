import { Link, useLocation, useNavigate } from "react-router-dom";
import { Checkbox } from "@mui/material";
import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import TableAddRows from "./TableAddRows";
import TableAddRowsView from "./TableAddRowsView";
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
  const { state } = useLocation();
  const [selectCourseIsOpen, setCourseIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = React.useState({});
  const [selectedCourseEq, setSelectedCourseEq] = React.useState({});
  const [lastSelectedCourse, setLastSelectedCourse] = React.useState();
  const [lastSelectedEq, setLastSelectedEq] = React.useState();
  const [eqCourse, setEqCourse] = React.useState();
  const [candName, setCandName] = useState("");
  const [appFormStatus, setAppFormStatus] = useState();
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
  const [wishList, setWishList] = useState();
  const [academicYear, setAcademicYear] = useState();
  const [wishCourses, setwishCourses] = useState();
  const [userType, setUserType] = useState();

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

  useEffect(() => {
    fillTable();
  }, [wishCourses]);

  useEffect(
    (e) => {
      console.log(wishList);
      console.log("in submission");
      if (wishList !== undefined) {
        console.log("Wish List", wishList);
        handleRequests(
          e,
          wishList,
          "preapproval-student",
          "2",
          (response, status) => {
            console.log(response);
            alert("Preapproval is submitted");
            navigate("/main-page");
          }
        );
      }
    },
    [wishList]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setWishList({
      wishCourses: [...childRef.current.getTableInfo()],
      ectsCredits: ECTSCredits,
    });
  };

  const handleApprove = async (e) => {
    console.log("Burada");
    e.preventDefault();
    handleRequests(
      e,
      {
        approvedStage: 1,
        userType: localStorage.getItem("userType"),
        userId: state,
      },
      "preapproval-student",
      "2",
      (response, status) => {
        console.log(response);
        alert("Preapproval is approved");
        navigate("/main-page");
      }
    );
  };

  const handleApproveFaculty = async (e) => {
    console.log("Burada");
    e.preventDefault();
    handleRequests(
      e,
      {
        approvedStage: 2,
        userType: localStorage.getItem("userType"),
        userId: state,
      },
      "preapproval-student",
      "2",
      (response, status) => {
        console.log(response);
        alert("Preapproval is approved");
        navigate("/main-page");
      }
    );
  };

  function handleConvertPdf() {
    if (appFormStatus === 1) {
      console.log(childRef.current.getTableInfo());
      localStorage.setItem(
        "preapprovalinfo",
        JSON.stringify(childRef.current.getTableInfo())
      );
      navigate("/pre-approval-form-convert", {
        state: childRef.current.getTableInfo(),
      });
    } else if (appFormStatus === 2) {
      localStorage.setItem("preapprovalinfo", JSON.stringify(wishCourses));
      navigate("/pre-approval-form-convert");
    }
  }

  function fillTable() {
    if (appFormStatus >= 2) {
      childRef.current.setTableInfo(wishCourses);
      console.log(wishCourses);
    }
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

  function handleFeedback() {
    navigate("/chat", {
      state: {
        name: candName,
        surname: candSurname,
        objectId: candID,
        fromProfile: true,
      },
    });
  }

  // the if clause is required otherwise react continuously rerender the page
  if (!loaded) {
    handleRequests(
      null,
      {
        usrType: localStorage.getItem("userType"),
        userId: state,
      },
      "preapproval-student",
      "1",
      (response, status) => {
        //response.userType
        console.log(response);
        setUserType(localStorage.getItem("userType")); //response.userType OLCAK
        setwishCourses(response.wishCourses);
        setAppFormStatus(response.formStatus);
        setCandName(response.name);
        setCandSurname(response.surname);
        setCandID(response.id);
        setCandDepartment(response.department);
        setHostUniName(response.appliedInstitution);
        setDuration(durationTable[response.duration]);
        setECTSCredits(response.ECTSCredits);
        setCourses(response.bilkentCourses);
        setBilkentCourses(response.bilkentCourses);
        setAcademicYear(response.academicYear);
        loaded = true;
        setLoading(false);
      }
    );
  }

  if (isLoading) {
    return (
      <div className={"Page"}>
        <NavigationBar />
        <div className="lc-center1">
          <h3>Loading...</h3>
        </div>
        <div className="lc-center2">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  //student
  if (userType == 0) {
    //edit
    console.log(appFormStatus);
    if (appFormStatus == 1) {
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
                    <button
                      onClick={handleSubmit}
                      className="pafp-button-not-active"
                    >
                      Submit Form
                    </button>
                  </td>
                  <td className="pafp-last-table-td">
                    <p className="pafp-red-text">Not Approved</p>
                  </td>
                  <td className="pafp-last-table-td">
                    <p className="pafp-red-text">Can Alkan</p>
                  </td>
                  <td className="pafp-last-table-td">
                    <p className="pafp-red-text">Signature</p>
                  </td>
                  <td className="pafp-last-table-td">
                    <p className="pafp-red-text">12.12.2022</p>
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
    //view
    else if (appFormStatus >= 2) {
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
              <TableAddRowsView
                getArrFunc={selectedCourse}
                selected={selectedCourse}
                ref={childRef}
                currentCourseForEq={setEqCourse}
                sendTotalCredits={setECTSCredits}
              />
            </div>
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
                  <td className="pafp-last-table-td"></td>
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
                  <td className="pafp-last-table-td"></td>
                  <td className="pafp-last-table-td">
                    <p className="pafp-red-text">Not Approved</p>
                  </td>
                  <td className="pafp-last-table-td">
                    <p className="pafp-red-text">Can Alkan</p>
                  </td>
                  <td className="pafp-last-table-td">
                    <p className="pafp-red-text">Signature</p>
                  </td>
                  <td className="pafp-last-table-td">
                    <p className="pafp-red-text">12.12.2022</p>
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
  }
  //erasmus coordinator
  else if (userType == 1) {
    console.log("PAPAPA");
    //edit
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
                <td className="pafp-last-table-td">
                  <button onClick={handleConvertPdf} className="pafp-button">
                    Convert to PDF
                  </button>
                </td>
                <td className="pafp-last-table-td"></td>
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
                  <button className="pafp-button-blue" onClick={handleApprove}>
                    Approve Form
                  </button>
                </td>
                <td className="pafp-last-table-td">
                  <button
                    onClick={(e) => handleFeedback()}
                    className="pafp-button"
                  >
                    Give Feedback
                  </button>
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
  //committee member
  else if (userType == 2) {
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
            <TableAddRowsView
              getArrFunc={selectedCourse}
              selected={selectedCourse}
              ref={childRef}
              currentCourseForEq={setEqCourse}
              sendTotalCredits={setECTSCredits}
            />
          </div>
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
                <td className="pafp-last-table-td">
                  <button onClick={handleConvertPdf} className="pafp-button">
                    Convert to PDF
                  </button>
                </td>
                <td className="pafp-last-table-td"></td>
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
                  <button
                    onClick={handleApproveFaculty}
                    className="pafp-button-blue"
                  >
                    Approve Form
                  </button>
                </td>
                <td className="pafp-last-table-td">
                  <button className="pafp-button-yellow">Reject Form</button>
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
}

export default PreApprovalFormPage;
