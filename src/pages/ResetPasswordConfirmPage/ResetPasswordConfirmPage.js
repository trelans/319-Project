import { Link } from "react-router-dom";

function ResetPasswordConfirmPage() {
  return (
    <div className="rpcp-container">
      <div className="rpcp-center">
        <h1 className="rpcp-h1">Verification Code Sent to Your E-Mail</h1>
      </div>
      <div className="rpcp-center">
        <h2 className="rpcp-h2">Please enter the code below</h2>
      </div>
      <div className="rpcp-center">
        <input
          className="rpcp-input"
          type="text"
          placeholder="Verification Code"
        />
      </div>
      <div className="rpcp-center">
        <Link to="/reset-password-page">
          <button className="rpcp-button">SUBMIT CODE</button>
        </Link>
      </div>
      <div className="rpcp-center">
        <a className="rpcp-a" href="url">
          Send Again
        </a>
      </div>
    </div>
  );
}

export default ResetPasswordConfirmPage;
