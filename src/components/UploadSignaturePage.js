import SignatureCanvas from "react-signature-canvas";
import style from "./UploadSignaturePopup.module.css";
import {handleRequests} from "../pages/requests";
import * as React from "react";
import NavigationBar from "./ui/NavigationBar/NavigationBar";
import {useState} from "react";

let loaded = false

function UploadSignaturePage(props) {
    let sigCanvas;
    const [signature, setSignature] = useState("")
    function cancelHandler() {
        props.onCancel();
    }

    const [isLoading, setLoading] = React.useState(true)

    if(!loaded) {
        handleRequests(null, {}, "profile-own-popup", "1", (response, status) => {
            setSignature(response.signature)
            loaded = true
            setLoading(false)
        })

    }

    if (isLoading) {
        return
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
                        if(ref){
                            ref.fromDataURL(signature ? signature : "")
                        }
                    }}

                />

                <div>
                    <button onClick={(e) => {
                        handleRequests(
                            e,
                            {signature: sigCanvas.toDataURL()},
                            "profile-own-popup",
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
