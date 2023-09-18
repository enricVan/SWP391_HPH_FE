import Layout from "../layouts/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./home/Home";
import News from "./news/News";
import BedBooking from "./bedbooking/BedBooking";
import BedPayment from "./bedpayment/BedPayment";
import RoomAssignment from "./roomassignment/RoomAssignment";
import PaymentHistory from "./paymenthistory/PaymentHistory";
import Request from "./request/Request";
import Profile from "./profile/StudentProfile"
function StudentPage() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/student/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="news" element={<News />} />
          <Route path="bedbooking" element={<BedBooking />} />
          <Route path="bedpayment" element={<BedPayment />} />
          <Route path="roomassignment" element={<RoomAssignment />} />
          <Route path="paymenthistory" element={<PaymentHistory />} />
          <Route path="request" element={<Request />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default StudentPage;
