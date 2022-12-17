import NavigationBar from "../../../components/ui/NavigationBar/NavigationBar";
import img from "../profile.png";
import classes from "./ProfilePageOwn.module.css";

const user = 0;
//0->outgoing student, 1->incoming student, 2->others

function ProfilePageOwn() {
  if (user == 0) {
    return (
      <div>
        <NavigationBar />
        <div className={classes["pp-container"]}>
          <div className={classes["pp-img-container"]}>
            <img className={classes["pp-img"]} alt="" src={img} />
          </div>
          <div className={classes["pp-center"]}>
            <table className={classes["pp-table"]}>
              <tr>
                <td>
                  <h1 className={classes["pp-header-name"]}>İlker Özgen</h1>
                </td>
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>Bilkent ID:</td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>21902719</td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>E-Mail:</td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>
                  ilker.ozgen@ug.bilkent.edu.tr
                </td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>Department:</td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>Computer Science</td>
              </tr>
            </table>
          </div>
          <div className={classes["pp-center"]}>
            <table className={classes["pp-table"]}>
              <tr>
                <td>
                  <h1 className={classes["pp-header-name"]}> </h1>
                </td>
              </tr>
              <tr>
                <td>
                  <h1 className={classes["pp-header-name"]}> </h1>
                </td>
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>Study Cycle:</td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>Bachelor's</td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>
                  Receiving Institution:
                </td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>
                  Kingston University
                </td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>Erasmus Ranking:</td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>6</td>
              </tr>
            </table>
          </div>
        </div>
        <div className={classes["pp-center"]}>
          <button className={classes["pp-button"]}>Upload Image</button>
        </div>
      </div>
    );
  } else if (user == 1) {
    return (
      <div>
        <NavigationBar />
        <div className={classes["pp-container"]}>
          <div className={classes["pp-img-container"]}>
            <img className={classes["pp-img"]} alt="" src={img} />
          </div>
          <div className={classes["pp-center"]}>
            <table className={classes["pp-table"]}>
              <tr>
                <td>
                  <h1 className={classes["pp-header-name"]}>Michael Jordan</h1>
                </td>
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>Bilkent ID:</td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>XXXXXXXX</td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>E-Mail:</td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>
                  michael.jordan@ug.bilkent.edu.tr
                </td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>Department:</td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>Computer Science</td>
              </tr>
            </table>
          </div>
          <div className={classes["pp-center"]}>
            <table className={classes["pp-table"]}>
              <tr>
                <td>
                  <h1 className={classes["pp-header-name"]}> </h1>
                </td>
              </tr>
              <tr>
                <td>
                  <h1 className={classes["pp-header-name"]}> </h1>
                </td>
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>Study Cycle:</td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>Bachelor's</td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>
                  Sending Institution:
                </td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>
                  Kingston University
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className={classes["pp-center"]}>
          <button className={classes["pp-button"]}>Upload Image</button>
        </div>
      </div>
    );
  } else if (user == 2) {
    return (
      <div>
        <NavigationBar />
        <div className={classes["pp-container2"]}>
          <div className={classes["pp-img-container"]}>
            <img className={classes["pp-img"]} alt="" src={img} />
          </div>
          <div>
            <table className={classes["pp-table2"]}>
              <tr>
                <td>
                  <h1 className={classes["pp-header-name"]}>Can Alkan</h1>
                </td>
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>Bilkent ID:</td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>XXXX</td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>E-Mail:</td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>
                  calkan@cs.bilkent.edu.tr
                </td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>Role:</td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>
                  Erasmus Coordinator
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className={classes["pp-center"]}>
          <button className={classes["pp-button2"]}>Upload Image</button>
        </div>
      </div>
    );
  }
}

export default ProfilePageOwn;
