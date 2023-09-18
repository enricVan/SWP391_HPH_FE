import "./App.css";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./components/authent/login/LoginPage";
import StudentPage from "./pages/student/StudentPage";
import Landing from "./pages/landingpage/Landing";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" Component={LoginPage} />
        <Route path="student/*" element={<StudentPage />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </>
  );
}

export default App;
