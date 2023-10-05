import { Outlet, Route, Routes } from "react-router";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Box } from "@mui/system";
import SideBar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { useState } from "react";
import User from "./user/User";
import UserDetail from "./user/UserDetail";

const navItems = [{ text: "User", icon: <ManageAccountsIcon /> }];

function HeadManagerPage() {
  const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    return (
      <>
        <Box width={"100%"} height={"100%"} display={"flex"}>
          <SideBar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            navItems={navItems}
            trimPath={12}
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
        <Route path="user/userdetail/:id" element={<UserDetail />} />
      </Route>
    </Routes>
  );
}

export default HeadManagerPage;
