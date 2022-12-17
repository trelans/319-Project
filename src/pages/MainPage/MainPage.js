import { Link, useLocation } from "react-router-dom";
import { handleRequests } from "../requests";

import NavigationBarMain from "./NavigationBarMain";
import TodoWidget from "./TodoWidget";

import Grid from "@mui/material/Grid";
import SearchBarMain from "./SearchBarMain";
import BookData from "./Data.json";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import RatingPopup from "../../components/ui/CoursePopUp/UniversityRatingPopup";
import Backdrop from "../../components/ui/CoursePopUp/Backdrop";

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
              id : val._id,
              itemType: "user"
            }
          }))
      } catch (error) {
          
      }
    }
    getUsers()
  }, [])

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
              id : val._id,
              itemType: "university"
            }
          }))
      } catch (error) {
          
      }
    }
    getUniversities()
  }, [])

  const handeSelect = (option) => {
    if (option == 0) {
      setData(users);
    } else {
      setData(universities);
    }
  };

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
        <NavigationBarMain />
        <div>
          <SearchBarMain placeholder="Search..." data={data} />
        </div>
        <div className="main-margined">
          <form>
            <select
              onChange={(e) => handeSelect(e.target.options.selectedIndex)}
              id="searchParameter"
              name="searchParameter"
            >
              <option value="user">User</option>
              <option value="university">University</option>
            </select>
          </form>
        </div>
        <div className="main-absolute">
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <TodoWidget />
            </Grid>
            <Grid item xs={2}>
              <Link to="/application-page1">
                <button className="fpp-button">Application Status</button>
              </Link>
            </Grid>
            <Grid item xs={1}>
              <button
                className="fpp-button"
                onClick={openUniversityRatingPopup}
              >
                ratingsPopup check
              </button>
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
