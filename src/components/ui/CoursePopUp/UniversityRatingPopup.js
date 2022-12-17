import "../../../index";
import style from "./coursePopUp.module.css";
import CoursesTable from "./Tables/BilkentCourses";
import { useEffect } from "react";
import RatingPopupTable from "./Tables/RatingPopupTable";

import React, { useState } from "react";
function Modal(props) {
  function cancelHandler() {
    props.onCancel();
  }

  return (
    <div className={"perfectCentered"}>
      <div className={style.modal}>
        <h4>Rate Your Host University</h4>
        <a className={style.close} onClick={cancelHandler}>
          ×
        </a>
        <br /> <br />
        <div>
          <RatingPopupTable />
        </div>
      </div>
    </div>
  );
}
export default Modal;
