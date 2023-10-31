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
import { Button, Pagination } from "@mui/material";
import Payment from "./Payment";

export default function BedRequest() {
  const [bookedList, setBookedList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedBedReq, setSelectedBedReq] = useState("");

  const fetchData = async () => {
    try {
      const res = await privateAxios.get(
        `bed-request?pageNo=${currentPage - 1}`
      );
      console.log(res.config.url);
      console.log(res.data);
      setBookedList(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);
  return (
    <Box padding={2}>
      <Box>
        <div
          style={{
            backgroundColor: "#034EA2",
            padding: "6px",
            borderRadius: "15px",
            marginBottom: "10px",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#fff",
              textTransform: "uppercase",
              margin: "0",
            }}
          >
            Bed Request
          </h1>
        </div>
        {/* <FormControl sx={{ minWidth: 120, m: 1 }}>
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
        </FormControl> */}
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#FF5800" }}>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Student Rollnumber
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Bed</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Semester</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Dorm</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Room</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Room Type</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Created Date</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Updated Date</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Payment</TableCell>
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
                <TableCell>{bookedRequest.studentRollNumber}</TableCell>
                <TableCell>{bookedRequest.bedName}</TableCell>
                <TableCell>{bookedRequest.semesterName}</TableCell>
                <TableCell>{bookedRequest.buildingName}</TableCell>
                <TableCell>{bookedRequest.roomName}</TableCell>
                <TableCell>{bookedRequest.roomTypeName}</TableCell>
                <TableCell>{bookedRequest.createdAt}</TableCell>
                <TableCell>
                  {bookedRequest.status.toLowerCase() === "approved" ||
                  bookedRequest.status.toLowerCase() === "expired"
                    ? bookedRequest.updatedAt
                    : "N/A"}
                </TableCell>
                <TableCell
                  sx={{
                    color:
                      bookedRequest.status.toLowerCase() === "expired" ||
                      bookedRequest.status.toLowerCase() === "rejected"
                        ? "red"
                        : bookedRequest.status === "pending"
                        ? "#FFC300 "
                        : "green",
                    fontWeight: "bold",
                  }}
                >
                  {bookedRequest.status.toUpperCase()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setSelectedBedReq(bookedRequest.bedRequestId);
                      setOpen(true);
                    }}
                  >
                    Payment
                  </Button>

                  {/* {bookedRequest.status.toLowerCase() === "pending" && (
                    <IconButton
                      // data-itemID={bookedRequest.bedRequestId}
                      onClick={() =>
                        handleCanelBooking(bookedRequest.bedRequestId)
                      }
                    >
                      <Remove />
                    </IconButton>
                  )} */}
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
      {open && (
        <Payment open={open} setOpen={setOpen} bedRequestId={selectedBedReq} />
      )}
    </Box>
  );
}
