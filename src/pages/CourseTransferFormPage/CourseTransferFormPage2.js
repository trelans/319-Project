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
          Course Transfer and Exemption Form for Undergraduate Students Part 2
          of 2
        </h1>
        <table
          className="pafp-second-table"
          style={{ background: "#354259", color: "white" }}
        >
          <tr>
            <td className="pafp-td">
              <p className="alignAndWhite">Approved By</p>
            </td>
            <td className="pafp-td">
              <p className="alignAndWhite">Name</p>
            </td>
            <td className="pafp-td">
              <p className="alignAndWhite">Signature</p>
            </td>
            <td className="pafp-td">
              <p className="alignAndWhite">Date</p>
            </td>
          </tr>
          <tr>
            <td className="pafp-td">
              <p className="alignAndWhite">
                Exchange Coordinator (exchange students only)
              </p>
            </td>
            <td className="pafp-td">
              <p className="alignAndWhite"></p>
            </td>
            <td className="pafp-td">
              <p className="alignAndWhite"></p>
            </td>
            <td className="pafp-td">
              <p className="alignAndWhite"></p>
            </td>
          </tr>

          <tr>
            <td className="pafp-td">
              <p className="alignAndWhite">Chair</p>
            </td>
            <td className="pafp-td">
              <p className="alignAndWhite"></p>
            </td>
            <td className="pafp-td">
              <p className="alignAndWhite"></p>
            </td>
            <td className="pafp-td">
              <p className="alignAndWhite"></p>
            </td>
          </tr>

          <tr>
            <td className="pafp-td">
              <p className="alignAndWhite">Dean / Director</p>
            </td>
            <td className="pafp-td">
              <p className="alignAndWhite"></p>
            </td>
            <td className="pafp-td">
              <p className="alignAndWhite"></p>
            </td>
            <td className="pafp-td">
              <p className="alignAndWhite"></p>
            </td>
          </tr>
        </table>

        <div className={"perfectCentered"}>
          <Link to="/course-transfer-form-convert">
            <button className="fpp-button">Convert To PDF</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseTransferFormPage1;
