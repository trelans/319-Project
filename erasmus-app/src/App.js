import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";

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
    </Routes>
  );
}

export default App;
