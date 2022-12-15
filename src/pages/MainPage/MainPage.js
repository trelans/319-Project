import { Link, useLocation } from "react-router-dom";
import { handleRequests } from "../requests";

import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import TodoWidget from "./TodoWidget";

import Grid from "@mui/material/Grid";

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
      <div div>
        <NavigationBar />
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <TodoWidget />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default MainPage;
