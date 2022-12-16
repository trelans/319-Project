import { Link } from "react-router-dom";
import { Checkbox } from "@mui/material";
import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import React from "react";
import Grid from "@mui/material/Grid";
import Table from "../../components/ui/Tables/CourseTransferForm/CourseTransferForm1";
import styles from "../LearningAgreement/LearningAgreementBeforeMobility.module.css";

function CourseTransferFormPage1() {
  return (
    <div>
      <NavigationBar />
      <div className="pafp-container">
        <h1 className="pafp-h1">
          Course Transfer and Exemption Form for Undergraduate Students Part 1
          of 2
        </h1>
        <table className="pafp-first-table">
          <tr>
            <td className="pafp-first-table-td">
              <p className="pafp-table-title">Name:</p>
            </td>
            <td className="pafp-first-table-td">
              <p className="ap-text-other">Onurcan</p>
            </td>
          </tr>
          <tr>
            <td className="pafp-first-table-td">
              <p className="pafp-table-title">Surname:</p>
            </td>
            <td className="pafp-first-table-td">
              <p className="ap-text-other">Ataç</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="pafp-table-title">ID Number:</p>
            </td>
            <td>
              <p className="ap-text-other">28578758</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="pafp-table-title">Department:</p>
            </td>
            <td>
              <p className="ap-text-other">Computer Science</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="pafp-table-title">Academic Year:</p>
            </td>
            <td>
              <p className="ap-text-other">2022</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="pafp-table-title">Semester:</p>
            </td>
            <td>
              <p className="ap-text-other">Fall</p>
            </td>
          </tr>
        </table>

        <div className="pafp-flex-div">
          <table className="pafp-se">
            <tr>
              <td className="pafp-td">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "0.5fr 0.7fr ",
                    margin: "auto",
                    marginLeft: 12,
                  }}
                >
                  <input
                    style={{ width: "30%" }}
                    type="checkbox"
                    name="addedComponent"
                  />
                  <p>External Transfer Student</p>
                </div>
              </td>

              <td>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "0.5fr 0.7fr ",
                    margin: "auto",
                    marginLeft: 12,
                  }}
                ></div>
              </td>
              <td className="pafp-td">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "0.5fr 0.7fr ",
                    margin: "auto",
                    marginLeft: 12,
                  }}
                >
                  <input
                    style={{ width: "60%" }}
                    type="checkbox"
                    name="addedComponent"
                  />
                  <p>External Transfer Student1</p>
                </div>
              </td>
            </tr>

            <tr>
              <td className="pafp-td" rowSpan={2}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "0.5fr 0.7fr ",
                    margin: "auto",
                    marginLeft: 12,
                  }}
                >
                  <input
                    style={{ width: "60%" }}
                    type="checkbox"
                    name="addedComponent"
                  />

                  <p>Outgoing Exchange Student</p>
                </div>
              </td>

              <td rowSpan={3}>
                <tr>
                  {" "}
                  <p>
                    {" "}
                    Name of the institution from which courses are transferred{" "}
                  </p>
                </tr>
              </td>
              <td className="pafp-td">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "0.5fr 0.7fr ",
                    margin: "auto",
                    marginLeft: 12,
                  }}
                >
                  <input
                    style={{ width: "60%" }}
                    type="checkbox"
                    name="addedComponent"
                  />
                  <p>External Transfer Student2</p>
                </div>
              </td>

              <td>
                <tr>
                  {" "}
                  <p> Name of Department </p>
                </tr>
              </td>
            </tr>
            <tr>
              <td className="pafp-td">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "0.5fr 0.7fr ",
                    margin: "auto",
                    marginLeft: 12,
                  }}
                >
                  <input
                    style={{ width: "60%" }}
                    type="checkbox"
                    name="addedComponent"
                  />
                  <p>External Transfer Student3</p>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div className="pafp-container"></div>
        <div>
          <Table></Table>
          <div className={"perfectCentered"}>
            <Link to="/course-transfer-page2">
              <button className={styles.butConvert}>Next Step </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseTransferFormPage1;
