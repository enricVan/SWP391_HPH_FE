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
import { useSelector } from "react-redux";

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
export default function BookedHistory() {
  const { user } = useSelector((state) => state.user);
  const [bookedList, setBookedList] = React.useState([]);
  const fetchData = async () => {
    try {
      const res = await privateAxios.get(`v1/admin/bedRequest/user/${user.id}`);
      console.log(res.data);
      setBookedList[res.data];
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
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Bed</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Created Date</TableCell>
              <TableCell align="right">Returned Date</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookedList.map((bookedRequest) => (
              <TableRow
                key={bookedRequest.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {bookedRequest.bed}
                </TableCell>
                <TableCell align="right">{bookedRequest.price}</TableCell>
                <TableCell align="right">{bookedRequest.createdDate}</TableCell>
                <TableCell align="right">
                  {bookedRequest.updatedDate
                    ? bookedRequest.updatedDate
                    : "N/A"}
                </TableCell>
                <TableCell align="right">{bookedRequest.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
