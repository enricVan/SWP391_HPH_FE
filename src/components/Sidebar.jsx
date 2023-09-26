import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
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
import NotificationsIcon from "@mui/icons-material/Notifications";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import Toolbar from "@mui/material/Toolbar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logout, reset } from "../features/authSlice";
import logo from "../assets/image/avatar-logo.jpg";
const drawerWidth = 240;
export default function SideBar({ isSidebarOpen, setIsSidebarOpen }) {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate(-1);
  };
  const { pathname } = useLocation();
  const [active, setActive] = useState("home");
  const navigate = useNavigate();
  useEffect(() => {
    setActive(pathname.substring(9));
  }, [pathname]);
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
          <Box sx={{ overflow: "auto" }}>
            <Box
              sx={{
                padding: "10px 0 10px 0",
              }}
            >
              <Avatar
                sx={{ margin: "auto", width: "100%", height: "100%" }}
                variant="square"
                src={logo}
              ></Avatar>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h5"
                  sx={{
                    marginTop: "10px",
                    marginBottom: 0,
                  }}
                >
                  LongVH
                </Typography>
                <Typography paragraph>RollNumber: HE172788</Typography>
              </Box>
            </Box>
            <Divider />
            <List
              sx={{
                "& .MuiListItemButton-root:hover": {
                  background: "rgba(255,69,0,0.8)",
                  transition: "0.1s",
                },
              }}
            >
              {navItems.map(({ text, icon }) => {
                const lcText = text.toLowerCase().replace(/ /g, "");
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      sx={{
                        backgroundColor: active.includes(lcText)
                          ? "orangered"
                          : "",
                      }}
                      onClick={() => {
                        navigate(`${lcText}`);
                        setActive(lcText);
                      }}
                    >
                      <ListItemIcon
                        sx={
                          {
                            // color: active === lcText ? "" : "",
                          }
                        }
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
          <Toolbar>
            <Button
              onClick={onLogout}
              variant="contained"
              startIcon={<LogoutIcon />}
              fullWidth
              sx={{ bgcolor: "orangered" }}
            >
              LOGOUT
            </Button>
          </Toolbar>
        </Drawer>
      )}
    </>
  );
}
