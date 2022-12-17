import { Link } from "react-router-dom";
import classes from "./NavigationBar.module.css";
import img from "./logo.png";

function NavigationBar() {
  return (
    <div className={classes["nb-header"]}>
      <Link to="/main-page">
        <img alt="" src={img} style={{ marginLeft: 10 }} />
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/main-page">Home</Link>
          </li>
          <li>
            <Link to="/profile-own">Profile</Link>
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
