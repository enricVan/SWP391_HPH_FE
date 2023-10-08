import "./App.css";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./components/login/LoginPage";
import StudentPage from "./pages/student/StudentPage";
import LandingPage from "./pages/landingpage/LandingPage";
import ForgetPassword from "./pages/forgetpassword/ForgetPassword";
import Signup from "./pages/signup/Signup";
import ManagerPage from "./pages/manager/ManagerPage";
import HeadManagerPage from "./pages/headmanager/HeadManagerPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="student/*" element={<StudentPage />} />
        <Route path="manager/*" element={<ManagerPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/headmanager/*" element={<HeadManagerPage />} />
      </Routes>
    </>
  );
}

export default App;
