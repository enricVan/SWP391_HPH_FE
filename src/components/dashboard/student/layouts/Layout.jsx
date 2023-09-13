import React, { useState } from "react";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import Sidebar from "./Sidebar";
import Box from "@mui/material/Box";
export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <>
      <Box width={"100%"} height={"100%"} display={"flex"}>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
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
}
