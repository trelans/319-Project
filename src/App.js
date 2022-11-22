//import pageRoutes from './pageRoutes'
import React, { Component } from "react";
import { Routes, Route } from "react-router";
import { Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordConfirmPage from "./pages/ResetPasswordConfirmPage/ResetPasswordConfirmPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import ApplicantsList from "./pages/ApplicantsList/ApplicantsList";
import CreateDepartment from "./pages/CreateDepartment/CreateDepartment";
import ResetMailPage from "./pages/ResetMailPage/ResetMailPage";
import ApplicationPage from "./pages/ApplicationPages/ApplicationPage";

/*
class App extends Component {

	constructor() {
		super()
		this.setLayout = this.setLayout.bind(this)
	}

	componentWillMount() {
		this.setLayout(this.props.pathname)
	}

    /*
	setLayout(url) {
		const emptyView1 = [
			'/pages/error-page',
			'/pages/contact-us',
			'/sayfalar/kayit-ol',
			'/sayfalar/giris-yap',
			'/pages/reset-password',
			'/pages/subscribe',
			'/pages/under-maintenance',
			'/pages/unlock-account',
		];

		let isEmptyView = indexOf(emptyView1, url) !== -1 ? true : false
		let currentLayout = this.props.config.layout
		if(isEmptyView && currentLayout !== 'empty-view-1') {
			this.props.setConfig('layout', 'empty-view-1')
		} else if(!isEmptyView) {
			if(currentLayout === 'empty-view-1') {
				this.props.setConfig('layout', 'default-sidebar-1')
			} else {
				this.props.setConfig('layout', currentLayout)
			}
		}
	}
    

	render() {
		return (
            pageRoutes
		)
	}
}
*/

function App() {
  return (
    <Routes>
      // TODO true will be changed to checking login
      <Route
        exact
        path="/"
        element={true ? <Navigate to="/login" /> : <Navigate to="/main-page" />}
      />
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/main-page" element={<MainPage />} />
      <Route
        exact
        path="/forgot-password-page"
        element={<ForgotPasswordPage />}
      />
      <Route
        exact
        path="/reset-password-confirm-page"
        element={<ResetPasswordConfirmPage />}
      />
      <Route
        exact
        path="/reset-password-page"
        element={<ResetPasswordPage />}
      />
      <Route exact path="/reset-mail-page" element={<ResetMailPage />} />
      <Route exact path="/settings-page" element={<SettingsPage />} />
      <Route exact path="/applicants-list" element={<ApplicantsList />} />
      <Route exact path="/create-department" element={<CreateDepartment />} />
	  <Route exact path="/application-page" element={<ApplicationPage />} />
    </Routes>
  );
}

export default App;
