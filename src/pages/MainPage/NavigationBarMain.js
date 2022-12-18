import { Link } from "react-router-dom";
import classes from "../../components/ui/NavigationBar/NavigationBar.module.css";
import SearchBarMain from "./SearchBarMain";
import img from "./logo.png";
import { NotificationManager } from "react-notifications";

function NavigationBarMain() {
  function fetchNotifications() {
    NotificationManager.info("Hey I am Adyasha", "Info!", 5000);
    NotificationManager.success(
      "A sample notification message",
      "Success",
      5000
    );
  }

  return (
    <div className={classes["nb-header"]}>
      <div>
        <Link to="/main-page">
          <img alt="" src={img} style={{ marginLeft: 10 }} />
        </Link>
      </div>
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
            <Link onClick={fetchNotifications}>Notifications</Link>
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

export default NavigationBarMain;
