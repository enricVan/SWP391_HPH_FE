import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import {
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { privateAxios } from "../../../service/axios";
import BedModal from "./BedModal";
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
  // const [bedList, setBedList] = useState([]);

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
    let filterQuery = "";
    console.log(selectedBuilding);
    if (selectedBuilding) filterQuery += `&buildingId=${selectedBuilding}`;
    if (selectedFloor) filterQuery += `&floor=${selectedFloor}`;
    if (selectedRoomType) filterQuery += `&roomTypeId=${selectedRoomType}`;
    try {
      const res = await privateAxios.get(`room?status=vacant${filterQuery}`);
      console.log(res.data);
      setRoomList(res.data);
    } catch (error) {
      setRoomList([]);
    }
  };
  useEffect(() => {
    fetchBuilding();
    fetchRoomType();
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
    if (selectedBuilding || selectedFloor || selectedRoomType) {
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
      <h1 style={{ margin: "8px", textAlign: "center" }}>Bed Booking</h1>
      <Typography
        flexGrow={1}
        textAlign={"center"}
        mx={1}
        variant="h5"
        color={"orangered"}
      >
        Semester: {semester.semesterName}
      </Typography>

      <Divider variant="middle" sx={{ marginBottom: 2 }} />
      <Grid
        container
        spacing={2}
        p={1}
        justifyContent="center"
        sx={{
          flexDirection: { xs: "column-reverse", md: "row" },
        }}
      >
        <Grid item container xs={12} md={8} spacing={2}>
          {roomList.map((room) => (
            <Grid item xs={12} md={6} key={room.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  display: "inline-block",
                  width: "100%",
                  border: "1px solid black",
                  bgcolor:
                    room.numberOfAvailableBeds !== 0 ? "#D4EFDF" : "#F5B7B1",
                }}
              >
                <CardActionArea
                  onClick={() => {
                    setSelectedRoom(room.id);
                    setOpen(true);
                  }}
                >
                  <CardContent>
                    <Grid container>
                      <Grid item xs={12} md={6}>
                        Room Name:
                      </Grid>
                      <Grid item xs={12} md={6}>
                        {room.roomName}
                      </Grid>
                      <Grid item xs={12} md={6}>
                        BUilding Name:
                      </Grid>
                      <Grid item xs={12} md={6}>
                        {room.buildingName}
                      </Grid>
                      <Grid item xs={12} md={6}>
                        Room Type:
                      </Grid>
                      <Grid item xs={12} md={6}>
                        {room.roomTypeName}
                      </Grid>
                      <Grid item xs={12} md={6}>
                        Price
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <div>
                          {room.roomPrice.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </div>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        Available Bed:
                      </Grid>
                      <Grid item xs={12} md={6}>
                        {room.numberOfAvailableBeds}
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            gap={2}
            mb={2}
          >
            <FormControl sx={{ width: 250 }}>
              <Select
                displayEmpty
                value={selectedRoomType}
                onChange={(e) => {
                  setSelectedRoomType(e.target.value);
                }}
              >
                <MenuItem value="">
                  <em style={{ color: "#666666" }}>Select a room type</em>
                </MenuItem>
                {roomTypeList &&
                  roomTypeList.map((roomType) => (
                    <MenuItem
                      key={roomType.roomTypeId}
                      value={roomType.roomTypeId}
                    >
                      {roomType.roomTypeName}&nbsp;&nbsp;- &nbsp;
                      {roomType.price.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: 250 }}>
              <Select
                displayEmpty
                value={selectedBuilding}
                onChange={(e) => {
                  setSelectedBuilding(e.target.value);
                }}
              >
                <MenuItem value="">
                  <em style={{ color: "#666666" }}>Select a building</em>
                </MenuItem>
                {buildingList.map((building) => (
                  <MenuItem
                    key={building.buildingId}
                    value={building.buildingId}
                  >
                    {building.buildingName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: 250 }}>
              <Select
                displayEmpty
                value={selectedFloor}
                onChange={(e) => {
                  setSelectedFloor(e.target.value);
                }}
              >
                <MenuItem value="">
                  <em style={{ color: "#666666" }}>Select a floor</em>
                </MenuItem>
                {floorList &&
                  floorList.map((floor, index) => (
                    <MenuItem key={index} value={floor}>
                      {floor}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            {/* <FormControl sx={{ width: 250 }}>
              <Select
                displayEmpty
                value={selectedFloor}
                onChange={(e) => {
                  setSelectedFloor(e.target.value);
                }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="">Available</MenuItem>
                <MenuItem value="">Not Available</MenuItem>
              </Select>
            </FormControl> */}
          </Box>
        </Grid>
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
