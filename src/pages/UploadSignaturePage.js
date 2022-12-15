import SignatureCanvas from "react-signature-canvas";
import style from "./UploadSignaturePopup.module.css";

function UploadSignaturePage(props) {
  function cancelHandler() {
    props.onCancel();
  }

  return (
    <div className={"perfectCentered"}>
      <div className={style.modal}>
        <h4>Draw your signature:</h4>

        <div>
          <a className={style.close} onClick={cancelHandler}>
            ×
          </a>
        </div>

        <SignatureCanvas
          canvasProps={{ width: 500, height: 200 }}
          backgroundColor="#a5c9ca"
        />

        <div>
          <button>save</button>
        </div>
      </div>
    </div>
  );
}

export default UploadSignaturePage;
