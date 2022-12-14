import "../../../index"
import style from "./coursePopUp.module.css"
import CoursesTable from "./Tables/BilkentCourses"


function Modal(props) {

    function cancelHandler() {
        props.onCancel();
    }


    return(
      <div className={"perfectCentered"} >
        <div className={style.modal}>
            <h4>Select a Bilkent Course From The List</h4>
            <a className={style.close} onClick={cancelHandler}>×</a>
            <br/> <br/>
            <CoursesTable></CoursesTable>
        </div>
      </div>
    )

}
export default Modal;