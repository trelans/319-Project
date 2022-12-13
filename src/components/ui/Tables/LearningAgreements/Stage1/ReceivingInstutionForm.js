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
import Grid from "@material-ui/core/Grid";

const options = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "other", label: "Other" },
];
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.options = countryList().getData();
    this.state = {
      startDate: new Date(),
      country: "",
      options: this.options,
      countryVal: 2,
      complete: "",
      displayComplete: "none",
      name: "Kingston University",
      faculty: "Engineering",
      academicYear: "2022",
      studyCycle: "Onurcan",
      address: "290 Street LA 2032  ",
      subjectAreaCode: "onurcanatac@bilkent.edu.tr",
      erasmusCode: "109091",
      disabledName: true,
      disabledLastName: true,
      disabledDateOfBirth: true,
      disabledNationality: true,
      disabledGender: true,
      disabledAcademicYear: true,
      disabledStudyCycle: true,
      disabledSubjectArea: true,
    };

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

  handleEditLastNameClick() {
    this.setState({ disabledLastName: !this.state.disabledLastName });
  }
  handleEditDateOfBirthClick() {
    this.setState({ disabledDateOfBirth: !this.state.disabledDateOfBirth });
  }
  handleEditNationalityClick() {
    this.setState({ disabledNationality: !this.state.disabledNationality });
  }
  handleEditGenderClick() {
    this.setState({ disabledGender: !this.state.disabledGender });
  }
  handleEditAcademicYearClick() {
    this.setState({ disabledAcademicYear: !this.state.disabledAcademicYear });
  }
  handleEditStudyCycleClick() {
    this.setState({ disabledStudyCycle: !this.state.disabledStudyCycle });
  }
  handleSubjectAreaClick() {
    this.setState({ disabledSubjectArea: !this.state.disabledSubjectArea });
  }

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

  render() {
    return (
      <div className={"App"}>
        <div className="perfectCentered">
          <div id="survey-form">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <label className={"textHeader"} id="name-label" htmlFor="name">
                  Institution Name
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
                  Faculty
                </label>
              </Grid>

              <div />

              <Grid item xs={6}>
                <input
                  ref={"this.lastnameRef"}
                  id="faculty"
                  maxLength="30"
                  pattern="[A-Za-z]"
                  defaultValue={this.state.faculty}
                  className="styleInput"
                  disabled={
                    this.state.disabledLastName ? "disabledLastName" : ""
                  }
                  required
                />
              </Grid>

              <Grid item xs={1}>
                <button
                  className="editButton"
                  onClick={this.handleEditLastNameClick.bind(this)}
                  disabled={!this.state.disabledLastName}
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
                  Erasmus Code
                </label>
              </Grid>

              <Grid item xs={6}>
                <input
                  ref={"this.dateOfBirth"}
                  id="dateOfBirth"
                  maxLength="30"
                  pattern="[A-Za-z]"
                  defaultValue={this.state.erasmusCode}
                  className="styleInput"
                  disabled={
                    this.state.disabledDateOfBirth ? "disabledDateOfBirth" : ""
                  }
                  required
                />
              </Grid>

              <Grid item xs={1}>
                <button
                  className="editButton"
                  onClick={this.handleEditDateOfBirthClick.bind(this)}
                  disabled={!this.state.disabledDateOfBirth}
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
                  Department
                </label>
              </Grid>

              <Grid item xs={6}>
                <input
                  ref={"this.academicYear"}
                  id="name"
                  maxLength="30"
                  className="styleInput"
                  defaultValue={this.state.academicYear}
                  disabled={
                    this.state.disabledAcademicYear
                      ? "disabledAcademicYear"
                      : ""
                  }
                  required
                />
              </Grid>

              <Grid item xs={1}>
                <button
                  className="editButton "
                  onClick={this.handleEditAcademicYearClick.bind(this)}
                  disabled={!this.state.disabledAcademicYear}
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
                  Address
                </label>
              </Grid>

              <Grid item xs={6}>
                <input
                  id="email"
                  type="email"
                  maxLength="50"
                  defaultValue={this.state.address}
                  disabled={this.state.disabledGender ? "disabledGender" : ""}
                  className="styleInput"
                  required
                />
              </Grid>

              <Grid item xs={1}>
                <button
                  className="editButton "
                  onClick={this.handleEditGenderClick.bind(this)}
                  disabled={!this.state.disabledGender}
                >
                  {" "}
                  Edit
                </button>
              </Grid>

              <Grid item xs={4}>
                <label className={"textHeader"} id="name-label" htmlFor="name">
                  Country
                </label>
              </Grid>

              <Grid item xs={6}>
                <div
                  id="countryFlag"
                  className="marginBottom"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <ReactCountryFlag
                    countryCode={
                      this.state.countryVal ? this.state.countryVal.value : ""
                    }
                    svg
                    cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                    cdnSuffix="svg"
                    title={
                      this.state.countryVal ? this.state.countryVal.value : ""
                    }
                  />
                  <div
                    style={{
                      marginLeft: "10px",
                      color: "black",
                      width: "100%",
                    }}
                  >
                    <Select
                      ref={"this.nationalityRef"}
                      isSearchable={true}
                      options={this.state.options}
                      defaultValue={this.state.value}
                      disabled={
                        this.state.disabledNationality
                          ? "disabledNationality"
                          : ""
                      }
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
              </Grid>

              <Grid item xs={1}>
                <button
                  className="editButton "
                  onClick={this.handleEditNationalityClick.bind(this)}
                  disabled={!this.state.disabledNationality}
                >
                  {" "}
                  Edit
                </button>
              </Grid>

              <Grid item xs={12}>
                <label
                  className={"textHeader"}
                  id="lastName-label"
                  htmlFor="Address"
                >
                  Contact Person Information
                </label>
              </Grid>

              <Grid item xs={4}>
                <label
                  className={"textHeader"}
                  id="lastName-label"
                  htmlFor="Address"
                >
                  Name
                </label>
              </Grid>

              <Grid item xs={6}>
                <input
                  ref={"this.studyCycle"}
                  id="studyCycle"
                  maxLength="50"
                  defaultValue={this.state.studyCycle}
                  className="styleInput"
                  disabled={
                    this.state.disabledStudyCycle ? "disabledStudyCycle" : ""
                  }
                  required
                />
              </Grid>
              <Grid item xs={1}>
                <button
                  className="editButton "
                  onClick={this.handleEditStudyCycleClick.bind(this)}
                  disabled={!this.state.disabledStudyCycle}
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
                  E-Mail
                </label>
              </Grid>
              <Grid item xs={6}>
                <input
                  id="subjectAreaCode"
                  className="styleInput"
                  defaultValue={this.state.subjectAreaCode}
                  disabled={
                    this.state.disabledSubjectArea ? "disabledSubjectArea" : ""
                  }
                  required
                />
              </Grid>

              <Grid item xs={1}>
                <button
                  className="editButton "
                  onClick={this.handleEditStudyCycleClick.bind(this)}
                  disabled={!this.state.disabledStudyCycle}
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
                  value={this.state.phone}
                  onChange={(phone) => this.setState({ phone })}
                />
              </Grid>

              <Grid item xs={1}>
                <button
                  className="editButton "
                  onClick={this.handleSubjectAreaClick.bind(this)}
                  disabled={!this.state.disabledSubjectArea}
                >
                  {" "}
                  Edit
                </button>
              </Grid>
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
