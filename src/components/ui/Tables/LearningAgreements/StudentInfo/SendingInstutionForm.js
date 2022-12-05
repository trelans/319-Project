import React from "react";
import "./styles.css";
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
export default class App extends React.Component {


    constructor(props) {
        super(props);
        this.options = countryList().getData();
        this.state = {
            startDate: new Date(),
            country: "",
            region: "",
            options: this.options,
            countryVal: 2,
            phone: "",
            complete: "",
            displayComplete: "none",
            name: "Kutay",
            lastName: "Senyigit",
            email: "",
            address: "",
            gender: "male",
            disabledLastName: true,
            disabledName: true
        };

        this.flagsRef = React.createRef();
        this.lastnameRef = React.createRef();
        this.nameRef = React.createRef();
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
        this.lastnameRef.current.text.select();
    }

    handleEditLastNameClick() {
        this.setState({disabledLastName: !this.state.disabledLastName})
        this.lastnameRef.current.text.select();
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

    handlerReset() {
        this.setState({
            startDate: new Date(),
            country: "",
            region: "",
            options: this.options,
            countryVal: null,
            phone: "",
            complete: "",
            displayComplete: "none",
            name: "",
            lastName: "",
            email: "",
            address: "",
            gender: null
        });

        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }


    render() {


        return (
            <div className={"App"}>

                <h1 id="title" className="blackLetter">
                    Student Info
                </h1>
                <p id="description" className="blackLetter">
                    Check your data
                </p>
                <div className="perfectCentered">

                    <div id="survey-form">
                        <Grid>
                            <div className={"row-cols-2"}>
                                <label className={"textHeader"} id="name-label" htmlFor="name">
                                    Name
                                </label>

                                <Grid item xs={6} direction={"column"}>

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

                                    <button className="editButton" onClick={this.handleEditNameClick.bind(this)}
                                            disabled={!this.state.disabledName}> Edit
                                    </button>

                                </Grid>


                                <label className={"textHeader"} id="lastName-label" htmlFor="Last name">
                                    Last Name
                                </label>


                                <div/>

                                <Grid>
                                    <input
                                        ref={"this.lastnameRef"}
                                        id="lastName"
                                        maxLength="30"
                                        pattern="[A-Za-z]"
                                        defaultValue={this.state.lastName}
                                        className="styleInput"
                                        disabled={(this.state.disabledLastName) ? "disabledLastName" : ""}
                                        required
                                    />
                                    <button className="editButton" onClick={this.handleEditLastNameClick.bind(this)}
                                            disabled={!this.state.disabledLastName}> Edit
                                    </button>

                                </Grid>


                                <label className={"textHeader"} id="Dateofbirth-label" htmlFor="Date of Birth">
                                    Date of Birth
                                </label>

                                <Grid item >

                                    <div className="row-cols-auto">
                                        <DatePicker
                                            selected={this.state.startDate}
                                            onChange={this.handleChangeDate}
                                        />
                                        <button className="editButton" onClick={this.handleEditLastNameClick.bind(this)}
                                                disabled={!this.state.disabledLastName}> Edit
                                        </button>
                                    </div>

                                </Grid>

                                <label className={"textHeader"} id="lastName-label" htmlFor="country">
                                    Nationality
                                </label>

                                <Grid item >
                                    <div
                                        id="countryFlag"
                                        className="marginBottom"
                                        style={{display: "flex", alignItems: "center", width: "70%"}}
                                    >

                                        <ReactCountryFlag
                                            countryCode={
                                                this.state.countryVal ? this.state.countryVal.value : ""
                                            }
                                            svg
                                            cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                                            cdnSuffix="svg"
                                            title={this.state.countryVal ? this.state.countryVal.value : ""}
                                        />
                                        <div
                                            style={{marginLeft: "10px", color: "black", width: "100%"}}
                                        >
                                            <Select
                                                isSearchable={true}
                                                options={this.state.options}
                                                defaultValue={this.state.value}
                                                onChange={this.changeHandler}
                                            />

                                        </div>
                                    </div>

                                    <button className="editButton " onClick={this.handleEditLastNameClick.bind(this)}
                                            disabled={!this.state.disabledLastName}> Edit
                                    </button>
                                </Grid>

                                <label className={"textHeader"} id="lastName-label" htmlFor="country">
                                    Gender
                                </label>

                                <Grid item >
                                    <div style={{marginLeft: "0px", color: "black", width: "50%"}}>
                                        <Select
                                            value={this.state.gender}
                                            onChange={this.handleChangeGender}
                                        >
                                            {options.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </div>

                                    <button className="editButton " onClick={this.handleEditLastNameClick.bind(this)}
                                            disabled={!this.state.disabledLastName}> Edit
                                    </button>

                                </Grid>

                                <label className={"textHeader"} htmlFor="email">
                                    Email
                                </label>
                                <Grid>
                                    <div/>

                                    <input
                                        id="email"
                                        type="email"
                                        maxLength="50"
                                        placeholder="write your email"
                                        defaultValue={this.state.email}
                                        className="styleInput"
                                        required
                                    />
                                    <button className="editButton " onClick={this.handleEditLastNameClick.bind(this)}
                                            disabled={!this.state.disabledLastName}> Edit
                                    </button>
                                </Grid>

                                <label className={"textHeader"} id="lastName-label" htmlFor="Address">
                                    Address
                                </label>

                                <div/>

                                <Grid>
                                    <input
                                        id="address"
                                        maxLength="50"
                                        defaultValue={this.state.address}
                                        className="styleInput"
                                        required
                                    />
                                    <button className="editButton " onClick={this.handleEditLastNameClick.bind(this)}
                                            disabled={!this.state.disabledLastName}> Edit
                                    </button>
                                </Grid>

                                <div className="marginBottom">
                                    <label className={"textHeader"} id="number-label" htmlFor="number">
                                        Phone Number
                                    </label>
                                    <PhoneInput
                                        country={"us"}
                                        className="marginBottom"
                                        value={this.state.phone}
                                        onChange={phone => this.setState({phone})}
                                    />
                                </div>


                                <div className={"textHeader"}>
                                    <p>Subject Area Code</p>
                                    <input
                                        id="textarea"
                                        rows="10"
                                        className="marginBottom"

                                    />
                                </div>
                            </div>
                        </Grid>
                        <div className="perfectCentered">
                            <button className="buttons" onClick={this.handlerComplete}>
                                Submit{" "}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
