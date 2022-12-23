import axios from 'axios';

//import React,{Component} from 'react';
import React, {useState} from 'react';
import {Link} from "react-router-dom";
import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import {useNavigate} from "react-router-dom";
/*
class UploadExcel extends Component {

    state = {

        // Initially, no file is selected
        selectedFile: null
    };

    // On file select (from the pop up)
    onFileChange = event => {

        // Update the state
        this.setState({ selectedFile: event.target.files[0] });

    };

    // On file upload (click the upload button)
    onFileUpload = () => {

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        // Details of the uploaded file
        console.log(this.state.selectedFile);

        // Request made to the backend api
        // Send formData object
        axios.post("api/uploadfile", formData);
    };

    // File content to be displayed after
    // file upload is complete
    fileData = () => {

        if (this.state.selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>

                    <p>File Type: {this.state.selectedFile.type}</p>

                    <p>
                        Last Modified:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>

                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    render() {

        return (
            <div>
                <h1>

                </h1>
                <h3>
                    File Upload using React!
                </h3>
                <div>
                    <input type="file" onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}>
                        Upload!
                    </button>
                </div>
                {this.fileData()}
            </div>
        );
    }

}
 */

function UploadExcel () {
    const navigate = useNavigate()
    const [uploadedFile, setUploadedFile] = useState ('');
    const [fileTitle, setFileTitle] = useState ('');

    function handleFormSubmittion (e) {
        e.preventDefault ();

        let form = document.getElementById ('form');
        let formData = new FormData (form);

        // do something
        axios.post ('http://localhost:8080/upload-excel', formData);
        console.log("Form submitted")
    }

    function handleFileTitle (e) {
        setFileTitle (e.target.value);
    }

    function handleUploadedFile (e) {
        setUploadedFile (e.target.value);
    }


    function buttonClicked() {
        alert("Excel file is uploaded!");

    }

    return (
        <div>
            <NavigationBar/>
        <div className={"perfectCentered"} style={{marginTop : 300}}>
        <React.Fragment >
        <div className={"dashboard-cards-upload-excel"}>
            <h2  style={{ color: "#afaaa0", textAlign: "center"}}>Upload Applicants List Excel File</h2>
            <form style={{  display: "flex",
                justifyContent: "center",
                alignItems: "center"}}

                encType="multipart/form-data"
                onSubmit={handleFormSubmittion}
                id="form"
            >
                <input
                    style={{color: "#afaaa0" }}
                    required
                    type="file"
                    name="applicantListsExcel"
                    value={uploadedFile}
                    onChange={handleUploadedFile}

                />
                <br />
                <br />

                <br />
                <br />
              <div>
                <button onClick={buttonClicked} className={"fpp-button-main"} type="submit">Submit Form</button>
              </div>
            </form>
        </div>
        </React.Fragment>
        </div>
        </div>
    );
}
export default UploadExcel;
