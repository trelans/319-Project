import React from "react";
import { Routes, Route, Redirect } from "react-router";

//icons

//pages
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordConfirmPage from "./pages/ResetPasswordConfirmPage/ResetPasswordConfirmPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import ApplicantsList from "./pages/ApplicantsList/ApplicantsList"

//ui-elements

//
import jwt_decode from "jwt-decode"
import learningAgreementBeforeMobility1 from "./pages/LearningAgreement/LearningAgreementBeforeMobility1";
var token1 = localStorage.getItem("token")

if(token1){
  var decode = jwt_decode(token1)
  console.log("decoded is :")
  console.log(decode.userType);
}

const pageRoutes = () => (
  <Routes>
    <Route exact path="/" component={<LoginPage/>}/>
    {localStorage.getItem("token") && (
      <Route exact path="/main-page" component={MainPage}/>
    )}
    {localStorage.getItem("token") && (
      <Route path="/forgot-password-page" component={ForgotPasswordPage}/>
    )}
    {localStorage.getItem("token") && (
                  <Route
                  exact
                  path="/reset-password-confirm-page"
                  component={ResetPasswordConfirmPage}
              />
    )}
    {localStorage.getItem("token") && (
                  <Route
                  exact
                  path="/reset-password-page"
                  component={ResetPasswordPage}
              />
    )}
    {localStorage.getItem("token") && (
                  <Route
                  exact
                  path="/settings-page"
                  component={SettingsPage}
              />
    )}
    {localStorage.getItem("token") && (
                  <Route
                  exact
                  path="/applicants-list"
                  component={ApplicantsList}
              />
    )}
  </Routes>
);

export default pageRoutes;
