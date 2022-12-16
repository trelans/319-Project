import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReactCountryFlag from "react-country-flag";
import Select from "react-select";
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Grid from "@material-ui/core/Grid";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.fields);
    this.options = countryList().getData();
    this.state = {
      startDate: new Date(),
      options: this.options,
      countryVal: { value: "AL", label: "Albania" },
      complete: "",
      displayComplete: "none",
      name: props.fields.name,
      faculty: props.fields.faculty,
      department: props.fields.departmentName,
      address: props.fields.address,
      country: props.fields.country,
      erasmusCode: props.fields.erasmusCode,
      contactPersonName: props.fields.contactPerson.name,
      contactPersonEmail: props.fields.contactPerson.email,
      contactPersonPhoneNumber: props.fields.contactPerson.phoneNumber,

      disabledName: true,
      disabledFaculty: true,
      disabledDepartment: true,
      disabledAddress: true,
      disabledCountry: true,
      disabledErasmusCode: true,
      disabledContactPersonName: true,
      disabledContactPersonEmail: true,
      disabledContactPersonPhoneNumber: true,
    };
  }

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

  handleEditFacultyClick() {
    this.setState({ disabledFaculty: !this.state.disabledFaculty });
  }

  handleEditDepartmentClick() {
    this.setState({ disabledDepartment: !this.state.disabledDepartment });
  }

  handleEditAddressClick() {
    this.setState({ disabledAddress: !this.state.disabledAddress });
  }

  handleEditCountryClick() {
    this.setState({ disabledCountry: !this.state.disabledCountry });
  }

  handleEditErasmusCodeClick() {
    this.setState({ disabledErasmusCode: !this.state.disabledErasmusCode });
  }

  handleEditContactPersonNameClick() {
    this.setState({
      disabledContactPersonName: !this.state.disabledContactPersonName,
    });
  }

  handleEditContactPersonEmailClick() {
    this.setState({
      disabledContactPersonEmail: !this.state.disabledContactPersonEmail,
    });
  }

  handleEditContactPersonPhoneNumberClick() {
    this.setState({
      disabledContactPersonPhoneNumber:
        !this.state.disabledContactPersonPhoneNumber,
    });
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
                  disabled={this.state.disabledFaculty ? "disabledFaculty" : ""}
                  required
                />
              </Grid>

              <Grid item xs={1}>
                <button
                  className="editButton"
                  onClick={this.handleEditFacultyClick.bind(this)}
                  disabled={!this.state.disabledFaculty}
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
                    this.state.disabledErasmusCode ? "disabledErasmusCode" : ""
                  }
                  required
                />
              </Grid>

              <Grid item xs={1}>
                <button
                  className="editButton"
                  onClick={this.handleEditErasmusCodeClick.bind(this)}
                  disabled={!this.state.disabledErasmusCode}
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
                  defaultValue={this.state.department}
                  disabled={
                    this.state.disabledDepartment ? "disabledDepartment" : ""
                  }
                  required
                />
              </Grid>

              <Grid item xs={1}>
                <button
                  className="editButton "
                  onClick={this.handleEditDepartmentClick.bind(this)}
                  disabled={!this.state.disabledDepartment}
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
                  id="address"
                  type="text"
                  maxLength="50"
                  defaultValue={this.state.address}
                  disabled={this.state.disabledAddress ? "disabledAddress" : ""}
                  className="styleInput"
                  required
                />
              </Grid>

              <Grid item xs={1}>
                <button
                  className="editButton "
                  onClick={this.handleEditAddressClick.bind(this)}
                  disabled={!this.state.disabledAddress}
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
                      defaultValue={this.state.countryVal}
                      disabled={
                        this.state.disabledCountry ? "disabledCountry" : ""
                      }
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
              </Grid>

              <Grid item xs={1}>
                <button
                  className="editButton "
                  onClick={this.handleEditCountryClick.bind(this)}
                  disabled={!this.state.disabledCountry}
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
                  defaultValue={this.state.contactPersonName}
                  className="styleInput"
                  disabled={
                    this.state.disabledContactPersonName
                      ? "disabledContactPersonName"
                      : ""
                  }
                  required
                />
              </Grid>
              <Grid item xs={1}>
                <button
                  className="editButton "
                  onClick={this.handleEditContactPersonNameClick.bind(this)}
                  disabled={!this.state.disabledContactPersonName}
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
                  defaultValue={this.state.contactPersonEmail}
                  disabled={
                    this.state.disabledContactPersonEmail
                      ? "disabledContactPersonEmail"
                      : ""
                  }
                  required
                />
              </Grid>

              <Grid item xs={1}>
                <button
                  className="editButton "
                  onClick={this.handleEditContactPersonEmailClick.bind(this)}
                  disabled={!this.state.disabledContactPersonEmail}
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
                  onClick={this.handleEditContactPersonPhoneNumberClick.bind(
                    this
                  )}
                  disabled={!this.state.disabledContactPersonPhoneNumber}
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
