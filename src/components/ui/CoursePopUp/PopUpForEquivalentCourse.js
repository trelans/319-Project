import "../../../index"
import style from "./coursePopUp.module.css"
import CoursesTable from "./Tables/HostCourses"
import {useEffect} from "react";



import React, {useState} from 'react';
function Modal(props) {


    const [arr, setArr] = useState();
    const [closePop, setPop] = useState();



    var willClose = false;




    function cancelHandler() {
        props.onCancel();
    }
    function selectHandler() {

        props.setArrFunc(arr)

        props.onCancel()
    }


    if (closePop) {
        selectHandler()
        setPop(false)

    }

    return(
        <div className={"perfectCentered"} >
            <div className={style.modal}>
                <h4>Select a Equivalent Course For  From The List</h4>
                <h6>or</h6>
                <button>Nominate A New Course</button>
                <a className={style.close} onClick={cancelHandler}>×</a>
                <br/> <br/>

                <CoursesTable setArrFunc={setArr} closePopUp={setPop} selectedBilkentCourse={props.bilkentCourse} ></CoursesTable>

            </div>
        </div>
    )

}
export default Modal;