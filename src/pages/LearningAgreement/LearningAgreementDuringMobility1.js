
import { Link } from "react-router-dom";
import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";

import Grid from "@mui/material/Grid";
import React from "react";
import TableA from "../../components/ui/Tables/LearningAgreements/StageD1/TableA"

import styles from "./LearningAgreementBeforeMobility.module.css"
import TableB from "../../components/ui/Tables/LearningAgreements/StageD1/TableB";
function LearningAgreementBeforeMobility1() {
    return(
        <div>
            <NavigationBar></NavigationBar>

            <div className="ip-container">
                <h1 className="ip-h1">Learning Agreement During Mobility Part 1 of 2:</h1>
                <div className={styles.learningAgreement3}>
                    <h1 style={{marginLeft: 50, display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        Exceptional changes to Table A

                    </h1>
                    <p id="description" className="blackLetter">
                        (to be approved by e-mail or signature by the student, the responsible person in the sending institution and the responsible person in the receiving institution)
                    </p>
                    <TableA></TableA>

                    <h1 style={{marginLeft: 50, display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        Exceptional changes to Table B
                    </h1>
                    <p id="description" className="blackLetter">
                        (to be approved by e-mail or signature by the student and the responsible person in the sending institution)
                    </p>
                    <TableB></TableB>

                </div>
            </div>

            <div className="perfectCentered">
                <Link to="/learning-agreement-d-1-2">
                    <button className = {styles.butConvert} >
                        Next Step{" "}
                    </button>
                </Link>
            </div>

        </div>
    );
}

export default LearningAgreementBeforeMobility1;