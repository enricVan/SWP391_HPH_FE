import * as React from "react";
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
  Select,
} from "@mui/material";
import { Remove, RemoveRedEye } from "@mui/icons-material";

const statusList = ["All", "pending", "approved", "rejected"];
const user = JSON.parse(localStorage.getItem("user"));
export default function BookedHistory() {
  const [bookedList, setBookedList] = React.useState([]);
  const [status, setStatus] = React.useState(statusList[0]);
  const fetchData = async () => {
    try {
      const res = await privateAxios.get(`bed-request/user/${user.id}`);
      console.log(res.data);
      setBookedList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box padding={1}>
      <Box display={"flex"} sx={{ justifyContent: "space-between" }}>
        <h1 style={{ marginLeft: "8px" }}>Bed Booked History</h1>
        <FormControl sx={{ minWidth: 120, m: 1 }}>
          <InputLabel id="roomType-label">Room Type</InputLabel>
          <Select
            id="select"
            label="Room Type"
            value={status}
            labelId="roomType-label"
            onChange={handleChange}
          >
            <MenuItem value="All">All</MenuItem>
            {types.map((type) => {
              return (
                <MenuItem key={type.roomTypeId} value={type.roomTypeId}>
                  {type.roomTypeName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Bed</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Returned Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookedList.map((bookedRequest) => (
              <TableRow
                key={bookedRequest.bedRequestId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {bookedRequest.bedRequestId}
                </TableCell>
                <TableCell>{bookedRequest.bedName}</TableCell>
                <TableCell>{bookedRequest.price}</TableCell>
                <TableCell>{bookedRequest.createdAt}</TableCell>
                <TableCell>
                  {bookedRequest.updatedAt ? bookedRequest.updatedAt : "N/A"}
                </TableCell>
                <TableCell>{bookedRequest.status}</TableCell>
                <TableCell>
                  <IconButton>
                    <RemoveRedEye />
                  </IconButton>
                  {bookedRequest.status === "pending" && (
                    <IconButton>
                      <Remove />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
