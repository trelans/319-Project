import { IconButton, Stack, TextField } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import RatingStars from "./RatingStars.js";
import { useEffect, React } from "react";
import { useState } from "react";

export const InputCourse = ({
  index,
  item,
  handleChange,
  handleRemove,
  handleAdd,
}) => {
  const [rating, setRating] = useState(0);
  useEffect(() => {
    console.log("tutku senyigit" + rating);
  }, [rating]);

  return (
    <div>
      <Stack spacing={2} style={{ alignItems: "center" }}>
        <h3>{item.courseCode}</h3>
        <h3>{item.courseName}</h3>

        <RatingStars giveRating={setRating} />
        <TextField
          name="comments"
          fullWidth
          label="Comments"
          multiline
          rows={6}
          onChange={(event) => handleChange(event, index)}
          value={item.comments}
        />

        <div>
          <IconButton onClick={handleRemove}></IconButton>
          <IconButton onClick={handleAdd}></IconButton>
        </div>
      </Stack>
    </div>
  );
};
