import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
export default function Topbar({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: "orangered" }}
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="img"
            sx={{
              height: 64,
            }}
            alt="fpt logo."
            src={"/logo-fpt.jpg"}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Campus-Dorm
          </Typography>
          <IconButton>
            <Avatar></Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
