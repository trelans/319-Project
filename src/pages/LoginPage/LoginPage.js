import { Link, useNavigate } from "react-router-dom";

import "./styles.css";

import { handleRequests } from "../requests";
import React, { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="lp-container">
      <div>
        <form>
          <div className="lp-center">
            <h1 className="lp-h1">
              Welcome to <br /> toera!
            </h1>
          </div>
          <input
            className="lp-input"
            type="text"
            placeholder="E-Mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="lp-input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="lp-center">
            <button
              className="lp-button"
              onClick={(e) =>
                handleRequests(
                  e,
                  { email: email, password: password },
                  "login",
                  "0",
                  (res, status) => {
                    console.log(status);
                    console.log(res);
                    if (status === 200) {
                      // Send any necessary data to other page here
                      localStorage.setItem("token", res.token);
                      localStorage.setItem("userType", res.user.userType);
                      localStorage.setItem(
                        "contacts",
                        JSON.stringify(res.user.contacts)
                      );
                      navigate("/main-page");
                    }else {
                      alert("Incorrect password or email!")
                    }

                  }
                )
              }
            >
              LOGIN
            </button>
          </div>
          <div className="lp-center">
            <Link to="/forgot-password-page">Forgot Password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
