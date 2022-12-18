import "../../../../index";
import style from "../coursePopUp.module.css";

import React, { useState } from "react";
function Modal(props) {
  function cancelHandler() {
    props.onCancel();
  }

  return (
    <div className={"perfectCentered"}>
      <div className={style.modal} style={{ overflowY: "scroll" }}>
        <h4></h4>
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
