import LoginPage from "./pages/LoginPage/LoginPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
