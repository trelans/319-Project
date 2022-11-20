import { Link } from "react-router-dom";

function SettingsPage() {
  return (
    <div className="sp-container">
      <Link to="/main-page">
        <button>Back</button>
      </Link>
      <form className="sp-center">
        <div>
          <h1 className="sp-h1">Settings</h1>
        </div>
        <div className="sp-btn-group">
          <button className="sp-button">Change Password</button>
          <button className="sp-button">Change E-Mail</button>
        </div>
        <div className="sp-center">
          <label class="container" className="sp-label">
            Disable Notifications
            <input type="checkbox" className="sp-checkbox" />
            <span class="checkmark"></span>
          </label>
        </div>
        <div className="sp-center">
          <label class="container" className="sp-label">
            Send E-Mail for Notifications
            <input
              type="checkbox"
              defaultChecked="true"
              className="sp-checkbox"
            />
            <span class="checkmark"></span>
          </label>
        </div>
      </form>
    </div>
  );
}

export default SettingsPage;