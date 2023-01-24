import { handleRequests } from "../requests";
import {useState, useRef, useEffect} from "react";
import * as React from "react";
import Pdf from "react-to-pdf";
import LearningAgreementBeforeMobilityTable from "./PdfTables/LearningAgreementBeforeMobilityTable";
import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import LoadingSpinner from "../../components/ui/loadingComponent";

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

function LearningAgreementBeforeMobilityConvert() {
  const [studentInfo, setStudentInfo] = useState();
  const [studentSignInfo, setStudentSignInfo] = useState();
  const [receivingInstitutionInfo, setReceivingInstitutionInfo] = useState();
  const [sendingInstitutionInfo, setSendingInstitutionInfo] = useState();
  const [responsiblePersonAtReceivingInsInfo, setResponsiblePersonAtReceivingInsInfo] = useState();
  const [responsiblePersonFromSendingInsInfo, setResponsiblePersonFromSendingInsInfo] = useState();
  const [isLoading, setLoading] = React.useState(true);

  // the if clause is required otherwise react continuously rerender the page
  if (!loaded) {
    handleRequests(
      null,
      {},
      "learning-agreement-before-mobility-convert",
      "1",
      (response, status) => {
        console.log(response);
        setStudentInfo(response.studentInfo);
        setSendingInstitutionInfo(response.sendingInstitutionInfo);
        setReceivingInstitutionInfo(response.receivingInstitutionInfo);
        setResponsiblePersonFromSendingInsInfo(response.responsiblePersonFromSendingInsInfo)
        setResponsiblePersonAtReceivingInsInfo(response.responsiblePersonAtReceivingInsInfo)
        setStudentSignInfo(response.studentSignInfo)
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
            <h1 className="cp-h1">Learning Agreement Before Mobility</h1>
          </div>
        </div>
        <div className="cp-container">
          <div className="cp-center">
            <table className="cp-table">
              <tr className="cp-row">
                <td className="cp-col">Name:</td>
                <td className="cp-col">{studentInfo.name}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Surname:</td>
                <td className="cp-col">{studentInfo.lastName}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Date of Birth:</td>
                <td className="cp-col">{studentInfo.dateOfBirth}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Nationality:</td>
                <td className="cp-col">{studentInfo.nationality}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Gender:</td>
                <td className="cp-col">{studentInfo.gender}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Academic Year:</td>
                <td className="cp-col">{studentInfo.academicYear}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Study Cycle:</td>
                <td className="cp-col">{studentInfo.studyCycle}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Subject Area Code:</td>
                <td className="cp-col">{studentInfo.subjectAreaCode}</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="cp-container">
          <div className="cp-center">
            <table className="cp-table">
              <tr className="cp-row">
                <td className="cp-col">Institution Name:</td>
                <td className="cp-col">{sendingInstitutionInfo.name}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Faculty:</td>
                <td className="cp-col">{sendingInstitutionInfo.faculty}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Erasmus Code:</td>
                <td className="cp-col">{sendingInstitutionInfo.erasmusCode}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Department:</td>
                <td className="cp-col">
                  {sendingInstitutionInfo.departmentName}
                </td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Address:</td>
                <td className="cp-col">{sendingInstitutionInfo.address}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Country:</td>
                <td className="cp-col">{sendingInstitutionInfo.country}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Contact Person Name:</td>
                <td className="cp-col">{sendingInstitutionInfo.contactPerson.name}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Contact Person E-Mail:</td>
                <td className="cp-col">{sendingInstitutionInfo.contactPerson.email}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Contact Person Phone Number:</td>
                <td className="cp-col">{sendingInstitutionInfo.contactPerson.phoneNumber}</td>
              </tr>
            </table>
          </div>
          <div className="cp-center">
            <table className="cp-table">
              <tr className="cp-row">
                <td className="cp-col">Instution Name:</td>
                <td className="cp-col">{receivingInstitutionInfo.name}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Faculty:</td>
                <td className="cp-col">{receivingInstitutionInfo.faculty}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Erasmus Code:</td>
                <td className="cp-col">
                  {receivingInstitutionInfo.erasmusCode}
                </td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Department:</td>
                <td className="cp-col">
                  {receivingInstitutionInfo.departmentName}
                </td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Address:</td>
                <td className="cp-col">{receivingInstitutionInfo.address}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Country:</td>
                <td className="cp-col">{receivingInstitutionInfo.country}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Contact Person Name:</td>
                <td className="cp-col">{receivingInstitutionInfo.contactPerson.name}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Contact Person E-Mail:</td>
                <td className="cp-col">{receivingInstitutionInfo.contactPerson.email}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Contact Person Phone Number:</td>
                <td className="cp-col">{receivingInstitutionInfo.contactPerson.phoneNumber}</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="cp-container">
          <div className="cp-center">
            <LearningAgreementBeforeMobilityTable />
          </div>
        </div>
        <div className="cp-container">
          <div className="cp-center">
            <table className="cp-table">
              <tr className="cp-row">
                <td className="cp-col">Name:</td>
                <td className="cp-col">{studentSignInfo.name}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Function:</td>
                <td className="cp-col">{studentSignInfo.personFunction}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Phone Number:</td>
                <td className="cp-col">{studentSignInfo.phoneNumber}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Mail:</td>
                <td className="cp-col">{studentSignInfo.email}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Date:</td>
                <td className="cp-col">{studentSignInfo.date}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Signature:</td>
                <td className="cp-col">{studentSignInfo.signature}</td>
              </tr>
            </table>
          </div>
          <div className="cp-center">
            <table className="cp-table">
              <tr className="cp-row">
                <td className="cp-col">Name:</td>
                <td className="cp-col">{responsiblePersonAtReceivingInsInfo.name}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Function:</td>
                <td className="cp-col">{responsiblePersonAtReceivingInsInfo.personFunction}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Phone Number:</td>
                <td className="cp-col">{responsiblePersonAtReceivingInsInfo.phoneNumber}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Mail:</td>
                <td className="cp-col">{responsiblePersonAtReceivingInsInfo.email}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Date:</td>
                <td className="cp-col">{responsiblePersonAtReceivingInsInfo.date}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Signature:</td>
                <td className="cp-col">{responsiblePersonAtReceivingInsInfo.signature}</td>
              </tr>
            </table>
          </div>
          <div className="cp-center">
            <table className="cp-table">
              <tr className="cp-row">
                <td className="cp-col">Name:</td>
                <td className="cp-col">{responsiblePersonFromSendingInsInfo.name}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Function:</td>
                <td className="cp-col">{responsiblePersonFromSendingInsInfo.personFunction}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Phone Number:</td>
                <td className="cp-col">{responsiblePersonFromSendingInsInfo.phoneNumber}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Mail:</td>
                <td className="cp-col">{responsiblePersonFromSendingInsInfo.email}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Date:</td>
                <td className="cp-col">{responsiblePersonFromSendingInsInfo.date}</td>
              </tr>
              <tr className="cp-row">
                <td className="cp-col">Signature:</td>
                <td className="cp-col">{responsiblePersonFromSendingInsInfo.signature}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningAgreementBeforeMobilityConvert;
