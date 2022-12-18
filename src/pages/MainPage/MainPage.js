import { Link, useLocation } from "react-router-dom";
import { handleRequests } from "../requests";

import NavigationBarMain from "./NavigationBarMain";
import TodoWidget from "./TodoWidget";

import Grid from "@mui/material/Grid";
import SearchBarMain from "./SearchBarMain";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import RatingPopup from "../../components/ui/CoursePopUp/UniversityRatingPopup";
import Backdrop from "../../components/ui/CoursePopUp/Backdrop";
import LoadingSpinner from "../../components/ui/loadingComponent";

function MainPage() {
  /*
  const state = useLocation()
  const id = state.id
  handleRequests(state, {"id": id}, "dashboard", "1",(response, status) => {
        // TODO Parameter state should be e normally, find how to send event without component from main page
        console.log(response)
      }
  )
  console.log(state)
  console.log(id)
  // Rerouting the user to the main page can be here if we do not see id or maybe can be doable using tokens
  */
  const [users, setUsers] = useState();
  const [universities, setUniversities] = useState();
  const [data, setData] = useState(users);

  useEffect(() => {
    const getUsers = async () => {
      try {
        console.log("Getting users!!");
        const res = await axios.get(`http://localhost:8080/getAllUsers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(
          res.data.map((val) => {
            return {
              name: val.name + " " + val.surname,
              id: val._id,
              itemType: "user",
            };
          })
        );
      } catch (error) {}
    };
    getUsers();
  }, []);


  const replyNomRequestButton = () => (
      <Grid xs={12}>
        <Link to="/nominationRequests">
          <button className="fpp-button-main" >
            Reply Nomination Requests
          </button>
        </Link>
      </Grid>

  )
  const logsButton = () => (
      <Grid xs={12}>
        <Link to="/logs-page">
          <button className="fpp-button-main">
            Logs
          </button>
        </Link>
      </Grid>
  )
  const universityListButton = () => (
      <Grid xs={12}>
        <Link to="/university-list">
          <button className="fpp-button-main">
            University List
          </button>
        </Link>
      </Grid>
  )

  const applicationStatusButton = () => (

      <Grid xs={12}>
        <Link to="/application-page1">
          <button className="fpp-button-main">Application Status</button>
        </Link>
      </Grid>
  )
  const rateYourExperiencesButton = () => (
      <Grid xs={12}>
        <button
            className="fpp-button-main"
            onClick={openUniversityRatingPopup}
        >
          Rate Your Experiences!
        </button>
      </Grid>
  )
  useEffect(() => {
    const getUniversities = async () => {
      try {
        console.log("Getting universities!!");
        const res = await axios.get(`http://localhost:8080/universities`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUniversities(
          res.data.map((val) => {
            return {
              name: val.name,
              id: val._id,
              itemType: "university",
            };  
          })
        );
      } catch (error) {}
    };
    getUniversities();
  }, []);

  const handeSelect = (option) => {
    if (option == 1) {
      setData(users);
    } else if (option == 2) {
      setData(universities);
    } else {
      setData(undefined);
    }
    setPlaceHolder("Search...");
  };

  const [popupOpen, setPopup] = useState(false);
  const [placeHolderBar, setPlaceHolder] = useState("Select Type");

  function openUniversityRatingPopup() {
    setPopup(true);
  }

  function closePopup() {
    setPopup(false);
  }

  return (
    <div>
      <div>
        <NavigationBarMain />
        <div>
          <SearchBarMain placeholder={placeHolderBar} data={data} />
        </div>
        <div className="main-margined" >
          <form>
            <select
              onChange={(e) => handeSelect(e.target.options.selectedIndex)}
              id="searchParameter"
              name="searchParameter"
              style={{ borderRadius: 5, marginTop: 3 }}
            >
              {" "}
              <option value="Select">Select</option>
              <option value="user">User</option>
              <option value="university">University</option>
            </select>
          </form>

        </div>
        <div className="main-absolute" >
          <Grid container  style={{  marginTop: 0 } }>
            <Grid item xs={6}  >
              <div className={"dashboard-cards"} >
                <TodoWidget />
              </div>
            </Grid>
            <Grid item xs={6 }>
              <div className={"dashboard-cards"}>
                <h1
                    style={{

                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#afaaa0"
                    }}
                >
                 Operations
                </h1>
                <Grid container padding={3}>


                  { localStorage.getItem("userType") == 0 ? applicationStatusButton() : null }
                  { localStorage.getItem("userType") == 0 ? rateYourExperiencesButton() : null }
                  { localStorage.getItem("userType") == 1 ? universityListButton() : null }
                  { localStorage.getItem("userType") == 1 ? logsButton() : null }
                  { localStorage.getItem("userType") == 3 || localStorage.getItem("userType") == 1 ? replyNomRequestButton() : null }
                </Grid>
              </div>
            </Grid>
            <Grid item xs={1}>

            </Grid>
          </Grid>

          {popupOpen && <RatingPopup onCancel={closePopup} />}
          {popupOpen && <Backdrop />}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
