import { Link } from "react-router-dom";

import "./styles.css";

import {handleSubmit} from "../requests";
import React, {useState} from "react";

function CreateDepartment() {
    const [name, setName] = useState('')
    const [createdId, setCreatedId] = useState('')
    const [createdDep, setCreatedDep] = useState('')

    return (
        <div className="lp-container">
            <div>
                <form>
                    <div className="lp-center">
                        <h3 className="POST response Created Dep Id">CREATED DEP ID: {createdId}</h3>
                        <h3 className="GET  response Created Dep">CREATED DEP: {createdDep}</h3>
                    </div>
                    <input className="lp-input" type="text" placeholder="Department Name" onChange={e => setName(e.target.value)}/>
                    <div className="lp-center">

                        <button onClick={(e) => handleSubmit(e, {"name": name}, "create/newDepartment", "0",(result) => {
                            setCreatedId(result)
                            console.log("name", name)
                        })}>Post Data</button>
                        <button onClick={(e) => handleSubmit(e, {"depId": createdId}, "create/newDepartment", "1",(result) => {
                            setCreatedDep(result)
                        })}>Get Data</button>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateDepartment;