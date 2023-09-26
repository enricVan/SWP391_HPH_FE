import Layout from "../layouts/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./home/Home";
import News from "./news/News";
import BedBooking from "./bedbooking/BedBooking";
import BedPayment from "./bedpayment/BedPayment";
import RoomAssignment from "./roomassignment/RoomAssignment";
import PaymentHistory from "./paymenthistory/PaymentHistory";
import Request from "./request/Request";
import NewsDetail from "./news/NewsDetail";
import ChangePassword from "../changePassword/ChangePassword";
import StudentProfile from "../profile/StudentProfile";
function StudentPage() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/student/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="news" element={<News />} />
          <Route path="news/detail/:id" element={<NewsDetail />} />
          <Route path="bedbooking" element={<BedBooking />} />
          <Route path="bedpayment" element={<BedPayment />} />
          <Route path="roomassignment" element={<RoomAssignment />} />
          <Route path="paymenthistory" element={<PaymentHistory />} />
          <Route path="request" element={<Request />} />
        </Route>
        <Route path="profile" element={<StudentProfile />} />
        <Route path="changepassword" element={<ChangePassword />} />
      </Routes>
    </>
  );
}

export default StudentPage;
