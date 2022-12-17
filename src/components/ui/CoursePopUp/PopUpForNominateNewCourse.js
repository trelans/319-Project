import "../../../index";
import style from "./coursePopUp.module.css";
import nomCourse from "./Tables/NominateACourse";
import { useEffect } from "react";

import React, { useState } from "react";
import NominateACourse from "./Tables/NominateACourse";
function Modal(props) {
  const [arr, setArr] = useState();
  const [closePop, setPop] = useState();
  const [bilkentCourse, setBilkentCourse] = useState();

  var willClose = false;

  useEffect(() => {
    setBilkentCourse(props.bilkentCourse);
  }, [bilkentCourse]);

  function cancelHandler() {
    props.onCancel();
  }
  function selectHandler() {
    props.setArrFunc(arr);

    props.onCancel();
  }

  if (closePop) {
    selectHandler();
    setPop(false);
  }

  return (
    <div className={"perfectCentered"}>
      <div className={style.modal} style={{ overflowY: "scroll" }}>
        <h4>Nominate New Course for {props.bilkentCourse["courseCode"]} </h4>
        <a className={style.close} onClick={cancelHandler}>
          ×
        </a>
        <br /> <br />
        <NominateACourse onCancel={cancelHandler} />
      </div>
    </div>
  );
}
export default Modal;
