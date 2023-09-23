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

export default function BedBooking() {
  const [semester, setSemester] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [beds, setBeds] = useState([]);
  const [types, settypes] = useState([]);
  const [roomType, setRoomType] = useState("");
  const fetchData = async () => {
    const res = await axios.get("http://localhost:8888/api/v1/admin/room");
    setBeds(res.data);
    settypes(res.data.map((bed) => bed.roomType));
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
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Dorm</TableCell>
                <TableCell align="center">Floor</TableCell>
                <TableCell align="center">Price&nbsp;(g)</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {beds
                .filter((bed) => {
                  if (roomType === "") {
                    return bed;
                  } else if (bed.roomType.roomTypeId === roomType) {
                    return bed;
                  }
                })
                .map((bed) => (
                  <TableRow
                    key={bed.roomId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {bed.roomId}
                    </TableCell>
                    <TableCell align="center">{bed.roomName}</TableCell>
                    <TableCell align="center">{bed.belongDom}</TableCell>
                    <TableCell align="center">{bed.floor}</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">
                      <Radio
                        checked={selectedValue === bed.roomId}
                        onClick={() => {
                          setSelectedValue(bed.roomId);
                        }}
                        value={bed.roomId}
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
    </Box>
  );
}
