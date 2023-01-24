function ResetMailPage() {
  return (
    <div className="rpp-container">
      <div>
        <form>
          <div className="rpp-center">
            <h1 className="rpp-h1">
              Please enter your new E-Mail
            </h1>
          </div>
          <div className="rpp-center">
            <input
              className="rpp-input"
              type="text"
              placeholder="E-Mail"
            />
          </div>
          <div className="rpp-center">
            <button className="rpp-button">Reset E-Mail</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetMailPage;
