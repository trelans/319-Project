import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import NavigationBar from "../../../components/ui/NavigationBar/NavigationBar";
import img from "../profile.png";
import classes from "../ProfilePageOwn/ProfilePageOwn.module.css";
import jwt_decode from "jwt-decode";

/*
//There should be restrictions for logged in user type, not implemented yet.
const loggedInUserType = 0;
//0->outgoing student 1->incoming student 2->others
const willDisplayType = 0;
//0->outgoing student 1->incoming student 2->others
*/

function ProfilePageOthers() {
  const { state } = useLocation();
  const [currentUser, setCurrentUser] = useState();
  const [willDisplayType, setWillDisplayType] = useState(0);
  const [university, setUniversity] = useState();
  const navigate = useNavigate();

  const user = jwt_decode(localStorage.getItem("token"));

  console.log(willDisplayType);

  useEffect(() => {
    console.log("Here");
    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/user/${state}`, {});

        if (
          res.data.userType == 0 &&
          res.data.erasmusCandidateData.nominatedUniversityId
        ) {
          const res2 = await axios.get(
            `http://localhost:8080/university/${res.data.erasmusCandidateData.nominatedUniversityId}`,
            {}
          );
          console.log(res2.data);
          setUniversity(res2.data);
        }

        setCurrentUser(res.data);
      } catch (error) {
        console.log("There is a problem");
      }
    };

    getUser();
  }, []);

  console.log(state);
  console.log(currentUser);

  useEffect(() => {
    try {
      if (currentUser.userType == 0) {
        setWillDisplayType(0);
      } else if (currentUser.userType == 5) {
        setWillDisplayType(1);
      } else {
        setWillDisplayType(2);
      }
    } catch (error) {}
  }, [currentUser]);

  const handleClick = () => {
    navigate("/chat", {
      state: {
        name: currentUser.name,
        surname: currentUser.surname,
        objectId: currentUser._id,
        fromProfile: true,
      },
    });
  };

  function goToApplicationStatus() {
    navigate("/application-page-coordinator", { state: currentUser._id });
  }

  if (willDisplayType == 0 && currentUser) {
    return (
      <div>
        <NavigationBar />
        <div className="pp-container">
          <div className="pp-img-container">
            <img className="pp-img" alt="" src={img} />
          </div>
          <div className="pp-center">
            <table className="pp-table">
              <tr>
                <td>
                  <h1 className="pp-header-name">
                    {currentUser.name + " " + currentUser.surname}
                  </h1>
                </td>
              </tr>
              <tr>
                <td className="pp-header-other">Bilkent ID:</td>
              </tr>
              <tr>
                <td className="pp-text-other">
                  {currentUser.erasmusCandidateData.studentId}
                </td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className="pp-header-other">E-Mail:</td>
              </tr>
              <tr>
                <td className="pp-text-other">{currentUser.email}</td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className="pp-header-other">Department:</td>
              </tr>
              <tr>
                <td className="pp-text-other">CS</td>
              </tr>
            </table>
          </div>
          <div className="pp-center">
            <table className="pp-table">
              <tr>
                <td>
                  <h1 className="pp-header-name"></h1>
                </td>
              </tr>
              <tr>
                <td>
                  <h1 className="pp-header-name"></h1>
                </td>
              </tr>
              <tr>
                <td className="pp-header-other">Study Cycle:</td>
              </tr>
              <tr>
                <td className="pp-text-other">Bachelor's</td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className="pp-header-other">Receiving Institution:</td>
              </tr>
              <tr>
                <td className="pp-text-other">
                  {university ? university.name : ""}
                </td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className="pp-header-other">Erasmus Points:</td>
              </tr>
              <tr>
                <td className="pp-text-other">
                  {currentUser.erasmusCandidateData.totalPoints}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div onClick={(e) => handleClick()} className="pp-center">
          <button className="pp-button">Message</button>
        </div>

        {user.userType == 1 ? (
          <div className={classes["pp-center"]}>
            <button
              className={classes["pp-button"]}
              onClick={goToApplicationStatus}
            >
              Application Status
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  } else if (willDisplayType == 1) {
    return (
      <div>
        <NavigationBar />
        <div className="pp-container">
          <div className="pp-img-container">
            <img className="pp-img" alt="" src={img} />
          </div>
          <div className="pp-center">
            <table className="pp-table">
              <tr>
                <td>
                  <h1 className="pp-header-name">
                    {currentUser.name + " " + currentUser.surname}
                  </h1>
                </td>
              </tr>
              <tr>
                <td className="pp-header-other">Bilkent ID:</td>
              </tr>
              <tr>
                <td className="pp-text-other">
                  {currentUser.incomingStudentData.studentId}
                </td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className="pp-header-other">E-Mail:</td>
              </tr>
              <tr>
                <td className="pp-text-other">{currentUser.email}</td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className="pp-header-other">Department:</td>
              </tr>
              <tr>
                <td className="pp-text-other">Computer Science</td>
              </tr>
            </table>
          </div>
          <div className="pp-center">
            <table className="pp-table">
              <tr>
                <td>
                  <h1 className="pp-header-name"></h1>
                </td>
              </tr>
              <tr>
                <td>
                  <h1 className="pp-header-name"></h1>
                </td>
              </tr>
              <tr>
                <td className="pp-header-other">Study Cycle:</td>
              </tr>
              <tr>
                <td className="pp-text-other">Bachelor's</td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className="pp-header-other">Sending Institution:</td>
              </tr>
              <tr>
                <td className="pp-text-other">
                  {currentUser.incomingStudentData.sendingInstitution}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="pp-center">
          <button className="pp-button">Upload Image</button>
        </div>
      </div>
    );
  } else if (willDisplayType == 2) {
    return (
      <div>
        <NavigationBar />
        <div className="pp-container2">
          <div className="pp-img-container">
            <img className="pp-img" alt="" src={img} />
          </div>
          <div>
            <table className="pp-table2">
              <tr>
                <td>
                  <h1 className="pp-header-name">
                    {currentUser.name + " " + currentUser.surname}
                  </h1>
                </td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className="pp-header-other">E-Mail:</td>
              </tr>
              <tr>
                <td className="pp-text-other">{currentUser.email}</td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className="pp-header-other">Role:</td>
              </tr>
              <tr>
                <td className="pp-text-other">Erasmus Coordinator</td>
              </tr>
            </table>
          </div>
        </div>
        <div onClick={(e) => handleClick()} className="pp-center">
          <button className="pp-button">Message</button>
        </div>
      </div>
    );
  }
}

export default ProfilePageOthers;
