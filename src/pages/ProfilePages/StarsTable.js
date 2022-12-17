import { useState } from "react";
import { React, useEffect } from "react";

const Star = ({ starId, marked }) => {
  return (
    <span
      star-id={starId}
      role="button"
      style={{ color: "#ff9933", cursor: "pointer" }}
      className="biggerstars"
    >
      {marked ? "\u2605" : "\u2606"}
    </span>
  );
};

// Create an array of 5: Array.from({length: 5}, (v,i) => i)
const StarsTable = (props) => {
  // Manages on Hover selection of a star
  const [selection, setSelection] = useState(0);

  // Manages rating selection
  const [rating, setRating] = useState(0);

  return (
    <div onClick={(event) => setRating(event.target.getAttribute("star-id"))}>
      {Array.from({ length: 5 }, (v, i) => (
        <Star starId={i + 1} marked={props.fetchedRating > i} />
      ))}
    </div>
  );
};

export default StarsTable;
