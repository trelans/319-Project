import React from "react";
import validate from "validator/validator";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactCountryFlag from "react-country-flag";
import Select from "react-select";
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import SignatureCanvas from 'react-signature-canvas'
import {handleRequests} from "../../../../../pages/requests";
const options = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "other", label: "Other" },
];
export default class Student extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.fields)
    let name = "";
    let personFunction = ""
    let phoneNumber = ""
    let email = ""
    let signature = ""
    let dateOfSign = new Date()
    if (props.fields){
      name = props.fields.name ? props.fields.name : "-"
      personFunction = props.fields.personFunction ? props.fields.personFunction : "-"
      phoneNumber = props.fields.phoneNumber ? props.fields.phoneNumber : "+90535521121"
      email = props.fields.email ? props.fields.email : "-"
      signature = props.fields.signature ? props.fields.signature : "-"
    }


    if (props.fields !== undefined && props.fields.date) {
      const time = props.fields.date.split("/");
      dateOfSign = new Date(time[0], time[1], time[2]);
    }
    this.state = {
      complete: "",
      displayComplete: "none",

      id: props.id,

      // name: props.fields ? props.fields.name : "",
      // personFunction: props.fields ? props.fields.personFunction : "",
      // phoneNumber: props.fields ? props.fields.phoneNumber : "",
      // email: props.fields ? props.fields.email : "",
      // signature: props.fields ? props.fields.signature : "",
      name,
      personFunction,
      phoneNumber,
      email,
      signature,
      dateOfSign,
      infoType: props.infoType,

      disabledName: true,
      disabledPersonFunction: true,
      disabledPhoneNumber: true,
      disabledEmail: true,
      disabledSignature: true,
      disabledDateOfSign: true
    };

    this.updateInputName = this.updateInputName.bind(this);
    this.updateInputPersonFunction = this.updateInputPersonFunction.bind(this);
    this.updateInputPhoneNumber = this.updateInputPhoneNumber.bind(this);
    this.updateInputEmail = this.updateInputEmail.bind(this);
    this.updateInputSignature = this.updateInputSignature.bind(this);

    this.flagsRef = React.createRef();
    this.lastnameRef = React.createRef();
    this.dateOfBirthRef = React.createRef();
    this.nationalityRef = React.createRef();
    this.genderRef = React.createRef();
    this.academicYearRef = React.createRef();
    this.studyCycleRef = React.createRef();
    this.subjectAreaCodeRef = React.createRef();
    this.handleChangeDateOfSign = this.handleChangeDateOfSign.bind(this);
  }

  updateInputName(event) {
    this.setState({ name: event.target.value });
  }
  updateInputPersonFunction(event) {
    this.setState({ personFunction: event.target.value });
  }
  updateInputPhoneNumber(event) {
    this.setState({ phoneNumber: event.target.value });
  }
  updateInputEmail(event) {
    this.setState({ email: event.target.value });
  }
  updateInputSignature(event) {
    this.setState({ signature: event.target.value });
  }

  handleChangeGender = (gender) => {
    this.setState({ gender });
  };
  changeHandler = (countryVal) => {
    this.setState({ countryVal });
  };

  handleChangeDateOfSign = (date) => {
    this.setState({
      dateOfSign: date,
    });
  };

  handleEditNameClick() {
    this.setState({ disabledName: !this.state.disabledName });
  }

  handleEditPersonFunctionClick() {
    this.setState({
      disabledPersonFunction: !this.state.disabledPersonFunction
    });
  }

  handleEditPhoneNumberClick() {
    this.setState({ disabledPhoneNumber: !this.state.disabledPhoneNumber });
  }

  handleEditEmailClick() {
    this.setState({ disabledEmail: !this.state.disabledEmail });
  }

  handleEditSignatureClick() {
    this.setState({ disabledSignature: !this.state.disabledSignature });
  }

  handleEditDateOfSignClick() {
    this.setState({ disabledDateOfSign: !this.state.disabledDateOfSign });
  }

  handlerComplete = (e) => {
    const date = new Date(this.state.dateOfSign);
    const formInfo = {
      id: this.state.id,
      infoType: this.state.infoType,
      personInfo: {
        name: this.state.name,
        personFunction: this.state.personFunction,
        email: this.state.email,
        signature: this.state.signature,
        phoneNumber: this.state.phoneNumber,
        date: date
            ? date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate()
            : ""
      },
    };

    handleRequests(
        e,
        formInfo,
        "learning-agreement-3-3",
        "2",
        (response, status) => {
          if (response.status === 200) {
            this.savedInfo = (
                <div>
                  <p>Fields are saved!</p>
                </div>
            );
          }
        }
    );
  };

  /*
  handlerComplete(e) {
    if (
        this.state.countryVal !== null &&
        this.state.complete === true &&
        this.state.phone !== ""
    ) {
      this.setState({
        displayComplete: "flex",
      });
      window.scroll({
        top: this.complete.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    } else {
      alert("You have not yet completed the form");
    }
  }
   */

  render() {

    console.log(this.state.name)
    console.log(this.state.personFunction)
    console.log(this.state.phoneNumber)
    console.log(this.state.email)
    console.log(this.state.signature)
    console.log(this.state.dateOfSign)


    return (
        <div className={"App"}>
          <div>
            <div id="survey-form">
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <label className={"textHeader"} id="name-label" htmlFor="name">
                    Name
                  </label>
                </Grid>

                <Grid item xs={6}>
                  <div id="nameCircle" ref={(div) => (this.nameCircle = div)} />
                  <input
                      ref={"this.nameRef"}
                      id="name"
                      maxLength="30"
                      placeholder="write your name"
                      pattern="[A-Za-z]"
                      className="styleInput"
                      defaultValue={this.state.name}
                      onChange={this.updateInputName}
                      disabled={this.state.disabledName ? "disabledName" : ""}
                      required
                  />
                </Grid>

                <Grid item xs={1}>
                  <button
                      className="editButton"
                      onClick={this.handleEditNameClick.bind(this)}
                      disabled={!this.state.disabledName}
                  >
                    {" "}
                    Edit
                  </button>
                </Grid>

                <Grid item xs={4}>
                  <label
                      className={"textHeader"}
                      id="lastName-label"
                      htmlFor="Last name"
                  >
                    Function
                  </label>
                </Grid>

                <div />

                <Grid item xs={6}>
                  <input
                      ref={"this.lastnameRef"}
                      id="function"
                      maxLength="30"
                      pattern="[A-Za-z]"
                      defaultValue={this.state.personFunction}
                      onChange={this.updateInputPersonFunction}
                      className="styleInput"
                      disabled={
                        this.state.disabledPersonFunction ? "disabledPersonFunction" : ""
                      }
                      required
                  />
                </Grid>

                <Grid item xs={1}>
                  <button
                      className="editButton"
                      onClick={this.handleEditPersonFunctionClick.bind(this)}
                      disabled={!this.state.disabledPersonFunction}
                  >
                    {" "}
                    Edit
                  </button>
                </Grid>

                <Grid item xs={4}>
                  <label
                      className={"textHeader"}
                      id="lastName-label"
                      htmlFor="Address"
                  >
                    Phone Number
                  </label>
                </Grid>

                <Grid item xs={6}>
                  <PhoneInput
                      country={"us"}
                      className="marginBottom"
                      value={this.state.phoneNumber}
                      onChange={(phoneNumber) => this.setState({ phoneNumber })}
                  />
                </Grid>

                <Grid item xs={1}>
                  <button
                      className="editButton "
                      onClick={this.handleEditPhoneNumberClick.bind(this)}
                      disabled={!this.state.disabledPhoneNumber}
                  >
                    {" "}
                    Edit
                  </button>
                </Grid>

                <Grid item xs={4}>
                  <label
                      className={"textHeader"}
                      id="Dateofbirth-label"
                      htmlFor="Date of Birth"
                  >
                    Mail
                  </label>
                </Grid>

                <Grid item xs={6}>
                  <input
                      ref={"this.mail"}
                      id="mail"
                      maxLength="30"
                      defaultValue={this.state.email}
                      onChange={this.updateInputEmail}
                      className="styleInput"
                      disabled={this.state.disabledEmail ? "disabledEmail" : ""}
                      required
                  />
                </Grid>

                <Grid item xs={1}>
                  <button
                      className="editButton "
                      onClick={this.handleEditEmailClick.bind(this)}
                      disabled={!this.state.disabledEmail}
                  >
                    {" "}
                    Edit
                  </button>
                </Grid>

                <Grid item xs={4}>
                  <label
                      className={"textHeader"}
                      id="Dateofbirth-label"
                      htmlFor="Date of Birth"
                  >
                    Sign Date
                  </label>
                </Grid>

                <Grid item xs={6}>
                  <DatePicker
                      ref={"this.dateOfBirthRef"}
                      selected={this.state.dateOfSign}
                      onChange={this.handleChangeDateOfSign}
                      className="styleInput"
                      disabled={
                        this.state.disabledDateOfSign ? "disabledDateOfSign" : ""
                      }
                  />
                </Grid>

                <Grid item xs={1}>
                  <button
                      className="editButton"
                      onClick={this.handleEditDateOfSignClick.bind(this)}
                      disabled={!this.state.disabledDateOfSign}
                  >
                    {" "}
                    Edit
                  </button>
                </Grid>

                <Grid item xs={4}>
                  <label
                      className={"textHeader"}
                      id="lastName-label"
                      htmlFor="country"
                  >
                    Signature
                  </label>
                </Grid>

                <Grid item xs={6}>
                  <button  className="editButton " style = {{width: 200 , height: 36}}>Sign</button>
                </Grid>

                <Grid item xs={1}>

                </Grid>

                <Grid item xs={12}></Grid>
              </Grid>
              <div className="perfectCentered">
                <button className="buttons" onClick={this.handlerComplete}>
                  Save{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
