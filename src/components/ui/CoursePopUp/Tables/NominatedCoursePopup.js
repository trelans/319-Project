import "../../../../index";
import style from "../coursePopUp.module.css";
import ReviewNominatedCourse from './ReviewNominatedCourse'

import React, { useState } from "react";
function Modal(props) {
  function cancelHandler() {
    props.onCancel();
  }

  return (
    <div className={"perfectCentered"}>
      <div className={style.modal} style={{ overflowY: "scroll" }}>
        <h4>Nominated Course Popup</h4>
        <a className={style.close} onClick={cancelHandler}>
          ×
        </a>
        <ReviewNominatedCourse bilkentCourse={"example"} hostUniName={"example"} onCancel={cancelHandler} />
        <div></div>
      </div>
    </div>
  );
}
export default Modal;
