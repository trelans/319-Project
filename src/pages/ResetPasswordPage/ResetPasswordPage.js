function ResetPasswordPage() {
  return (
    <div className="rpp-container">
      <div>
        <form>
          <div className="rpp-center">
            <h1 className="rpp-h1">
              Please enter your <br /> new password
            </h1>
          </div>
          <div className="rpp-center">
            <input
              className="rpp-input"
              type="password"
              placeholder="New Password"
            />
          </div>
          <div className="rpp-center">
            <input
              className="rpp-input"
              type="password"
              placeholder="New Password Again"
            />
          </div>

          <div className="rpp-center">
            <button className="rpp-button">Reset Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
