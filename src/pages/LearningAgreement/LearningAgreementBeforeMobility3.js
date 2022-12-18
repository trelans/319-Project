import {Link, useLocation, useNavigate} from "react-router-dom";
import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import InfoPageItem from "../InfoPage/InfoPageItem";
import LABMStudent from "../../components/ui/Tables/LearningAgreements/Stage3/Student";
import LABMSending from "../../components/ui/Tables/LearningAgreements/Stage3/ResponsiblePersonAtSendingIns";
import LABMReceiving from "../../components/ui/Tables/LearningAgreements/Stage3/ResponsiblePersonAtReceivingIns";
import Grid from "@mui/material/Grid";
import React, {useState} from "react";
import Card from "../../components/ui/Card";
import styles from "./LearningAgreementBeforeMobility.module.css";
import {handleRequests} from "../requests";
import LoadingSpinner from "../../components/ui/loadingComponent";


let loaded = false;

function LearningAgreementBeforeMobility3() {
    const {state} = useLocation();
    const [studentInfo, setStudentInfo] = useState();
    const [responsiblePersonFromSendingInsInfo, setResponsiblePersonFromSendingInsInfo] = useState();
    const [isLoading, setLoading] = useState(true);
    const [responsiblePersonAtReceivingInsInfo, setResponsiblePersonAtReceivingInsInfo] = useState();
    const [formID, setFormID] = useState("");
    const [approveButtonText, setApproveButtonText] = useState("")
    const navigate = useNavigate();
    const userType = localStorage.getItem("userType")

    // the if clause is required otherwise react continuously rerender the page
    if (!loaded) {
        handleRequests(
            null,
            {
                "name": "",
                userType,
                userId: state
            },
            "learning-agreement-3-3",
            "1",
            (response, status) => {
                console.log(response);
                setStudentInfo(response.studentInfo);
                setResponsiblePersonFromSendingInsInfo(response.responsiblePersonFromSendingInsInfo);
                setResponsiblePersonAtReceivingInsInfo(response.responsiblePersonAtReceivingInsInfo);
                setFormID(response.formID);
                loaded = true;
                setLoading(false);
                if (userType === "0"){
                    setApproveButtonText("Submit")
                }else{
                    setApproveButtonText("Approve")
                }
            }
        );
    }

    if (isLoading) {
        return (
            <div className="Page">
                <NavigationBar/>
                <div className="lc-center1"><h3>Loading...</h3></div>
                <div className="lc-center2">
                    <LoadingSpinner/>
                </div>
            </div>
        );
    }

    return (
        <div>
            <NavigationBar></NavigationBar>

            <div className="ip-container">
                <h1 className="ip-h1">
                    Learning Agreement Form Before Mobility Part 3 of 3:
                </h1>

                <div className={styles.learningAgreement3}>
                    <Grid container justifyContent="center">
                        <Grid item xs={6}>
                            <h1 style={{marginLeft: 170}}>Student</h1>
                        </Grid>
                        <Grid item xs={6}>
                            <h1>Responsible Person at Sending Institution</h1>
                        </Grid>
                        <Grid item xs={6}>
                            <LABMStudent id={formID}
                                         fields={studentInfo}
                                         infoType={0}>
                            </LABMStudent>
                        </Grid>
                        <Grid item xs={6}>
                            <LABMStudent id={formID}
                                         fields={responsiblePersonAtReceivingInsInfo}
                                         infoType={1}>
                            </LABMStudent>
                        </Grid>
                        <Grid item xs={6}>
                            <h1>Responsible Person at Receiving Institution</h1>
                            <LABMStudent id={formID}
                                         fields={responsiblePersonFromSendingInsInfo}
                                         infoType={2}>
                            </LABMStudent>
                        </Grid>
                        <Grid item xs={12}>
                            <div>
                                <h6>
                                    By signing this document, the student, the sending institution
                                    and the receiving institution confirm that they approve the
                                    proposed Learning Agreement and that they will comply with all
                                    the arrangements agreed by all parties. Sending and receiving
                                    institutions undertake to apply all the principles of the
                                    Erasmus Charter for Higher Education relating to mobility for
                                    studies (or the principles agreed in the inter-institutional
                                    agreement for institutions located in Partner Countries). The
                                    sending institution and the student should also commit to what
                                    is set out in the Erasmus+ grant agreement. The receiving
                                    institution confirms that the educational components listed in
                                    Table A are in line with its course catalogue and should be
                                    available to the student. The sending institution commits to
                                    recognise all the credits gained at the receiving institution
                                    for the successfully completed educational components and to
                                    count them towards the student's degree as described in Table
                                    C. Any exceptions to this rule are documented in an annex of
                                    this Learning Agreement and agreed by all parties. The student
                                    and receiving institution will communicate to the sending
                                    institution any problems or changes regarding the proposed
                                    mobility programme, responsible persons and/or study period.
                                </h6>
                            </div>
                        </Grid>
                    </Grid>

                    <div className="perfectCentered">
                        <button className={styles.butConvert} onClick={(e) => {
                            handleRequests(
                                e,
                                {
                                    formID,
                                    userType
                                },
                                "learning-agreement-3-3",
                                "2",
                                (response, status) => {
                                    if (userType === "0"){
                                        alert("Form is submitted")
                                    } else if(userType === "1"){
                                        alert("Form is approved")
                                    }
                                    navigate("/main-page");
                                }
                            );
                        }}>{approveButtonText}
                        </button>
                    </div>

                    <div className="perfectCentered">
                        <Link to="/learning-agreement-before-mobility-convert">
                            <button className={styles.butConvert}>Convert To Pdf</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LearningAgreementBeforeMobility3;
