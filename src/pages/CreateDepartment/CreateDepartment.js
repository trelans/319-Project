import { Link } from "react-router-dom";

import "./styles.css";

import {handleRequests} from "../requests";
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

                        <button onClick={(e) => handleRequests(e, {"name": name}, "create/newDepartment", "0",(response, status) => {
                            console.log(response)
                            setCreatedId(response._id)
                        })}>Post Data</button>
                        <button onClick={(e) => handleRequests(e, {"depId": createdId}, "create/newDepartment", "1",(response, status) => {
                            setCreatedDep(JSON.stringify(response))
                        })}>Get Data</button>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateDepartment;