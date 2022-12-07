
import { Link } from "react-router-dom";
import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import InfoPageItem from "../InfoPage/InfoPageItem";
import LABMStudentInfo from "../../components/ui/Tables/LearningAgreements/StudentInfo/StudentInfoForm"
import LABMSendingInstution from "../../components/ui/Tables/LearningAgreements/StudentInfo/SendingInstutionForm"
import LABMReceivingInstution from "../../components/ui/Tables/LearningAgreements/StudentInfo/ReceivingInstutionForm"
import Grid from "@material-ui/core/Grid";

function LearningAgreementBeforeMobility1() {
    return(
        <div>
            <NavigationBar></NavigationBar>

                <div className="ip-container">
                    <h1 className="ip-h1">Learning Agreement Form Before Mobility Part 1 of 3:</h1>
                    <Grid container>
                        <Grid item xs={6} >
                            <LABMStudentInfo></LABMStudentInfo>
                        </Grid>

                        <Grid item xs={6} >
                            <LABMSendingInstution></LABMSendingInstution>
                        </Grid>

                        <Grid item xs={6} >
                            <LABMReceivingInstution></LABMReceivingInstution>
                        </Grid>




                    </Grid>

                </div>

        </div>
    );
}

export default LearningAgreementBeforeMobility1;