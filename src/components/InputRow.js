import { IconButton, Stack, TextField } from "@mui/material"
import RemoveIcon from "@mui/icons-material/Remove"
import AddIcon from "@mui/icons-material/Add"

export const InputRow = ({
                             index,
                             item,
                             handleChange,
                             handleRemove,
                             handleAdd,
                             values,
                             inputFields
                         }) => {
    return (
        <Stack spacing={2} style={{ alignItems: "center" }}>
            <TextField
                name="title"
                required
                fullWidth
                label="Course Code"
                onChange={(event) => handleChange(event, index)}
                value={item.courseCode}
            />
            <TextField
                name="title"
                required
                fullWidth
                label="Course Name"
                onChange={(event) => handleChange(event, index)}
                value={item.courseName}
            />

            <TextField
                name="number"

                fullWidth
                label="ECTS Credits"
                onChange={(event) => handleChange(event, index)}
                value={item.credits}
            />
            <TextField
                name="link"
                multiline

                fullWidth
                label="Website Link"
                onChange={(event) => handleChange(event, index)}
                value={item.website}
            />
            <TextField
                name="link"
                fullWidth
                label="Syllabus Link"
                onChange={(event) => handleChange(event, index)}
                value={item.syllabusLink}
            />


            <div>
                <IconButton onClick={handleRemove}>
                    <RemoveIcon />
                </IconButton>
                <IconButton onClick={handleAdd}>
                    <AddIcon />
                </IconButton>
            </div>
        </Stack>
    )
}
