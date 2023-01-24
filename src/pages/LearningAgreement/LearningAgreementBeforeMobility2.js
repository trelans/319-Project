import {Link, useLocation} from "react-router-dom";
import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";

import Grid from "@mui/material/Grid";
import React, {useState} from "react";
import RecognitionTable from "../../components/ui/Tables/LearningAgreements/Stage2/RecognitionAtSendingInst"
import StudyProgrammeTable from "../../components/ui/Tables/LearningAgreements/Stage2/StudyProgrammeAtReceivingInst"
import styles from "./LearningAgreementBeforeMobility.module.css"
import {handleRequests} from "../requests";

let loaded = false

function LearningAgreementBeforeMobility2() {
    const {state} = useLocation();
    console.log(state)
    const [bilkentCourses, setBilkentCourses] = useState([])
    const [foreignCourses, setForeignCourses] = useState([])
    const [semester, setSemester] = useState("")
    const [isLoading, setLoading] = React.useState(true)

    if (!loaded) {
        handleRequests(null, {
            "name": "",
            userType: localStorage.getItem("userType"),
            userId: state
        }, "learning-agreement-2-3", "1", (response, status) => {
            setForeignCourses(response.foreignCourses)
            setBilkentCourses(response.bilkentCourses)
            setSemester(response.preferredSemester)
            loaded = true
            setLoading(false)
        })

    }

    if (isLoading) {
        return <div className={"Page"}>
            <NavigationBar/>
            <div className="App">Loading...</div>
        </div>;
    }

    return (
        <div>
            <NavigationBar></NavigationBar>

            <div className="ip-container">
                <h1 className="ip-h1">Learning Agreement Form Before Mobility Part 2 of 3:</h1>
                <div className={styles.learningAgreement3}>
                    <h1 style={{marginLeft: 50, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        Study Programme at Receiving Institution
                    </h1>
                    <p id="description" className="blackLetter">
                        Planned period of the mobility: from [month/year] to [month/year]
                    </p>
                    <StudyProgrammeTable semester={semester} courses={foreignCourses}></StudyProgrammeTable>

                    <h1 style={{marginLeft: 50, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        Recognition at Sending Institution
                    </h1>

                    <StudyProgrammeTable semester={semester} courses={bilkentCourses}></StudyProgrammeTable>
                </div>
            </div>

            <div className="perfectCentered">
                <Link to="/learning-agreement-3-3" state={state}>
                    <button className={styles.butConvert}>
                        Next Step{" "}
                    </button>
                </Link>
            </div>

        </div>
    );
}

export default LearningAgreementBeforeMobility2;