import React from "react";


export const handleSubmit = (e, data, page, type, setProp) => {
    e.preventDefault();
    data.type = type
    console.log(data)
    const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    };

    fetch("http://localhost:8080/" + page, requestOptions)
        .then(response => response.json())
        .then(res => {
            console.log(res.department)
            console.log(res.department._id)
            if (type === "0"){
                setProp(res.department._id)
            }else {
                console.log(res.department._id)
                setProp(JSON.stringify(res.department))
            }
        });
};