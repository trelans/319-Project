
import { Link } from "react-router-dom";
import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import InfoPageItem from "../InfoPage/InfoPageItem";
import LABMStudentInfo from "../../components/ui/Tables/LearningAgreements/StudentInfo/StudentInfoForm"
import LABMSendingInstution from "../../components/ui/Tables/LearningAgreements/BeforeMobilitySendingInstution1"
import LABMReceivingInstution from "../../components/ui/Tables/LearningAgreements/BeforeMobilityReceivingInstution1"

function LearningAgreementBeforeMobility1() {
    return(
        <div>
            <NavigationBar></NavigationBar>

                <div className="ip-container">
                    <h1 className="ip-h1">Learning Agreement Form Before Mobility Part 1 of 3:</h1>
                    <LABMStudentInfo></LABMStudentInfo>
                </div>

        </div>
    );
}

export default LearningAgreementBeforeMobility1;