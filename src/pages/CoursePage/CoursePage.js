import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import classes from "../ProfilePages/ProfilePageOwn/ProfilePageOwn.module.css";
import img from "../ProfilePages/profile.png";

function CoursePage() {
  return (
    <div>
      <NavigationBar />

      <div className={"perfectCentered"} style={{ border: "solid 2px black" }}>
        <table className={classes["pp-table2"]}>
          <tr>
            <td>
              <h1 className={classes["pp-header-name"]}>Course Name: </h1>
            </td>
            <td>
              <h1 className={classes["pp-header-name"]}> ENG101</h1>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <h6
                className={classes["pp-text-other"]}
                className={"perfectCentered"}
              >
                {" "}
                Bilkent University
              </h6>
            </td>
          </tr>
        </table>
      </div>
      <div>
        <div>
          <table className={classes["pp-table2"]} style={{ width: "95%" }}>
            <tr>
              <td className={classes["pp-header-other"]}>Course Code:</td>
              <td
                className={classes["pp-text-other"]}
                style={{ borderRight: "solid 2px black" }}
              >
                35234
              </td>
              <td className={classes["pp-header-other"]}>Required Language:</td>
              <td className={classes["pp-text-other"]}>English</td>
            </tr>

            <tr>
              <td className={classes["pp-header-other"]}>Website Link:</td>
              <td
                className={classes["pp-text-other"]}
                style={{ borderRight: "solid 2px black" }}
              >
                https://www.google.com/
              </td>
              <td className={classes["pp-header-other"]}>Department:</td>
              <td className={classes["pp-text-other"]}>English</td>
            </tr>

            <tr>
              <td className={classes["pp-header-other"]}>Syllabus:</td>
              <td
                className={classes["pp-text-other"]}
                style={{ borderRight: "solid 2px black" }}
              >
                https://www.google.com/
              </td>
              <td className={classes["pp-header-other"]}>ECTS Credits:</td>
              <td className={classes["pp-text-other"]}>3</td>
            </tr>
            <tr>
              <br />
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
