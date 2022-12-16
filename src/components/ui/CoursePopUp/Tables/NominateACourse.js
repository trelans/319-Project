import style from "./NominateACourse.module.css"
import { Button, Container, Divider, Stack, TextField } from "@mui/material"
import { useState } from "react"
import { InputRow } from "../../../InputRow"

export default function App() {
    const [name, setName] = useState("")
    const [story, setStory] = useState({})
    const [inputFields, setInputFields] = useState([
        {
            title: "",
            image: "",
            description: "",
            location: ""
        }
    ])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await setStory({ trips: [...inputFields], name })
        console.log("jennie", story)
    }

    const handleChange = (event, index) => {
        const values = [...inputFields]
        console.log("momo", values)
        values[index][event.target.name] = event.target.value

        setInputFields(values)
    }

    const handleName = (event) => {
        setName(event.target.value)
    }

    // adds new input
    const handleAdd = () => {
        setInputFields([
            ...inputFields,
            {
                title: "",
                description: "",
                location: ""
            }
        ])
    }

    // removes input
    const handleRemove = (index) => {
        if (inputFields.length !== 1) {
            const values = [...inputFields]
            values.splice(index, 1)
            setInputFields(values)
        }
    }

    return (
        <>
            <Container maxWidth="xs">
                <h4>Add Story</h4>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            name="name"
                            required
                            fullWidth
                            label="Story Name"
                            onChange={(event) => handleName(event)}
                            value={name}
                        />
                        <Divider style={{ marginBottom: 10, marginTop: 20 }} />
                        <h4>Add Locations</h4>
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
                                <Divider style={{ marginBottom: 10 }} />
                            </div>
                        ))}
                        <Button type="submit" variant="contained" disableElevation>
                            Send
                        </Button>
                        <Button disableElevation>Cancel</Button>
                    </Stack>
                </form>
            </Container>
        </>
    )
}
