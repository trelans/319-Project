import { Link } from "react-router-dom";

import "./styles.css";

import ShowAlertComponent from "../requests";

function CreateDepartment() {
    return (
        <div class="lp-container">
            <div>
                <form>
                    <div className="lp-center">
                        <h1 className="lp-h1">
                            Welcome to <br /> Erasmus App!
                        </h1>
                    </div>
                    <input className="lp-input" type="text" placeholder="Username" />
                    <input className="lp-input" type="password" placeholder="Password" />
                    <div className="lp-center">
                        <Link to="/main-page">
                            <button className="lp-button">LOGIN</button>
                        </Link>
                        <ShowAlertComponent/>
                    </div>
                    <div className="lp-center">
                        <Link to="/forgot-password-page">Forgot Password?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateDepartment;