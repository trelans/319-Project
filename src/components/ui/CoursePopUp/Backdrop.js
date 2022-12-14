import style from "./coursePopUp.module.css"
function Backdrop(props) {
    return <div className={style.backdrop} onClick={props.cancel}></div>

}
export default Backdrop