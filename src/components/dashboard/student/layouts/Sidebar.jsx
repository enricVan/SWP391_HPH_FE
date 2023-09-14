import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import HotelIcon from "@mui/icons-material/Hotel";
import PaymentIcon from "@mui/icons-material/Payment";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PaidIcon from "@mui/icons-material/Paid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { ChevronLeft } from "@mui/icons-material/ChevronLeft";
const drawerWidth = 240;
export default function SideBar({ isSidebarOpen, setIsSidebarOpen }) {
  const { pathname } = useLocation();
  const [active, setActive] = useState("home");
  const navigate = useNavigate();
  useEffect(() => {
    setActive(pathname.substring(9));
    console.log(pathname.substring(9));
  }, [pathname]);
  const navItems = [
    {
      text: "Home",
      icon: <HomeIcon />,
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
      text: "Room Assignment Status",
      icon: <ListAltIcon />,
    },
    {
      text: "Payment History",
      icon: <PaidIcon />,
    },
  ];
  return (
    <>
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {/* <Toolbar /> */}
          <Box sx={{ overflow: "auto" }}>
            <Box
              sx={{
                padding: "10px 0 10px 0",
              }}
            >
              <Avatar sx={{ margin: "auto" }} variant="square"></Avatar>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h5"
                  sx={{
                    marginTop: "10px",
                    marginBottom: 0,
                  }}
                >
                  Thao TTP
                </Typography>
                <Typography paragraph>RollNumber: HE172788</Typography>
              </Box>
            </Box>
            <Divider />
            <List>
              {navItems.map(({ text, icon }) => {
                const lcText = text.toLowerCase().replace(/ /g, "");
                {
                  console.log(lcText);
                }
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      sx={{
                        backgroundColor: active === lcText ? "#1976d2" : "",
                      }}
                      onClick={() => {
                        navigate(`${lcText}`);
                        setActive(lcText);
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: active === lcText ? "blue" : "",
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </>
  );
}
