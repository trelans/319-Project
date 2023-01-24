import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function ResetPasswordPage() {

  const [field_1, setField_1] = useState()
  const [field_2, setField_2] = useState()




  const handleSubmit = () => {
    
    if(field_1 != field_2) {
      alert("Passwords does not match")
    } else if (field_1 != "" && field_2 != "" && field_1 && field_2) {
      fetch("http://localhost:8080/user/updatePassword", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/JSON",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          password: field_1
        }),
      });

    }
    
  }
  

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
              onChange={(e) => {
                setField_1(e.target.value)
              }}
            />
          </div>
          <div className="rpp-center">
            <input
              className="rpp-input"
              type="password"
              placeholder="New Password Again"
              onChange={(e) => {
                setField_2(e.target.value)
              }}
            />
          </div>

          <div className="rpp-center">
            <button onClick={(e) => handleSubmit()} className="rpp-button">Reset Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
