import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";

function ApplicationPage1() {
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
                <p className="ap-text-application-status">
                  Waiting for Academic <br /> Coordinator Inspection
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="ap-header-other">Applied Institution:</p>
              </td>
              <td>
                <p className="ap-text-other">Kingston University</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="ap-header-other">
                  Responsible Erasmus <br /> Coordinator:
                </p>
              </td>
              <td>
                <p className="ap-text-other">Can ALKAN</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="ap-header-other">Mobility Period:</p>
              </td>
              <td>
                <p className="ap-text-other">01.09.2023 - 01.01.2024</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="ap-header-other">Pre-Approval Form:</p>
              </td>
              <td>
                <p className="ap-text-other">Approved</p>
              </td>
              <td>
                <p className="ap-text-other">(Deadline: Passed)</p>
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
                <p className="ap-text-not-uploaded">Not Uploaded</p>
              </td>
              <td>
                <p className="ap-text-other">(Deadline: 31.03.2023)</p>
              </td>
              <td>
                <button className="ap-button-table">Edit</button>
              </td>
            </tr>
            <tr>
              <td>
                <p className="ap-header-other">Course Transfer Form:</p>
              </td>
              <td>
                <p className="ap-text-not-available">Not Yet Available</p>
              </td>
              <td></td>
              <td>
                <button className="ap-button-not-active" disabled>
                  Edit
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

export default ApplicationPage1;
