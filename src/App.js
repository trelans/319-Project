//import pageRoutes from './pageRoutes'
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
import ApplicationPage1 from "./pages/ApplicationPages/ApplicationPage1";
import ApplicationPage2 from "./pages/ApplicationPages/ApplicationPage2";
import ProfilePageOwnStudent from "./pages/ProfilePages/ProfilePageOwnStudent";
import ProfilePageOthersStudent from "./pages/ProfilePages/ProfilePageOthersStudent";
import ProfilePageOwnIncoming from "./pages/ProfilePages/ProfilePageOwnIncoming";
import ProfilePageOthersIncoming from "./pages/ProfilePages/ProfilePageOthersIncoming";
import ProfilePageOwnOthers from "./pages/ProfilePages/ProfilePageOwnOthers";
import ProfilePageOthersOthers from "./pages/ProfilePages/ProfilePageOthersOthers";
import ProfilePageUniversity from "./pages/ProfilePages/ProfilePageUniversity";
import ProfilePageCourse from "./pages/ProfilePages/ProfilePageCourse";
import InfoPage from "./pages/InfoPage/InfoPage";
import PreApprovalFormPage from "./pages/PreApprovalFormPage/PreApprovalFormPage";
import LearningAgreementBeforeMobility1 from "./pages/LearningAgreement/LearningAgreementBeforeMobility1";
import LearningAgreementBeforeMobility2 from "./pages/LearningAgreement/LearningAgreementBeforeMobility2";
import LearningAgreementBeforeMobility3 from "./pages/LearningAgreement/LearningAgreementBeforeMobility3";
import PreApprovalFormErasmusCoordinator from "./pages/PreApprovalFormPage/PreApprovalFormErasmusCoordinator";
import PreApprovalFormFacAdmin from "./pages/PreApprovalFormPage/PreApprovalFormFacAdmin";
import PreApprovalTryout from "./pages/PreApprovalFormPage/PreApprovalTryout";
import TestPage from "./pages/testPage";

import jwt_decode from "jwt-decode";
import ConfirmedCoursesPage from "./pages/ConfirmedCoursesPage/ConfirmedCoursesPage";
import UniversityListPage from "./pages/UniversityListPage/UniversityListPage";
import LogsPage from "./pages/LogsPage/LogsPage";
import CourseTransferFormPage1 from "./pages/CourseTransferFormPage/CourseTransferFormPage1";
import CourseTransferFormPage2 from "./pages/CourseTransferFormPage/CourseTransferFormPage2";
import AddCoursePage from "./pages/AddCoursePage/AddCoursePage";
import ChatPage from "./pages/ChatPage/ChatPage";
import ProfilePageOwn from "./pages/ProfilePages/ProfilePageOwn/ProfilePageOwn";
import ProfilePageOthers from "./pages/ProfilePages/ProfilePageOthers/ProfilePageOthers";
import UploadExcel from "./pages/UploadExcelFilePage/UploadExcel";
import LearningAgreementDuringMobility1 from "./pages/LearningAgreement/LearningAgreementDuringMobility1"
import LearningAgreementDuringMobility2 from "./pages/LearningAgreement/LearningAgreementDuringMobility2"
import LearningAgreementAfterMobility from "./pages/LearningAgreement/LearningAgreementAfterMobility"
import io from 'socket.io-client';
//export const socket = io.connect("http://localhost:8080");

//console.log("test: " + socket)

var token1 = localStorage.getItem("token");

if (token1) {
  var decode = jwt_decode(token1);
  console.log("decoded is :");
  console.log(decode);
}

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

    {(localStorage.getItem("token") ? (
      <Route exact path="/main-page" element={<MainPage />} />
    ) : <Navigate to="/login" />)}

      <Route
        exact
        path="/"
        element={true ? <Navigate to="/login" /> : <Navigate to="/main-page" />}
      />

      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/main-page" element={<MainPage />} />
      <Route exact path="/main-page" element={<MainPage />} />
      <Route
        exact
        path="/"
        element={ localStorage.getItem("token") ? <Navigate to="/login" /> : <Navigate to="/main-page" />}
      />

*/

function App() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          localStorage.getItem("token") ? (
            <Navigate to="/main-page" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route exact path="/test" element={<TestPage/>} />
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
      <Route
        exact
        path="/confirmed-courses"
        element={<ConfirmedCoursesPage />}
      />
      <Route exact path="/logs-page" element={<LogsPage />} />
      <Route exact path="/university-list" element={<UniversityListPage />} />
      <Route exact path="/reset-mail-page" element={<ResetMailPage />} />
      <Route exact path="/settings-page" element={<SettingsPage />} />
      <Route exact path="/upload-excel" element={<UploadExcel />} />
      <Route
        exact
        path="/course-transfer-page1"
        element={<CourseTransferFormPage1 />}
      />
        <Route
            exact
            path="/course-transfer-page2"
            element={<CourseTransferFormPage2 />}
        />
      <Route
        exact
        path="/preapproval-student"
        element={<PreApprovalFormPage />}
      />
      <Route
        exact
        path="/preapproval-coordinator"
        element={<PreApprovalFormErasmusCoordinator />}
      />
      <Route
        exact
        path="/preapproval-fac-admin"
        element={<PreApprovalFormFacAdmin />}
      />
      <Route exact path="/add-course" element={<AddCoursePage />} />
      <Route exact path="/preapproval-tryout" element={<PreApprovalTryout />} />
      <Route exact path="/applicants-list" element={<ApplicantsList />} />
      <Route exact path="/create-department" element={<CreateDepartment />} />
      <Route exact path="/application-page1" element={<ApplicationPage1 />} />
      <Route exact path="/application-page2" element={<ApplicationPage2 />} />
      <Route exact path="/chat" element={<ChatPage />} />
      <Route
        exact
        path="/profile-own-student"
        element={<ProfilePageOwnStudent />}
      />
      <Route
        exact
        path="/profile-others-student"
        element={<ProfilePageOthersStudent />}
      />{" "}
      <Route
        exact
        path="/profile-others-student"
        element={<ProfilePageOthersStudent />}
      />
      <Route
        exact
        path="/profile-others-incoming"
        element={<ProfilePageOthersIncoming />}
      />
      <Route
        exact
        path="/profile-own-others"
        element={<ProfilePageOwnOthers />}
      />
      <Route
        exact
        path="/profile-others-others"
        element={<ProfilePageOthersOthers />}
      />
      <Route
        exact
        path="/profile-university"
        element={<ProfilePageUniversity />}
      />
      <Route exact path="/profile-course" element={<ProfilePageCourse />} />
      <Route exact path="/info-page" element={<InfoPage />} />
      <Route
        exact
        path="/learning-agreement-1-3"
        element={<LearningAgreementBeforeMobility1 />}
      />
      <Route
        exact
        path="/learning-agreement-2-3"
        element={<LearningAgreementBeforeMobility2 />}
      />
      <Route
        exact
        path="/learning-agreement-3-3"
        element={<LearningAgreementBeforeMobility3 />}
      />
      <Route
          exact
          path="/learning-agreement-d-1-2"
          element={<LearningAgreementDuringMobility1 />}
          />
      <Route
          exact
          path="/learning-agreement-d-2-2"
          element={<LearningAgreementDuringMobility2 />}
          />
      <Route
          exact
          path="/learning-agreement-after"
          element={<LearningAgreementAfterMobility />}
      />
      //new multiple pages
      <Route exact path="/profile-own" element={<ProfilePageOwn />} />
      <Route exact path="/profile-other" element={<ProfilePageOthers />} />
    </Routes>
  );
}

export default App;
export const socket = io("http://localhost:8080");

