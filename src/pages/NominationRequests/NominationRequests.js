import { Link, useLocation } from "react-router-dom";

import Grid from "@mui/material/Grid";

import { useState } from "react";

import RatingPopup from "../../components/ui/CoursePopUp/UniversityRatingPopup";
import Backdrop from "../../components/ui/CoursePopUp/Backdrop";
import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
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

                </div>
                <div className="main-margined">
                    <form>

                    </form>
                </div>
                <div className="main-absolute">



                </div>

            </div>
        </div>
    );
}

export default MainPage;
