import { Link } from "react-router-dom";
import classes from "../../components/ui/NavigationBar/NavigationBar.module.css";
import SearchBarMain from "./SearchBarMain";
import BookData from "./Data.json";

function NavigationBar() {
  return (
    <div className={classes["nb-header"]}>
      <div className={classes["nb-name"]}>Toera</div>

      <nav>
        <ul>
          <li>
            <Link to="/main-page">Home</Link>
          </li>
          <li>
            <Link to="/profile-page">Profile</Link>
          </li>
          <li>
            <Link to="/chat">DM</Link>
          </li>
          <li>
            <Link to="/notification-popup">Notifications</Link>
          </li>
          <li>
            <Link to="/settings-page">Settings</Link>
          </li>
          <li
            className={classes["nb-logout"]}
            onClick={() => {
              localStorage.clear();
            }}
          >
            <Link to="/login">Logout</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavigationBar;
