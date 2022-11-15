import { Link } from "react-router-dom";

import "./LoginPage.css";

function LoginPage() {
  return (
    <div class="container">
      <div>
        <form>
          <div className="center">
            <h1 className="lp-h1">
              Welcome to <br /> Erasmus App!
            </h1>
          </div>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <div className="center">
            <Link to="/main-page">
              <button>LOGIN</button>
            </Link>
          </div>
          <div className="center">
            <Link to="/forgot-password-page">Forgot Password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
