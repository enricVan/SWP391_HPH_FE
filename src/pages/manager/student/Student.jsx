import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { privateAxios } from "../../../service/axios";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

export default function Student() {
  const [students, setStudents] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [buildingList, setBuildingList] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [floorList, setFloorList] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const navigate = useNavigate();

  const fetchBuilding = async () => {
    const res = await privateAxios.get("building");
    setBuildingList(res.data);
  };

  const fetchFloor = async () => {
    if (selectedBuilding) {
      const res = await privateAxios.get(`building/${selectedBuilding}`);
      setFloorList(res.data.floors);
    }
  };

  const fetchRoom = async () => {
    if (selectedBuilding && selectedFloor) {
      const res = await privateAxios.get(
        `room?buildingId=${selectedBuilding}&floor=${selectedFloor}`
      );
      setRoomList(res.data);
    }
  };

  const fetchData = async () => {
    try {
      const res = await privateAxios.get(
        `student?pageNo=${
          currentPage - 1
        }&buildingId=${selectedBuilding}&floor=${selectedFloor}&roomId=${selectedRoom}`
      );
      console.log(res.config.url);
      console.log(res.data);
      setStudents(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBuilding();
    fetchFloor();
    fetchRoom();
    fetchData();
  }, [currentPage, selectedBuilding, selectedFloor, selectedRoom]);

  return (
    <Box p={3}>
      <Box>
        <h1
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#ff5400",
            textTransform: "uppercase",
          }}
        >
          Student
        </h1>
      </Box>
      {/* Filter start */}
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
              floorList.map((floor) => (
                <MenuItem key={floor} value={floor}>
                  {floor}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 250 }}>
          <InputLabel id="room-label">Room</InputLabel>
          <Select
            labelId="room-label"
            label="Room"
            value={selectedRoom}
            onChange={(e) => {
              setSelectedRoom(e.target.value);
            }}
          >
            {roomList &&
              roomList.map((room) => (
                <MenuItem key={room.id} value={room.id}>
                  {room.roomName}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      {/* Filter end */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#FF5800" }}>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Student Rollnumber
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Room</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Bed</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Dormitary</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Room Type</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>View details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow
                key={student.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {student.id}
                </TableCell>
                <TableCell>{student.rollNumber}</TableCell>
                <TableCell>{student.userDto.fullName}</TableCell>
                <TableCell>{student.roomName}</TableCell>
                <TableCell>{student.bedName}</TableCell>
                <TableCell>{student.buildingName}</TableCell>
                <TableCell>{student.roomTypeName}</TableCell>
                <TableCell>{student.userDto.email}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      navigate(student.rollNumber);
                    }}
                  >
                    <VisibilityIcon sx={{ color: "#FF4500" }} />
                  </IconButton>
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
  );
}
