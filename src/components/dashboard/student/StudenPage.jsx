import Layout from "./layouts/Layout";
import BedBooking from "./pages/BedBooking";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
function Dashboard() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/student/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="bedbooking" element={<BedBooking />} />
        </Route>
      </Routes>
    </>
  );
}

export default Dashboard;
