import { Link, useLocation } from "react-router-dom";
import { handleRequests } from "../requests";

import NavigationBarMain from "./NavigationBarMain";
import TodoWidget from "./TodoWidget";

import Grid from "@mui/material/Grid";
import SearchBarMain from "./SearchBarMain";
import BookData from "./Data.json";

import DropDown from "./DropDown.js";

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

  return (
    <div>
      <div>
        <NavigationBarMain />
        <div>
          <SearchBarMain placeholder="Search..." data={BookData} />
        </div>
        <div className="main-margined">
          <form>
            <label for="cars">Choose a car:</label>
            <select id="cars" name="cars">
              <option value="volvo">User</option>
              <option value="saab">University</option>
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
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
