import React from "react";


const ShowAlertComponent = (props) => {
    console.log(props)
    const handleSubmit = e => {
        e.preventDefault();
        console.log("b")
        const data = { "name": "Math"};
        const requestOptions = {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };
        console.log(requestOptions.body)
        fetch("http://localhost:8080/create/newDepartment", requestOptions)
            .then(response => response.json())
            .then(res => console.log(res));
    };

    return <button onClick={handleSubmit}>Show alert</button>;
}
export default ShowAlertComponent;