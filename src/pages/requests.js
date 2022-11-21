import React from "react";

// Type = 0 => POST Request, Type = 1 => GET Request
export const handleRequests = (e, data, page, type, callback) => {
    e.preventDefault();
    data.type = type
    console.log(data)
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
            callback(res, status)
        });
};