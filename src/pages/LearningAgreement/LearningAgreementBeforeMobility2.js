
import { Link } from "react-router-dom";
import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";

import Grid from "@material-ui/core/Grid";
import React from "react";
import RecognitionTable from "../../components/ui/Tables/LearningAgreements/Stage2/RecognitionAtSendingInst"
import StudyProgrammeTable from "../../components/ui/Tables/LearningAgreements/Stage2/StudyProgrammeAtReceivingInst"
import styles from "./LearningAgreementBeforeMobility.module.css"
function LearningAgreementBeforeMobility2() {
    return(
        <div>
            <NavigationBar></NavigationBar>

            <div className="ip-container">
                <h1 className="ip-h1">Learning Agreement Form Before Mobility Part 2 of 3:</h1>
                <div className={styles.learningAgreement3}>
                    <h1 style={{marginLeft: 50, display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        Study Programme at Receiving Institution
                    </h1>
                    <p id="description" className="blackLetter">
                        Planned period of the mobility: from [month/year] to [month/year]
                    </p>
                    <StudyProgrammeTable></StudyProgrammeTable>

                    <h1 style={{marginLeft: 50, display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        Recognition at Sending Institution
                    </h1>

                    <StudyProgrammeTable></StudyProgrammeTable>
                </div>
            </div>

            <div className="perfectCentered">
                <Link to="/learning-agreement-3-3">
                    <button className = {styles.butConvert} >
                        Next Step{" "}
                    </button>
                </Link>
            </div>

        </div>
    );
}

export default LearningAgreementBeforeMobility2;