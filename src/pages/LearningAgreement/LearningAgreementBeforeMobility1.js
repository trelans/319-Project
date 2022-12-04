
import { Link } from "react-router-dom";
import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import InfoPageItem from "../InfoPage/InfoPageItem";
import LABMStudentInfo from "../../components/ui/Tables/LearningAgreements/BeforeMobilityStudentInfo1"
function LearningAgreementBeforeMobility1() {
    return(
        <div>
            <NavigationBar></NavigationBar>

                <div className="ip-container">
                    <h1 className="ip-h1">Learning Agreement Form Before Mobility Part 1 of 3:</h1>
                    <h1 className="ip-h1">Student Info</h1>
                </div>
            <div className="TableStudentInfo" >
                <LABMStudentInfo></LABMStudentInfo>

            </div>
                <div className="ip-center">
                    <button className="ip-button">I Accept The Terms</button>
                </div>
        </div>
    );
}

export default LearningAgreementBeforeMobility1;