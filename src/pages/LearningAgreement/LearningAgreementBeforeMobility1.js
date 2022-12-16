import { Link } from "react-router-dom";
import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import InfoPageItem from "../InfoPage/InfoPageItem";
import LABMStudentInfo from "../../components/ui/Tables/LearningAgreements/Stage1/StudentInfoForm";
import LABMSendingInstution from "../../components/ui/Tables/LearningAgreements/Stage1/SendingInstutionForm";
import LABMReceivingInstution from "../../components/ui/Tables/LearningAgreements/Stage1/ReceivingInstutionForm";
import Grid from "@mui/material/Grid";
import React from "react";
import styles from "./LearningAgreementBeforeMobility.module.css";

function LearningAgreementBeforeMobility1() {

  return (
    <div>
      <NavigationBar></NavigationBar>

      <div className="ip-container">
        <h1 className="ip-h1">
          Learning Agreement Form Before Mobility Part 1 of 3:
        </h1>

        <div className={styles.learningAgreement3}>
          <Grid container justifyContent="center">
            <Grid item xs={6}>
              <h1
                style={{
                  marginRight: 200,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Student Info
              </h1>
              <p
                id="description"
                className="blackLetter"
                style={{ marginRight: 200 }}
              >
                Check your data
              </p>
              <LABMStudentInfo></LABMStudentInfo>
            </Grid>

            <Grid item xs={4}>
              <h1
                style={{
                  marginLeft: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Sending Institution
              </h1>
              <p id="description" className="blackLetter">
                Check your data
              </p>
              <LABMSendingInstution></LABMSendingInstution>
            </Grid>

            <Grid item xs={12}>
              <h1 id="title" className="blackLetter">
                Receiving Institution
              </h1>
              <p id="description" className="blackLetter">
                Check your data
              </p>
              <LABMReceivingInstution></LABMReceivingInstution>
            </Grid>
          </Grid>
        </div>
      </div>

      <div className="perfectCentered">
        <Link to="/learning-agreement-2-3">
          <button className={styles.butConvert}>Next Step </button>
        </Link>
      </div>
    </div>
  );
}

export default LearningAgreementBeforeMobility1;
