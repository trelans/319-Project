import { Link, useLocation } from "react-router-dom";

import Grid from "@mui/material/Grid";

import { useState } from "react";

import RatingPopup from "../../components/ui/CoursePopUp/UniversityRatingPopup";
import Backdrop from "../../components/ui/CoursePopUp/Backdrop";
import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import NomReqTable from "../../components/ui/CoursePopUp/Tables/NomRequestTable"
function MainPage() {

    const [popupOpen, setPopup] = useState(false);

    function openUniversityRatingPopup() {
        setPopup(true);
    }

    function closePopup() {
        setPopup(false);
    }

    return (
        <div>
            <div>
                <NavigationBar />
                <div>
                    <NomReqTable></NomReqTable>
                </div>
                <div className="main-margined">

                </div>
                <div className="main-absolute">



                </div>

            </div>
        </div>
    );
}

export default MainPage;
