import "../../../index";
import style from "./coursePopUp.module.css";
import CoursesTable from "./Tables/BilkentCourses";
import { useEffect } from "react";

import React, { useState } from "react";
function Modal(props) {
  function cancelHandler() {
    props.onCancel();
  }

  return (
    <div className={"perfectCentered"}>
      <div className={style.modal}>
        <h4>Onurcan's popup</h4>
        <a className={style.close} onClick={cancelHandler}>
          ×
        </a>
        <br /> <br />
        <div></div>
      </div>
    </div>
  );
}
export default Modal;
