import SignatureCanvas from "react-signature-canvas";
import style from "./UploadSignaturePopup.module.css";
import {handleRequests} from "../pages/requests";

function UploadSignaturePage(props) {
    let sigCanvas;
    function cancelHandler() {
        props.onCancel();
    }

    return (
        <div className="perfectCentered">
            <div className={style.modal}>
                <h4>Draw your signature:</h4>

                <div>
                    <a className={style.close} onClick={cancelHandler}>
                        ×
                    </a>
                </div>

                <SignatureCanvas
                    canvasProps={{width: 500, height: 200}}
                    backgroundColor="#a5c9ca"
                    ref={(ref) => {
                        sigCanvas = ref
                        console.log("signature:" + ref)
                        console.log("signature:" + ref.toDataURL())
                        console.log("signature:" + ref.isEmpty())
                    }}

                />

                <div>
                    <button onClick={(e) => {
                        handleRequests(
                            e,
                            {signature: sigCanvas.toDataURL()},
                            "profile-own",
                            "0",
                            (response, status) => {
                                alert("Signature is saved!")
                                cancelHandler()
                            }
                        );
                    }}>save</button>
                </div>
            </div>
        </div>
    );
}

export default UploadSignaturePage;
