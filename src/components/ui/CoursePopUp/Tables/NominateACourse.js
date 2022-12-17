import style from "./NominateACourse.module.css";
import {Button, Container, Divider, Stack, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import {InputRow} from "../../../InputRow";
import {PropaneSharp} from "@mui/icons-material";
import {handleRequests} from "../../../../pages/requests";

const arr = [
    {value: "", text: "--Or Choose Already Existing Course to Merge--"},
    {value: "apple", text: "Apple 🍏"},
    {value: "banana", text: "Banana 🍌"},
    {value: "kiwi", text: "Kiwi 🥝"},
];

export default function App(props) {
    const [explanation, setExplanation] = useState("");
    const [story, setStory] = useState();
    const [inputFields, setInputFields] = useState([
        {
            courseCode: "",
            courseName: "",
            credits: "",
            website: "",
            syllabus: "",
        },
    ]);

    const bilkentCourse = props.bilkentCourse
    const hostUniName = props.hostUniName
    console.log(bilkentCourse)
    console.log(hostUniName)

    useEffect((e) => {
        if (story !== undefined){
            console.log("jennie", story);
            handleRequests(e, story, "preapproval-student-nominate-course", "0", (response, status) => {
                console.log(response)
                alert("Nomination is done!")
            })
        }
    }, [story]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await setStory({nominatedCoursesData: [...inputFields], explanation, bilkentCourse, hostUniName});
    };

    const handleChange = (event, index) => {
        const values = [...inputFields];
        console.log("momo", values);
        values[index][event.target.name] = event.target.value;

        setInputFields(values);
    };

    const handleName = (event) => {
        setExplanation(event.target.value);
    };

    // adds new input
    const handleAdd = () => {
        setInputFields([
            ...inputFields,
            {
                courseCode: "",
                courseName: "",
                credits: "",
                website: "",
                syllabus: "",
            },
        ]);
    };

    // removes input
    const handleRemove = (index) => {
        if (inputFields.length !== 1) {
            const values = [...inputFields];
            values.splice(index, 1);
            setInputFields(values);
        }
    };

    function handleClose() {
        props.onCancel();
    }

    return (
        <>
            <Container maxWidth="xs">
                <h4>Add Course Info</h4>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <Divider style={{marginBottom: 10, marginTop: 20}}/>

                        {inputFields.map((item, index) => (
                            <div key={index}>
                                <InputRow
                                    inputFields={inputFields}
                                    index={index}
                                    item={item}
                                    handleChange={handleChange}
                                    handleRemove={handleRemove}
                                    handleAdd={handleAdd}
                                />

                                <Divider style={{marginBottom: 10}}/>
                            </div>
                        ))}
                        <div>
                            <select
                                className="ir-selection-box"
                                onChange={handleChange}
                                name="fruits"
                                id="fruit-select"
                            >
                                {arr.map((option, index) => (
                                    <option key={index} value={option.value}>
                                        {option.text}
                                    </option>
                                ))}
                            </select>
                            <TextField style={{marginTop : 30 }}
                                name="explanation"
                                required
                                fullWidth
                                       multiline={6}
                                label="Message"
                                onChange={(event) => handleName(event)}
                                value={explanation}
                            />
                        </div>
                        <Button type="submit" variant="contained" disableElevation>
                            Send
                        </Button>
                        <Button disableElevation onClick={handleClose}>Cancel</Button>
                    </Stack>
                </form>
            </Container>
        </>
    );
}
