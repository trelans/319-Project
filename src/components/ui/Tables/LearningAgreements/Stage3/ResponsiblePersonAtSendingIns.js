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
import {handleRequests} from "../../../../../pages/requests";

const options = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "other", label: "Other" },
];
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.options = countryList().getData();
    console.log(props)
    this.state = {

      startDate: new Date(),
      options: this.options,

      displayComplete: "none",

      id: props.id,

      name: props.fields ? props.fields.name : "",
      personFunction: props.fields ? props.fields.personFunction : "",
      phoneNumber: props.fields ? props.fields.phoneNumber: "",
      email: props.fields ? props.fields.email: "",
      signature: props.fields ? props.fields.signature: "",


      disabledName: true,
      disabledPersonFunction: true,
      disabledPhoneNumber: true,
      disabledEmail: true,
      disabledSignature: true

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
    this.handleChangeDate = this.handleChangeDate.bind(this);
  }


  updateInputName(event) {
    this.setState({name: event.target.value})
  }
  updateInputPersonFunction(event) {
    this.setState({personFunction: event.target.value})
  }
  updateInputPhoneNumber(event) {
    this.setState({phoneNumber: event.target.value})
  }
  updateInputEmail(event) {
    this.setState({email: event.target.value})
  }
  updateInputSignature(event) {
    this.setState({signature: event.target.value})
  }

  handleChangeGender = (gender) => {
    this.setState({ gender });
  };
  changeHandler = (countryVal) => {
    this.setState({ countryVal });
  };

  handleChangeDate = (date) => {
    this.setState({
      startDate: date,
    });
  };

  handleEditNameClick() {
    this.setState({ disabledName: !this.state.disabledName });
  }

  handleEditPersonFunctionClick() {
    this.setState({ disabledPersonFunction: !this.state.disabledPersonFunction });
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

  handlerComplete = (e) => {
    const responsiblePersonFromSendingInsInfo = {
      id: this.state.id,
      infoType: 1,
      responsiblePersonFromSendingIns: {

        name: this.state.name,
        personFunction: this.state.personFunction,
        email: this.state.email,
        signature: this.state.signature,
        phoneNumber: this.state.phoneNumber

      }
    };

    handleRequests(e, responsiblePersonFromSendingInsInfo, "learning-agreement-3-3", "2", (response, status) => {
      if (response.status === 200) {
        this.savedInfo = <div><p>Fields are saved!</p></div>
      }
    });
  };

  render() {
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
                      disabled={this.state.disabledName ? "disabledName" : ""}
                      required
                  />
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
                      className="styleInput"
                      disabled={
                        this.state.disabledPersonFunction ? "disabledPersonFunction" : ""
                      }
                      required
                  />
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
                      className="styleInput"
                      disabled={this.state.disabledEmail ? "disabledEmail" : ""}
                      required
                  />
                </Grid>



                <Grid item xs={4}>
                  <label
                      className={"textHeader"}
                      id="Dateofbirth-label"
                      htmlFor="Date of Birth"
                  >
                    Date
                  </label>
                </Grid>

                <Grid item xs={6}>
                  <DatePicker
                      ref={"this.dateOfBirthRef"}
                      selected={this.state.startDate}
                      onChange={this.handleChangeDate}
                      className="styleInput"
                      disabled={
                        this.state.disabledName ? "disabledName" : ""
                      }
                  />
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
                  <input
                      ref={"this.academicYear"}
                      id="name"
                      maxLength="30"
                      className="styleInput"
                      defaultValue={this.state.name}
                      disabled={
                        this.state.disabledName
                            ? "disabledAcademicYear"
                            : ""
                      }
                      required
                  />
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
