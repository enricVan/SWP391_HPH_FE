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
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import { Remove, RemoveRedEye } from "@mui/icons-material";


const statusList = ["pending", "approved", "rejected"];
const user = JSON.parse(localStorage.getItem("user"));
export default function BookedHistory() {
  const [bookedList, setBookedList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("");
  const [reload, setReload] = useState(false);
  const [open, setOpen] = useState(false);
  const handleChange = (e) => {
    if (e.target.value === "All") setStatus("");
    else setStatus(e.target.value);
  };
  const handleCanelBooking = (id) => {
    if (confirm(`Room Type ID ${id} will be delete?`)) {
      (async () => {
        await privateAxios.delete(`bed-request/${id}`);
        await fetchData();
      })();
    }
    console.log(id);
  };
  const fetchData = async () => {
    try {
      const res = await privateAxios.get(
        `bed-request/user/${user.id}?status=${status}&page=${currentPage - 1}`
      );
      console.log(res.data);
      setBookedList(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, status, reload]);
  return (
    <Box padding={1}>
      <Box display={"flex"} sx={{ justifyContent: "space-between" }}>
        <h1 style={{ marginLeft: "8px" }}>Bed Booked History</h1>
        <FormControl sx={{ minWidth: 120, m: 1 }}>
          <InputLabel id="roomType-label">Status</InputLabel>
          <Select
            id="select"
            label="Status"
            value={status === "" ? "All" : status}
            labelId="roomType-label"
            onChange={handleChange}
          >
            <MenuItem value="All">All</MenuItem>
            {statusList.map((type) => {
              return (
                <MenuItem key={type} value={type.toLowerCase()}>
                  {type.toLowerCase()}
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
              <TableCell>Setting</TableCell>
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
                  {bookedRequest.status === "Approved"
                    ? bookedRequest.updatedAt
                    : "N/A"}
                </TableCell>
                <TableCell>{bookedRequest.status}</TableCell>
                <TableCell>
                  {/* <IconButton onClick={() => setOpen(true)}>
                    <RemoveRedEye />
                  </IconButton> */}
                  {bookedRequest.status === "pending" && (
                    <IconButton
                      // data-itemID={bookedRequest.bedRequestId}
                      onClick={() =>
                        handleCanelBooking(bookedRequest.bedRequestId)
                      }
                    >
                      <Remove />
                    </IconButton>
                  )}
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
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Booked Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              Bed:
            </Grid>
            <Grid item xs={9}>
              asdf
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
