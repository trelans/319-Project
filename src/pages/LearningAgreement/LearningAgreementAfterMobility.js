import { Link } from "react-router-dom";
import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";

import Grid from "@mui/material/Grid";
import React from "react";

import Sending from "../../components/ui/Tables/LearningAgreements/StageA/Sending";
import Receiving from "../../components/ui/Tables/LearningAgreements/StageA/Recieving";

import styles from "./LearningAgreementBeforeMobility.module.css";
function LearningAgreementBeforeMobility2() {
  return (
    <div>
      <NavigationBar></NavigationBar>

      <div className="ip-container">
        <h1 className="ip-h1">Learning Agreement Form After Mobility</h1>
        <div className={styles.learningAgreement3}>
          <h1
            style={{
              marginLeft: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Study Programme at Receiving Institution
          </h1>
          <p id="description" className="blackLetter">
            Planned period of the mobility: from [month/year] to [month/year]
          </p>
          <Receiving></Receiving>

          <h1
            style={{
              marginLeft: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Recognition at Sending Institution
          </h1>

          <Sending></Sending>
        </div>
      </div>

      <div className="perfectCentered">
        <Link to="/learning-agreement-after-mobility-convert">
          <button className={styles.butConvert}>Convert To Pdf </button>
        </Link>
      </div>
    </div>
  );
}

export default LearningAgreementBeforeMobility2;
