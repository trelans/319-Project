import {Link, useLocation} from "react-router-dom";
import {handleRequests} from "../requests";

function MainPage() {
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
  return <div><div>Main Page</div><Link to="/settings-page"><button>Settings</button></Link></div>;
}

export default MainPage;
