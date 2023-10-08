import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
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
import HomeIcon from "@mui/icons-material/Home";
import HotelIcon from "@mui/icons-material/Hotel";
import PaymentIcon from "@mui/icons-material/Payment";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PaidIcon from "@mui/icons-material/Paid";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import SideBar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { useState } from "react";

const navItems = [
  {
    text: "Home",
    icon: <HomeIcon />,
  },
  {
    text: "News",
    icon: <NotificationsIcon />,
  },
  {
    text: "Bed Booking",
    icon: <HotelIcon />,
  },
  {
    text: "Bed Payment",
    icon: <PaymentIcon />,
  },
  {
    text: "Room Assignment",
    icon: <ListAltIcon />,
  },
  {
    text: "Payment History",
    icon: <PaidIcon />,
  },
  {
    text: "Request",
    icon: <ContactSupportIcon />,
  },
];
function StudentPage() {
  // const { user } = useSelector((state) => state.auth);
  // if (user.role.name !== "STUDENT" || !localStorage.getItem("token")) {
  //   return <Navigate to="/login" replace />;
  // }
  const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    return (
      <>
        <Box width={"100%"} height={"100%"} display={"flex"}>
          <SideBar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            navItems={navItems}
            trimPath={9}
          />
          <Box width={"100%"} height={"100%"}>
            <Topbar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <Outlet />
          </Box>
        </Box>
      </>
    );
  };
  return (
    <>
      <Routes>
        <Route element={<Layout navItems={navItems} />}>
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
