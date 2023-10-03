import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import { useState } from "react";
import { Box } from "@mui/material";
import SideBar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import BedIcon from "@mui/icons-material/Bed";
import NightShelterIcon from "@mui/icons-material/NightShelter";
import AddHomeIcon from "@mui/icons-material/AddHome";
import PaidIcon from "@mui/icons-material/Paid";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
const navItems = [
  {
    text: "Dashboard",
    icon: <SpaceDashboardIcon />,
  },
  {
    text: "Room Type",
    icon: <AddHomeIcon />,
  },
  {
    text: "Room",
    icon: <RoomPreferencesIcon />,
  },
  {
    text: "Bed",
    icon: <BedIcon />,
  },
  {
    text: "Bed Request",
    icon: <NightShelterIcon />,
  },
  {
    text: "Bed Payment",
    icon: <PaidIcon />,
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
            trimPath={7}
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
        </Route>
      </Routes>
    </>
  );
}

export default ManagerPage;
