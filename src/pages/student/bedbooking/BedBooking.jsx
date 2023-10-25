import { useEffect, useState } from "react";
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
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Button, Pagination } from "@mui/material";
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
import { Link } from "react-router-dom";
import { privateAxios } from "../../../service/axios";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function BedBooking() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const [requestStatus, setRequestStatus] = useState(false);
  const handleClickOpen = () => {
    const requestData = {
      bed: {
        bedId: selectedValue,
      },
      student: {
        studentId: user.id,
      },
      semester: {
        semesterId: semester.semesterId,
      },
    };
    privateAxios.post("bed-request", requestData).then((res) => {
      if (res.data) {
        setRequestStatus(true);
        setOpen(true);
      } else {
        setRequestStatus(false);
        setOpen(true);
      }
    });
  };
  const handleClose = () => {
    setOpen(false);
    setReload(!reload);
  };

  const [semester, setSemester] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [beds, setBeds] = useState([]);
  const [types, settypes] = useState([]);
  const [roomType, setRoomType] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [reload, setReload] = useState(false);
  const fetchRoomType = async () => {
    const res = await privateAxios.get("room-type");
    settypes(res.data);
  };
  const fetchSemester = async () => {
    const res = await privateAxios.get("semester/next-semester");
    setSemester(res.data);
  };
  const fetchBed = async () => {
    const res = await privateAxios.get(
      `bed/user?roomTypeId=${roomType}&page=${currentPage - 1}`
    );
    console.log(res.config.url);
    setBeds(res.data.data);
    setTotalPages(res.data.totalPages);
  };

  const handleClick = (event) => {
    if (event.target.value === selectedValue) {
      setSelectedValue("");
    } else {
      setSelectedValue(event.target.value);
    }
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    if (e.target.value === "All") setRoomType("");
    else setRoomType(e.target.value);
    setCurrentPage(1);
  };
  useEffect(() => {
    fetchRoomType();
    fetchSemester();
  }, []);
  useEffect(() => {
    if (roomType) {
      fetchBed();
    }
  }, [roomType, currentPage, reload]);
  return (
    <Box>
      <h1 style={{ marginLeft: "8px" }}>Choose Room Type</h1>
      <Box display={"flex"}>
        <FormControl sx={{ minWidth: 120, m: 1 }}>
          <InputLabel id="roomType-label">Room Type</InputLabel>
          <Select
            id="select"
            label="Room Type"
            value={roomType === "" ? "All" : roomType}
            labelId="roomType-label"
            onChange={handleChange}
          >
            <MenuItem disabled>
              <em>Room Type</em>
            </MenuItem>
            {types.map((type) => {
              return (
                <MenuItem key={type.roomTypeId} value={type.roomTypeId}>
                  {type.roomTypeName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
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
        <Typography
          flexGrow={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          mx={1}
          variant="h5"
          color={"orangered"}
        >
          Semester: {semester.semesterName}
        </Typography>
      </Box>
      <Box padding={1}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Bed</TableCell>
                <TableCell align="center">Room</TableCell>
                <TableCell align="center">Building</TableCell>
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
                  } else if (bed.roomTypeId === roomType) {
                    return bed;
                  }
                })
                .map((bed) => (
                  <TableRow
                    key={bed.bedId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {bed.bedId}
                    </TableCell>
                    <TableCell align="center">{bed.bedName}</TableCell>
                    <TableCell align="center">{bed.roomName}</TableCell>
                    <TableCell align="center">{bed.buildingName}</TableCell>
                    <TableCell align="center">{bed.floor}</TableCell>
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
        <Pagination
          color="primary"
          count={totalPages}
          page={currentPage}
          onChange={(e, value) => {
            setCurrentPage(value);
          }}
          sx={{
            justifyContent: "center",
            "& .MuiPagination-ul": {
              justifyContent: "center",
            },
            "&& .Mui-selected": {
              bgcolor: "orangered",
            },
            "& .MuiPaginationItem-root:hover": {
              bgcolor: "rgba(255,69,0,0.8)",
            },
            "&& .Mui-selected:hover": {
              bgcolor: "rgba(255,69,0,0.8)",
            },
            my: 4,
          }}
        />
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
          {requestStatus ? (
            <p style={{ color: "lightgreen" }}>Send Request Success!</p>
          ) : (
            <p style={{ color: "red" }}>Send Request Failed!</p>
          )}
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
          <Link
            to={"/student/bookedhistory"}
            style={{ textDecoration: "none" }}
          >
            <Button autoFocus>Check Your Booked History</Button>
          </Link>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
}
