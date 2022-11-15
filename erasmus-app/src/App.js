import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordConfirmPage from "./pages/ResetPasswordConfirmPage/ResetPasswordConfirmPage";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
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
    </Routes>
  );
}

export default App;
