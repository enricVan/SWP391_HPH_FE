import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import {
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import bedData from "../../../data/beds.json";
import { Link } from "react-router-dom";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export default function BedBooking() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    // const bedId = document.getElementsByName("radio-buttons").value;
    // const requestData = {
    //   bed: {
    //     bedId: bedId,
    //   },
    //   student: {
    //     studentid: 1,
    //   },
    //   semesterId: 3,
    // };
    // const sendRequest = async (request) => {
    //   const res = await axios.post(
    //     "http://localhost:8888/api/v1/admin/bed-request",
    //     request
    //   );
    //   return res.data;
    // };
    // sendRequest(requestData);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [semester, setSemester] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [beds, setBeds] = useState([]);
  const [types, settypes] = useState([]);
  const [roomType, setRoomType] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const fetchData = async () => {
    // const res1 = await axios.get("http://localhost:8888/api/v1/admin/bed");
    // const bedData = await res1;
    // console.log(bedData);
    // setBeds(res1.data);
    const res2 = await axios.get("http://localhost:8888/api/v1/admin/room");
    const roomData = await res2;
    settypes(roomData.map((room) => room.roomType));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleClick = (event) => {
    if (event.target.value === selectedValue) {
      setSelectedValue("");
    } else {
      setSelectedValue(event.target.value);
      console.log(event.target.value);
    }
  };
  const handleChange = (e) => {
    setRoomType(e.target.value);
  };
  return (
    <Box>
      {console.log(beds)}
      <h1 style={{ marginLeft: "8px" }}>Choose Room Type</h1>
      <FormControl sx={{ minWidth: 120, m: 1 }}>
        <InputLabel id="roomType-label">Room Type</InputLabel>
        <Select
          id="select"
          label="Room Type"
          value={roomType}
          labelId="roomType-label"
          onChange={handleChange}
        >
          <MenuItem value="">All</MenuItem>
          {types.map((type, index) => {
            return (
              <MenuItem key={index} value={type.roomTypeId}>
                {type.roomTypeName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {console.log(document.getElementsByName("radio-buttons").length)}
      <Button
        disabled={isDisable}
        onClick={handleClickOpen}
        variant="contained"
        sx={{
          m: 1,
          height: "56px",
          bgcolor: "orangered",
          ":hover": {
            background: "rgba(255,69,0,0.8)",
            color: "white",
            transition: "0.1s",
          },
        }}
      >
        Booking
      </Button>
      <Box padding={1}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Bed</TableCell>
                <TableCell align="center">Room</TableCell>
                <TableCell align="center">Dorm</TableCell>
                <TableCell align="center">Floor</TableCell>
                <TableCell align="center">Price&nbsp;(VND)</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {beds
                .filter((bed) => {
                  if (roomType === "") {
                    return bed;
                  } else if (bed.room.roomType.roomTypeId === roomType) {
                    return bed;
                  }
                })
                .map((bed) => (
                  <TableRow
                    key={bed.bedId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {bed.room.roomId}
                    </TableCell>
                    <TableCell align="center">{bed.bedName}</TableCell>
                    <TableCell align="center">{bed.room.roomName}</TableCell>
                    <TableCell align="center">{bed.room.belongDom}</TableCell>
                    <TableCell align="center">{bed.room.floor}</TableCell>
                    <TableCell align="center">{bed.price}</TableCell>
                    <TableCell align="center">
                      <Radio
                        checked={selectedValue === bed.bedId}
                        onClick={() => {
                          if (selectedValue === bed.bedId) {
                            setSelectedValue("");
                            setIsDisable(true);
                          } else {
                            setSelectedValue(bed.bedId);
                            setIsDisable(false);
                          }
                        }}
                        value={bed.bedId}
                        name="radio-buttons"
                        inputProps={{ "aria-label": "A" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
          style={{ color: "orangered" }}
        >
          Send Request Success!
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Your Booking Request Have Been Received By The System
          </Typography>
        </DialogContent>
        <DialogActions>
          <Link to={"/student/bedpayment"} style={{ textDecoration: "none" }}>
            <Button autoFocus>Check Your Payment Bill</Button>
          </Link>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
}
