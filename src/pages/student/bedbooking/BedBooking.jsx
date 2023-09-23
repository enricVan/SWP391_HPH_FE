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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
export default function BedBooking() {
  const [semester, setSemester] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [beds, setBeds] = useState([]);
  const [types, settypes] = useState([]);
  const [roomType, setRoomType] = useState("");
  const fetchData = async () => {
    const res = await axios.get("http://localhost:8888/api/v1/admin/room");
    setBeds(res.data);
  };
  useEffect(() => {
    fetchData();
    settypes(beds.map((bed) => bed.roomType));
  }, []);
  const handleClick = (event) => {
    if (event.target.value === selectedValue) {
      setSelectedValue("");
    } else {
      setSelectedValue(event.target.value);
    }
  };
  const handleChange = (e) => {
    setRoomType(e.target.value);
    console.log(e.target.value);
    let filterBeds = beds.filter((bed) => {
      return bed.roomType.roomTypeId === e.target.value;
    });
    setBeds(filterBeds);
  };
  return (
    <Box>
      {console.log(beds)}
      <h1 style={{ marginLeft: "8px" }}>Choose Room Type</h1>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="roomType-label">Room Type</InputLabel>
        <Select
          id="select"
          label="Room Type"
          value={roomType}
          labelId="roomType-label"
          onChange={handleChange}
        >
          {types.map((type) => {
            return (
              <MenuItem key={type.roomTypeId} value={type.roomTypeId}>
                {type.roomTypeName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Box padding={1}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Dorm</TableCell>
                <TableCell align="right">Floor</TableCell>
                <TableCell align="right">Price&nbsp;(g)</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {beds.map((bed) => (
                <TableRow
                  key={bed.roomId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {bed.roomName}
                  </TableCell>
                  <TableCell align="right">{bed.belongDom}</TableCell>
                  <TableCell align="right">{bed.floor}</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">
                    <Radio
                      checked={selectedValue === bed.roomId}
                      onClick={handleClick}
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
