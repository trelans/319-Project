import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  return (
    <div className="fpp-container">
      <div className="fpp-center">
        <h1 className="fpp-h1">Forgot Your Password?</h1>
      </div>
      <div className="fpp-center">
        <h2 className="fpp-h2">
          That's okay, it happens. <br />
          Click on the button to get a password reset link.
          <br />
          The link will be sent to your e-mail.
        </h2>
      </div>
      <div className="fpp-center">
            <Link to="/main-page">
              <button>RESET PASSWORD</button>
            </Link>
          </div>
    </div>
  );
}

export default ForgotPasswordPage;
