import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import img from "./profile.png";
import { Link } from "react-router-dom";

function ProfilePageOthersStudent() {
  return (
    <div>
      <NavigationBar />
      <div className="pp-container">
        <div className="pp-img-container">
          <img className="pp-img" alt="" src={img} />
        </div>
        <div className="pp-center">
          <table className="pp-table">
            <tr>
              <td>
                <h1 className="pp-header-name">İlker Özgen</h1>
              </td>
            </tr>
            <tr>
              <td className="pp-header-other">Bilkent ID:</td>
            </tr>
            <tr>
              <td className="pp-text-other">21902719</td>
            </tr>
            <tr>
              <br />
            </tr>
            <tr>
              <td className="pp-header-other">E-Mail:</td>
            </tr>
            <tr>
              <td className="pp-text-other">ilker.ozgen@ug.bilkent.edu.tr</td>
            </tr>
            <tr>
              <br />
            </tr>
            <tr>
              <td className="pp-header-other">Department:</td>
            </tr>
            <tr>
              <td className="pp-text-other">Computer Science</td>
            </tr>
          </table>
        </div>
        <div className="pp-center">
          <table className="pp-table">
            <tr>
              <td>
                <h1 className="pp-header-name"> </h1>
              </td>
            </tr>
            <tr>
              <td>
                <h1 className="pp-header-name"> </h1>
              </td>
            </tr>
            <tr>
              <td className="pp-header-other">Study Cycle:</td>
            </tr>
            <tr>
              <td className="pp-text-other">Bachelor's</td>
            </tr>
            <tr>
              <br />
            </tr>
            <tr>
              <td className="pp-header-other">Receiving Institution:</td>
            </tr>
            <tr>
              <td className="pp-text-other">Kingston University</td>
            </tr>
            <tr>
              <br />
            </tr>
            <tr>
              <td className="pp-header-other">Erasmus Ranking:</td>
            </tr>
            <tr>
              <td className="pp-text-other">6</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="pp-button-container">
        <button className="pp-button">Message</button>
      </div>
      <Link to="/application-page-coordinator">
        <div className="pp-button-container">
          <button className="pp-button">See Application Status</button>
        </div>
      </Link>
    </div>
  );
}

export default ProfilePageOthersStudent;
