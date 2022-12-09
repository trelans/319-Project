import React from "react";
import "../Stage1/styles.css";
import validate from "validator/validator"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactCountryFlag from "react-country-flag";
import Select from "react-select";
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {MenuItem} from "@mui/material";
import Grid from '@material-ui/core/Grid'

const options = [
    {value: "female", label: "Female"},
    {value: "male", label: "Male"},
    {value: "other", label: "Other"}
];
export default class Student extends React.Component {


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
            function: "Engineering",
            academicYear: "2022",
            studyCycle: "Onurcan",
            address: "290 Street LA 2032  ",
            subjectAreaCode: "onurcanatac@bilkent.edu.tr",
            email: "omer.oktay.gultekin@erasmusapp.com",

            disabledName: true,
            disabledLastName: true,
            disabledDateOfBirth: true,
            disabledNationality: true,
            disabledGender: true,
            disabledAcademicYear: true,
            disabledStudyCycle: true,
            disabledSubjectArea: true
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


    handleChangeGender = gender => {
        this.setState({gender});
    };
    changeHandler = countryVal => {
        this.setState({countryVal});
    };

    handleChangeDate = date => {
        this.setState({
            startDate: date
        });
    };


    handleEditNameClick() {
        this.setState({disabledName: !this.state.disabledName})

    }

    handleEditLastNameClick() {
        this.setState({disabledLastName: !this.state.disabledLastName})

    }
    handleEditDateOfBirthClick() {
        this.setState({disabledDateOfBirth: !this.state.disabledDateOfBirth})

    }
    handleEditNationalityClick() {
        this.setState({disabledNationality: !this.state.disabledNationality})

    }
    handleEditGenderClick() {
        this.setState({disabledGender: !this.state.disabledGender})

    }
    handleEditAcademicYearClick() {
        this.setState({disabledAcademicYear: !this.state.disabledAcademicYear})

    }
    handleEditStudyCycleClick() {
        this.setState({disabledStudyCycle: !this.state.disabledStudyCycle})

    }
    handleSubjectAreaClick() {
        this.setState({disabledSubjectArea: !this.state.disabledSubjectArea})

    }


    handlerComplete(e) {
        if (
            this.state.countryVal !== null &&
            this.state.complete === true &&
            this.state.phone !== ""
        ) {
            this.setState({
                displayComplete: "flex"
            });
            window.scroll({
                top: this.complete.offsetTop,
                left: 0,
                behavior: "smooth"
            });
        } else {
            alert("You have not yet completed the form");
        }
    }




    render() {


        return (
            <div className={"App"}>


                <div >


                    <div id="survey-form">
                        <Grid container spacing={2}>

                            <Grid item xs={4}  >
                                <label className={"textHeader"} id="name-label" htmlFor="name">
                                     Name
                                </label>
                            </Grid>

                            <Grid item xs={6} >

                                <div id="nameCircle" ref={div => (this.nameCircle = div)}/>
                                <input
                                    ref={"this.nameRef"}
                                    id="name"
                                    maxLength="30"
                                    placeholder="write your name"
                                    pattern="[A-Za-z]"
                                    className="styleInput"
                                    defaultValue={this.state.name}
                                    disabled={(this.state.disabledName) ? "disabledName" : ""}
                                    required
                                />
                            </Grid>

                            <Grid item xs={1} >
                                <button className="editButton" onClick={this.handleEditNameClick.bind(this)}
                                        disabled={!this.state.disabledName}> Edit
                                </button>
                            </Grid>


                            <Grid item xs={4}  >
                                <label className={"textHeader"} id="lastName-label" htmlFor="Last name">
                                    Function
                                </label>
                            </Grid>

                            <div/>

                            <Grid item xs={6}>
                                <input
                                    ref={"this.lastnameRef"}
                                    id="function"
                                    maxLength="30"
                                    pattern="[A-Za-z]"
                                    defaultValue={this.state.function}
                                    className="styleInput"
                                    disabled={(this.state.disabledLastName) ? "disabledLastName" : ""}
                                    required
                                />
                            </Grid >

                            <Grid item xs={1} >
                                <button className="editButton" onClick={this.handleEditLastNameClick.bind(this)}
                                        disabled={!this.state.disabledLastName}> Edit
                                </button>
                            </Grid>

                            <Grid item xs={4} >
                                <label className={"textHeader"} id="lastName-label" htmlFor="Address">
                                    Phone Number
                                </label>
                            </Grid>

                            <Grid item xs={6} >

                                <PhoneInput
                                    country={"us"}
                                    className="marginBottom"
                                    value={this.state.phone}
                                    onChange={phone => this.setState({phone})}
                                />

                            </Grid>

                            <Grid item xs={1} >
                                <button className="editButton " onClick={this.handleSubjectAreaClick.bind(this)}
                                        disabled={!this.state.disabledSubjectArea}> Edit
                                </button>
                            </Grid>

                            <Grid item xs={4}  >
                                <label className={"textHeader"} id="Dateofbirth-label" htmlFor="Date of Birth">
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
                                    disabled={(this.state.disabledGender) ? "disabledGender" : ""}
                                    required
                                />
                            </Grid >

                            <Grid item xs={1}>
                                <button className="editButton " onClick={this.handleEditGenderClick.bind(this)}
                                        disabled={!this.state.disabledGender}> Edit
                                </button>
                            </Grid>

                            <Grid item xs={4}  >
                                <label className={"textHeader"} id="Dateofbirth-label" htmlFor="Date of Birth">
                                    Date
                                </label>
                            </Grid>

                            <Grid item xs={6}>


                                <DatePicker
                                    ref={"this.dateOfBirthRef"}
                                    selected={this.state.startDate}
                                    onChange={this.handleChangeDate}
                                    className="styleInput"
                                    disabled={(this.state.disabledDateOfBirth) ? "disabledDateOfBirth" : ""}
                                />
                            </Grid>

                            <Grid item xs={1} >
                                <button className="editButton" onClick={this.handleEditDateOfBirthClick.bind(this)}
                                        disabled={!this.state.disabledDateOfBirth}> Edit
                                </button>
                            </Grid>


                            <Grid item xs={4}  >
                                <label className={"textHeader"} id="lastName-label" htmlFor="country">
                                    Signature
                                </label>
                            </Grid>


                            <Grid item xs={6} >

                                <input
                                    ref={"this.academicYear"}
                                    id="name"
                                    maxLength="30"
                                    className="styleInput"
                                    defaultValue={this.state.academicYear}
                                    disabled={(this.state.disabledAcademicYear) ? "disabledAcademicYear" : ""}
                                    required
                                />
                            </Grid>

                            <Grid item xs={1} >
                                <button className="editButton " onClick={this.handleEditAcademicYearClick.bind(this)}
                                        disabled={!this.state.disabledAcademicYear}> Edit
                                </button>
                            </Grid>

                            <Grid item xs={12} >

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
