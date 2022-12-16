import * as React from "react";
import * as ReactDOM from "react-dom";
import { DropDownList } from "@progress/kendo-react-dropdowns";
function DropDown() {
  const searchOptions = ["User", "University"];
  return (
    <div>
      <div>T-shirt size:</div>
      <DropDownList
        style={{
          width: "300px",
        }}
        data={searchOptions}
      />
    </div>
  );
}

export default DropDown;
