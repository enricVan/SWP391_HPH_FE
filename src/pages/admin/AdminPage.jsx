import { Outlet, Route, Routes } from "react-router";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Box } from "@mui/system";
import SideBar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { useState } from "react";
import User from "./user/User";

import RoomType from "./roomtype/RoomType";
import Room from "./room/Room";

const navItems = [
  { text: "User", icon: <ManageAccountsIcon /> },
  { text: "Room Type", icon: <ManageAccountsIcon /> },
  { text: "Room", icon: <ManageAccountsIcon /> },
];


function AdminPage() {
  const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    return (
      <>
        <Box width={"100%"} height={"100%"} display={"flex"}>
          <SideBar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            navItems={navItems}
            trimPath={13}
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
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" />
        <Route path="user" element={<User />} />
        <Route path="roomtype" element={<RoomType />} />
        <Route path="room" element={<Room />} />
      </Route>
    </Routes>
  );
}

export default AdminPage;
