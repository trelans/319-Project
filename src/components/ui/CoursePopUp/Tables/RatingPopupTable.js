import style from "./NominateACourse.module.css";
import { Button, Container, Divider, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { InputCourse } from "../../../InputCourse";
import { PropaneSharp } from "@mui/icons-material";

export default function App(props) {
  const [name, setName] = useState("");
  const [story, setStory] = useState({});
  const [inputFields, setInputFields] = useState([
    {
      courseCode: "CS 201",
      courseName: "Fundametal Aspects of Caveman Debugging",
      comments: "",
      courseRate: "",
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setStory({ trips: [...inputFields], name });
    console.log("jennie", story);
  };

  const handleChange = (event, index) => {
    const values = [...inputFields];
    console.log("momo", values);
    values[index][event.target.name] = event.target.value;

    setInputFields(values);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  function handleClose() {
    props.onCancel();
  }

  return (
    <>
      <Container maxWidth="xs">
        <h4>Share your experiences</h4>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Divider style={{ marginBottom: 10, marginTop: 20 }} />

            {inputFields.map((item, index) => (
              <div key={index}>
                <InputCourse
                  inputFields={inputFields}
                  index={index}
                  item={item}
                  handleChange={handleChange}
                />

                <Divider style={{ marginBottom: 10 }} />
              </div>
            ))}

            <Button type="submit" variant="contained" disableElevation>
              Send
            </Button>
            <Button disableElevation onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
}
