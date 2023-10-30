import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import { useState } from "react";
import { Box } from "@mui/material";
import SideBar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import BedroomChildIcon from "@mui/icons-material/BedroomChild";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Room from "./room/Room";
import Student from "./student/Student";
import StudentDetail from "./student/StudentDetails";
import HotelIcon from "@mui/icons-material/Hotel";
const navItems = [
  {
    text: "Dashboard",
    icon: <SpaceDashboardIcon />,
  },
  {
    text: "Room",
    icon: <BedroomChildIcon />,
  },
  {
    text: "Student",
    icon: <AccountCircleIcon />,
  },
  {
    text: "Bed Request",
    icon: <HotelIcon />,
  },
];
function ManagerPage() {
  //   if (
  //     localStorage.getItem("role") !== "STUDENT" ||
  //     !localStorage.getItem("token")
  //   ) {
  //     return <Navigate to="/login" replace />;
  //   }
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
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="room" element={<Room />} />
          <Route path="student" element={<Student />} />
          <Route path="student/:rollNumber" element={<StudentDetail />} />
          <Route path="bedrequest" />
        </Route>
      </Routes>
    </>
  );
}

export default ManagerPage;
