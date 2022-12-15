import React from "react";
import jwt_decode from "jwt-decode";

// Type = 0 => POST Request, Type = 1 => GET Request
export const handleRequests = (e, data, page, type, callback) => {
    if (e) {
        e.preventDefault();
    }
    data.token = localStorage.getItem("token")
    data.type = type
    console.log("data:", data)
    const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    };
    let status;

    fetch("http://localhost:8080/" + page, requestOptions)
        .then(res => {
            status = res.status
            return res.json()
        })
        .then(res => {
            res.userType = localStorage.getItem("userType")
            callback(res, status)
        });
};