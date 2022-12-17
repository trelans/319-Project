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
const StarRating = (props) => {
  // Manages on Hover selection of a star
  const [selection, setSelection] = useState(0);

  // Manages rating selection
  const [rating, setRating] = useState(0);
  useEffect(() => {
    giveStarHandler();
  }, [rating]);

  const hoverOver = (event) => {
    let starId = 0;
    if (event && event.target && event.target.getAttribute("star-id")) {
      starId = event.target.getAttribute("star-id");
    }
    setSelection(starId);
  };

  function giveStarHandler() {
    props.giveRating(rating);
  }

  return (
    <div
      onMouseOver={hoverOver}
      onMouseOut={() => hoverOver(null)}
      onClick={(event) => setRating(event.target.getAttribute("star-id"))}
    >
      {Array.from({ length: 5 }, (v, i) => (
        <Star starId={i + 1} marked={selection ? selection > i : rating > i} />
      ))}
    </div>
  );
};

export default StarRating;
