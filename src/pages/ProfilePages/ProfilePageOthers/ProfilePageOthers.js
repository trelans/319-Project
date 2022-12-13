import NavigationBar from "../../../components/ui/NavigationBar/NavigationBar";
import img from "../profile.png";

//There should be restrictions for logged in user type, not implemented yet. Should we show a cannot be accessed screen?
const loggedInUserType = 0;
//0->outgoing student 1->incoming student 2->others
const willDisplayType = 0;
//0->outgoing student 1->incoming student 2->others

function ProfilePageOthers() {
  if (willDisplayType == 0) {
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
      </div>
    );
  } else if (willDisplayType == 1) {
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
                  <h1 className="pp-header-name">Michael Jordan</h1>
                </td>
              </tr>
              <tr>
                <td className="pp-header-other">Bilkent ID:</td>
              </tr>
              <tr>
                <td className="pp-text-other">XXXXXXXX</td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className="pp-header-other">E-Mail:</td>
              </tr>
              <tr>
                <td className="pp-text-other">
                  michael.jordan@ug.bilkent.edu.tr
                </td>
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
                <td className="pp-header-other">Sending Institution:</td>
              </tr>
              <tr>
                <td className="pp-text-other">Kingston University</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="pp-button-container">
          <button className="pp-button">Upload Image</button>
        </div>
      </div>
    );
  } else if (willDisplayType == 2) {
    return (
      <div>
        <NavigationBar />
        <div className="pp-container2">
          <div className="pp-img-container">
            <img className="pp-img" alt="" src={img} />
          </div>
          <div>
            <table className="pp-table2">
              <tr>
                <td>
                  <h1 className="pp-header-name">Can Alkan</h1>
                </td>
              </tr>
              <tr>
                <td className="pp-header-other">Bilkent ID:</td>
              </tr>
              <tr>
                <td className="pp-text-other">XXXX</td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className="pp-header-other">E-Mail:</td>
              </tr>
              <tr>
                <td className="pp-text-other">calkan@cs.bilkent.edu.tr</td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className="pp-header-other">Role:</td>
              </tr>
              <tr>
                <td className="pp-text-other">Erasmus Coordinator</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="pp-button-container">
          <button className="pp-button2">Message</button>
        </div>
      </div>
    );
  }
}

export default ProfilePageOthers;
