import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <div className="nb-header">
      <div className="nb-name">Toera</div>
      <nav>
        <ul>
          <li>
            <Link to="/main-page">Home</Link>
          </li>
          <li>
            <Link to="/profile-page">Profile</Link>
          </li>
          <li>
            <Link to="/chat-page">DM</Link>
          </li>
          <li>
            <Link to="/notification-popup">Notifications</Link>
          </li>
          <li>
            <Link to="/settings-page">Settings</Link>
          </li>
          <li className="nb-logout"
             onClick={() => {localStorage.clear()}}>
            <Link to="/login">Logout</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavigationBar;