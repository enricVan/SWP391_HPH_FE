import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./components/authent/login/LoginPage";
import StudentPage from "./pages/student/StudentPage";
import { useSelector } from "react-redux";
function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Routes>
        <Route path="/login" Component={LoginPage} />
        <Route
          path="student/*"
          element={user ? <StudentPage /> : <Navigate replace to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
