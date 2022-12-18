import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import { useState } from "react";
import { handleRequests } from "../requests";
import * as React from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/ui/loadingComponent";
import { useEffect } from "react";

function returnButtonText(status) {
  if (status < 2 || status === 3) {
    return "Edit";
  } else {
    return "View";
  }
}

function returnButtonStatus(status) {
  if (status === 0) {
    return "ap-button-not-active";
  } else {
    return "ap-button-table";
  }
}

function returnStatusClass(formStatus) {
  const textClasses = {
    0: "ap-text-not-available",
    1: "ap-text-not-uploaded",
    2: "ap-text-not-uploaded",
    3: "ap-text-not-uploaded",
    4: "ap-text-granted",
    5: "ap-text-granted",
  };
  return textClasses[formStatus];
}

function ApplicationPage1() {
  const [status, setStatus] = useState("");
  const [erasmusCoordinator, setErasmusCoordinator] = useState("");
  const [appliedInstitution, setAppliedInstitution] = useState("");
  const [mobilityPeriod, setMobilityPeriod] = useState("");
  const [PFStatus, setPFStatus] = useState("");
  const [PFDeadline, setPFDeadline] = useState("");
  const [LAFStatus, setLAFStatus] = useState("");
  const [LAFDeadline, setLAFDeadline] = useState("");
  const [CTFStatus, setCTFStatus] = useState("");
  const [CTFDeadline, setCTFDeadline] = useState("");
  const [PFButtonText, setPFButtonText] = useState("");
  const [LAFButtonText, setLAFButtonText] = useState("");
  const [PFStatusClass, setPFStatusClass] = useState("");
  const [LAFStatusClass, setLAFStatusClass] = useState("");
  const [CTFStatusClass, setCTFStatusClass] = useState("");
  const [PFButtonStatus, setPFButtonStatus] = useState("");
  const [LAFButtonStatus, setLAFButtonStatus] = useState("");
  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(false);
  }, isLoading);

  const appStatusTable = {
    0: "Waiting For Erasmus Candidate to Upload Preapproval Form",
    1: "Waiting For Erasmus Coordinator to Evaluate Preapproval Form",
    2: "Waiting For Faculty Administration Committee to Approve Preapproval Form",
    3: "Waiting For Erasmus Candidate to Upload Learning Agreement Form Before Mobility",
    4: "Waiting For Erasmus Coordinator to Approve Learning Agreement Form",
    5: "Waiting For Erasmus Candidate to Make Changes in Learning Agreement Form During Mobility (If Necessary)",
    6: "Mobility Period (No Actions Necessary)",
    7: "Waiting For Erasmus Candidate to upload Learning Agreement Form After Mobility",
    8: "Waiting For Erasmus Coordinator to upload Course Transfer Form",
    9: "Waiting For Faculty Administration Committee to approve Course Transfer Form",
    10: "Application Completed",
  };
  const formStatusTable = {
    0: "Not Available",
    1: "Not Uploaded",
    2: "Not Evaluated",
    3: "Rejected",
    4: "Approved By Erasmus Coordinator (Waiting for Faculty Member Approval)",
    5: "Approved By Faculty Committee Member"
  };

  if (isLoading) {
    handleRequests(null, {}, "application-page1", "1", (response, status) => {
      setStatus(appStatusTable[response.status]);
      setErasmusCoordinator(response.erasmusCoordinator);
      setAppliedInstitution(response.appliedInstitution);
      setMobilityPeriod(response.mobilityPeriod);
      setPFStatus(formStatusTable[response.PFStatus]);
      setPFDeadline(response.PFDeadline);
      setLAFStatus(formStatusTable[response.LAFStatus]);
      setLAFDeadline(response.LAFDeadline);
      setCTFStatus(formStatusTable[response.CTFStatus]);
      setCTFDeadline(response.CTFDeadline);
      setPFButtonText(returnButtonText(response.PFStatus));
      setLAFButtonText(returnButtonText(response.LAFStatus));
      setPFStatusClass(returnStatusClass(response.PFStatus));
      setPFButtonStatus(returnButtonStatus(response.PFStatus));
      setLAFStatusClass(returnStatusClass(response.LAFStatus));
      setLAFButtonStatus(returnButtonStatus(response.LAFStatus));
      setCTFStatusClass(returnStatusClass(response.CTFStatus));
      setLoading(false);
    });
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
      <NavigationBar />
      <div className="ap-container">
        <div className="ap-center">
          <table>
            <tr>
              <td>
                <p className="ap-header-application-status">
                  Application Status:
                </p>
              </td>
              <td>
                <p className="ap-text-application-status">{status}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="ap-header-other">Applied Institution:</p>
              </td>
              <td>
                <p className="ap-text-other">{appliedInstitution}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="ap-header-other">
                  Responsible Erasmus <br /> Coordinator:
                </p>
              </td>
              <td>
                <p className="ap-text-other">{erasmusCoordinator}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="ap-header-other">Mobility Period:</p>
              </td>
              <td>
                <p className="ap-text-other">{mobilityPeriod}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="ap-header-other">Pre-Approval Form:</p>
              </td>
              <td>
                <p className={PFStatusClass}>{PFStatus}</p>
              </td>
              <td>
                <p className="ap-text-other">{PFDeadline}</p>
              </td>
              <td>
                <Link to="/preapproval-student">
                  <button className={PFButtonStatus}>{PFButtonText}</button>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <p className="ap-header-other">Learning Agreement Form:</p>
              </td>
              <td>
                <p className={LAFStatusClass}>{LAFStatus}</p>
              </td>
              <td>
                <p className="ap-text-other">{LAFDeadline}</p>
              </td>
              <td>
                {LAFButtonStatus === "ap-button-not-active" ? ( // change later
                  <button className={LAFButtonStatus}>{LAFButtonText}</button>
                ) : (
                  <Link to="/learning-agreement-1-3">
                    <button className={LAFButtonStatus}>{LAFButtonText}</button>
                  </Link>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <p className="ap-header-other">Course Transfer Form:</p>
              </td>
              <td>
                <p className={CTFStatusClass}>{CTFStatus}</p>
              </td>
              <td></td>
            </tr>
          </table>
        </div>
        <div className="ap-center">
          <button className="ap-button">Cancel Application</button>
          <button className="ap-button">Discard Placement</button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationPage1;
