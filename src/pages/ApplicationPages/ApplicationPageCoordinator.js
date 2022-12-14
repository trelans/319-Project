import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import {useState} from "react";
import {handleRequests} from "../requests";

function ApplicationPageCoordinator() {
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

  handleRequests(null, {}, "application-page1", "1", (response, status) => {
    setStatus(response.status);
    setErasmusCoordinator(response.erasmusCoordinator);
    setAppliedInstitution(response.appliedInstitution);
    setMobilityPeriod(response.mobilityPeriod);
    setPFStatus(response.PFStatus);
    setPFDeadline(response.PFDeadline);
    setLAFStatus(response.LAFStatus);
    setLAFDeadline(response.LAFDeadline);
    setCTFStatus(response.CTFStatus);
    setCTFDeadline(response.CTFDeadline);
  });

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
                <p className="ap-text-other">{PFStatus}</p>
              </td>
              <td>
                <p className="ap-text-other">{PFDeadline}</p>
              </td>
              <td>
                <button className="ap-button-table">View</button>
              </td>
            </tr>
            <tr>
              <td>
                <p className="ap-header-other">Learning Agreement Form:</p>
              </td>
              <td>
                <p className="ap-text-not-uploaded">{LAFStatus}</p>
              </td>
              <td>
                <p className="ap-text-other">{LAFDeadline}</p>
              </td>
              <td>
                <button className="ap-button-table">View</button>
              </td>
            </tr>
            <tr>
              <td>
                <p className="ap-header-other">Course Transfer Form:</p>
              </td>
              <td>
                <p className="ap-text-not-available">{CTFStatus}</p>
              </td>
              <td></td>
              <td>
                <button className="ap-button-not-active" disabled>
                  View
                </button>
              </td>
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

export default ApplicationPageCoordinator;
