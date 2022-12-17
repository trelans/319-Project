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
import {MenuItem} from "@mui/material";
import Grid from "@material-ui/core/Grid";
import {handleRequests} from "../../../../../pages/requests";


export default class App extends React.Component {
    constructor(props) {
        console.log(props)
        console.log(props.fields.contactPerson.phoneNumber.replaceAll(" ", ""))
        super(props);
        this.options = countryList().getData();
        this.state = {
            options: this.options,
            complete: "",
            savedInfo: "",
            displayComplete: "none",
            country: {
                value: countryList().getValue(props.fields.country),
                label: props.fields.country
            },

            id: props.id,
            name: props.fields.name,
            faculty: props.fields.faculty,
            department: props.fields.departmentName,
            address: props.fields.address,
            erasmusCode: props.fields.erasmusCode,
            contactPersonName: props.fields.contactPerson.name,
            contactPersonEmail: props.fields.contactPerson.email,
            contactPersonPhoneNumber: props.fields.contactPerson.phoneNumber.replaceAll(" ", ""),

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



        this.updateInputName = this.updateInputName.bind(this);

        this.updateInputFaculty = this.updateInputFaculty.bind(this);
        this.updateInputDepartment = this.updateInputDepartment.bind(this);

        this.updateInputAddress = this.updateInputAddress.bind(this);
        this.updateInputCountry = this.updateInputCountry.bind(this);
        this.updateInputErasmusCode = this.updateInputErasmusCode.bind(this);

        this.updateInputContactPersonName = this.updateInputContactPersonName.bind(this);
        this.updateInputContactPersonEmail = this.updateInputContactPersonEmail.bind(this);
        this.updateInputContactPersonPhoneNumber = this.updateInputContactPersonPhoneNumber.bind(this);

    }

    updateInputAddress(event) {
        this.setState({address: event.target.value})
    }
    updateInputCountry(event) {
        this.setState({country: event.target.value})
    }
    updateInputErasmusCode(event) {
        this.setState({erasmusCode: event.target.value})
    }


    updateInputContactPersonName(event) {
        this.setState({contactPersonName: event.target.value})
    }
    updateInputContactPersonEmail(event) {
        this.setState({contactPersonEmail: event.target.value})
    }
    updateInputContactPersonPhoneNumber(event) {
        this.setState({contactPersonPhoneNumber: event.target.value})
    }



    updateInputName(event) {
        this.setState({name: event.target.value})
    }
    updateInputFaculty(event) {
        this.setState({faculty: event.target.value})
    }
    updateInputDepartment(event) {
        this.setState({department: event.target.value})
    }



    changeHandler = (country) => {
        this.setState({country});
    };


    handleEditNameClick() {
        this.setState({disabledName: !this.state.disabledName});
    }

    handleEditFacultyClick() {
        this.setState({disabledFaculty: !this.state.disabledFaculty});
    }

    handleEditDepartmentClick() {
        this.setState({disabledDepartment: !this.state.disabledDepartment});
    }

    handleEditAddressClick() {
        this.setState({disabledAddress: !this.state.disabledAddress});
    }

    handleEditCountryClick() {
        this.setState({disabledCountry: !this.state.disabledCountry});
    }

    handleEditErasmusCodeClick() {
        this.setState({disabledErasmusCode: !this.state.disabledErasmusCode});
    }

    handleEditContactPersonNameClick() {
        this.setState({disabledContactPersonName: !this.state.disabledContactPersonName});
    }

    handleEditContactPersonEmailClick() {
        this.setState({disabledContactPersonEmail: !this.state.disabledContactPersonEmail});
    }

    handleEditContactPersonPhoneNumberClick() {
        this.setState({disabledContactPersonPhoneNumber: !this.state.disabledContactPersonPhoneNumber});
    }

    handlerComplete = (e) => {
        const receivingInstitutionInfo = {
            id: this.state.id,
            infoType: 2,
            receivingInstitution: {
                name: this.state.name,
                faculty: this.state.faculty,
                departmentName: this.state.department,
                address: this.state.address,
                country: this.state.country.label,
                erasmusCode: this.state.erasmusCode,
                contactPerson: {
                    name: this.state.contactPersonName,
                    email: this.state.contactPersonEmail,
                    phoneNumber: this.state.contactPersonPhoneNumber
                }
            }
        }

        handleRequests(e, receivingInstitutionInfo, "learning-agreement-1-3", "2", (response, status) => {
            if (response.status === 200) {
                this.savedInfo = <div><p>Fields are saved!</p></div>
            }
        })
        /*
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
         */
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
                                <div id="nameCircle" ref={(div) => (this.nameCircle = div)}/>
                                <input
                                    ref={"this.nameRef"}
                                    id="name"
                                    maxLength="30"
                                    placeholder="write your name"
                                    pattern="[A-Za-z]"
                                    className="styleInput"
                                    onChange={this.updateInputName}
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

                            <div/>

                            <Grid item xs={6}>
                                <input
                                    ref={"this.lastnameRef"}
                                    id="faculty"
                                    maxLength="30"
                                    pattern="[A-Za-z]"
                                    defaultValue={this.state.faculty}
                                    className="styleInput"
                                    onChange={this.updateInputFaculty}
                                    disabled={
                                        this.state.disabledFaculty ? "disabledFaculty" : ""
                                    }
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
                                    onChange={this.updateInputErasmusCode}
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
                                    onChange={this.updateInputDepartment}
                                    defaultValue={this.state.department}
                                    disabled={
                                        this.state.disabledDepartment
                                            ? "disabledDepartment"
                                            : ""
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
                                    onChange={this.updateInputAddress}
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
                                            this.state.country ? this.state.country.value : ""
                                        }
                                        svg
                                        cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                                        cdnSuffix="svg"
                                        title={
                                            this.state.country ? this.state.country.value : ""
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
                                            defaultValue={this.state.country}
                                            disabled={
                                                this.state.disabledCountry
                                                    ? "disabledCountry"
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
                                    id="contactPersonName"
                                    maxLength="50"
                                    defaultValue={this.state.contactPersonName}
                                    className="styleInput"
                                    onChange={this.updateInputContactPersonName}
                                    disabled={
                                        this.state.disabledContactPersonName ? "disabledContactPersonName" : ""
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
                                    onChange={this.updateInputContactPersonEmail}
                                    disabled={
                                        this.state.disabledContactPersonEmail ? "disabledContactPersonEmail" : ""
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
                                    country={"tr"}
                                    className="marginBottom"
                                    value={this.state.contactPersonPhoneNumber}
                                    onChange={(contactPersonPhoneNumber) => this.setState({contactPersonPhoneNumber})}
                                />
                            </Grid>

                            <Grid item xs={1}>
                                <button
                                    className="editButton "
                                    onClick={this.handleEditContactPersonPhoneNumberClick.bind(this)}
                                    disabled={!this.state.disabledContactPersonPhoneNumber}
                                >
                                    {" "}
                                    Edit
                                </button>
                            </Grid>
                        </Grid>
                        <div className="perfectCentered">
                            {this.savedInfo}
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
