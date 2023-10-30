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
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  Pagination,
} from "@mui/material";
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
import BedModal from "./BedModal";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function RoomChoosing() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const [semester, setSemester] = useState("");
  const [buildingList, setBuildingList] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [floorList, setFloorList] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [roomTypeList, setRoomTypeList] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [bedList, setBedList] = useState([]);

  const fetchSemester = async () => {
    const res = await privateAxios.get("semester/next-semester");
    setSemester(res.data);
  };
  const fetchBuilding = async () => {
    const res = await privateAxios.get("building");
    setBuildingList(res.data);
  };
  const fetchFloor = async () => {
    const res = await privateAxios.get(`building/${selectedBuilding}`);
    setFloorList(res.data.floors);
  };
  const fetchRoomType = async () => {
    const res = await privateAxios.get(`room-type`);
    setRoomTypeList(res.data);
  };
  const fetchRoom = async () => {
    try {
      const res = await privateAxios.get(
        `room?buildingId=${selectedBuilding}&floor=${selectedFloor}&roomTypeId=${selectedRoomType}&status=vacant`
      );
      setRoomList(res.data);
    } catch (error) {
      setRoomList([]);
    }
  };
  const fetchBed = async () => {
    const res = await privateAxios.get(`room/${selectedRoom}/bed`);
    if (res.data) setBedList(res.data);
  };
  useEffect(() => {
    fetchBuilding();
    fetchSemester();
  }, []);
  useEffect(() => {
    if (selectedBuilding) {
      fetchFloor();
      if (selectedFloor) {
        setSelectedFloor(1);
      }
    }
  }, [selectedBuilding]);
  useEffect(() => {
    if (selectedBuilding && selectedFloor) {
      fetchRoomType();
    }
  }, [selectedFloor, selectedBuilding]);
  useEffect(() => {
    if (selectedBuilding && selectedFloor && selectedRoomType) {
      fetchRoom();
      console.log(roomList);
    }
  }, [selectedFloor, selectedBuilding, selectedRoomType]);
  useEffect(() => {
    if (selectedRoom !== "") {
      setOpen(true);
    }
  }, [selectedRoom]);
  return (
    <Box>
      <h1 style={{ marginLeft: "8px" }}>Choose Room Type</h1>
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
      <Box display={"flex"} justifyContent={"center"} gap={2} mb={2}>
        <FormControl sx={{ width: 250 }}>
          <InputLabel id="building-label">Building</InputLabel>
          <Select
            labelId="building-label"
            label="Building"
            value={selectedBuilding}
            onChange={(e) => {
              setSelectedBuilding(e.target.value);
            }}
          >
            {buildingList.map((building) => (
              <MenuItem key={building.buildingId} value={building.buildingId}>
                {building.buildingName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 250 }}>
          <InputLabel id="floor-label">Floor</InputLabel>
          <Select
            labelId="floor-label"
            label="Floor"
            value={selectedFloor}
            onChange={(e) => {
              setSelectedFloor(e.target.value);
              console.log(e.target.value);
            }}
          >
            {floorList &&
              floorList.map((floor, index) => (
                <MenuItem key={index} value={floor}>
                  {floor}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 250 }}>
          <InputLabel id="room-type-label">Room Type</InputLabel>
          <Select
            labelId="room-type-label"
            label="Room Type"
            value={selectedRoomType}
            onChange={(e) => {
              setSelectedRoomType(e.target.value);
            }}
          >
            {roomTypeList &&
              roomTypeList.map((roomType) => (
                <MenuItem key={roomType.roomTypeId} value={roomType.roomTypeId}>
                  {roomType.roomTypeName}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      <Divider variant="middle" sx={{ marginBottom: 2 }} />
      <Grid
        container
        spacing={2}
        p={1}
        justifyContent="center"
        alignItems="center"
      >
        {roomList.map((room) => (
          <Grid item xs={12} md textAlign={"center"} key={room.id}>
            <Card
              sx={{
                maxWidth: 345,
                display: "inline-block",
                width: "100%",
                border: "1px solid black",
              }}
            >
              <CardActionArea
                onClick={() => {
                  setSelectedRoom(room.id);
                  setOpen(true);
                }}
              >
                <CardContent>
                  <h3>{room.roomName}</h3>
                  <p>{room.roomPrice}</p>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {open && (
        <BedModal
          open={open}
          setOpen={setOpen}
          roomId={selectedRoom}
          studentId={user.studentId}
          semesterId={semester.semesterId}
        />
      )}
    </Box>
  );
}