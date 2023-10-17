/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { privateAxios } from "../../../service/axios";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import Searchbar from "../../../components/Searchbar";
import AddIcon from "@mui/icons-material/Add";
import { Button, Modal, TextField } from "@mui/material";
const { Search, SearchIconWrapper, StyledInputBase } = Searchbar;

function BasicTable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Penalty Ticket ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created By</TableCell>
            <TableCell>Student ID</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.penaltyTicketId}>
              <TableCell component="th" scope="row">
                {row.penaltyTicketId}
              </TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.content}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>GUARD ID: {row.createdByGuardId}</TableCell>
              <TableCell>{row.studentId}</TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>{row.updatedAt}</TableCell>
              {/* Thêm các cột khác ở đây */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function PenaltyTicket() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [data, setData] = useState({ content: [], totalPages: 0, number: 0 });
  const [page, setPage] = useState(0);
  const pageSize = 2; // Kích thước trang

  const [searchTerm, setSearchTerm] = useState(""); // Thêm trường tìm kiếm

  const fetchData = async (page, size, search) => {
    try {
      const response = await privateAxios.get(
        `penalty-ticket/page?page=${page}&size=${size}&title=${search}`
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    setPage(0); // Tự động chuyển về trang số 1
  };

  useEffect(() => {
    fetchData(page, pageSize, searchTerm);
  }, [page, searchTerm]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  return (
    <div style={{ margin: "1.5rem" }}>
      {/* Add pop-up start */}
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            width: "30%",
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
            Add New Penalty Ticket
          </h3>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            sx={{
              marginTop: "0.3rem",
            }}
          />
          <Button
            onClick={handleClose}
            sx={{
              marginTop: "1rem",
              color: "#FFF",
              backgroundColor: "#FF5000",
              "&:hover": {
                backgroundColor: "#FF2000",
                borderColor: "#FF2000",
                boxShadow: "none",
              },
            }}
          >
            Add
          </Button>
        </div>
      </Modal>

      {/* Add pop-up end*/}

      <h1 style={{ textAlign: "center" }}>Penalty Ticket</h1>

      <Box flex sx={{ margin: "1.5rem" }}>
        <Search sx={{ display: "inline-block" }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={handleSearchChange}
            inputProps={{ "aria-label": "search" }}
            sx={{
              border: "5px solid orangered",
              borderRadius: "30px",
            }}
          />
        </Search>
      </Box>

      <Button
        variant="contained"
        sx={{
          color: "#FFF",
          backgroundColor: "#FF5000",
          "&:hover": {
            backgroundColor: "#FF2000",
            borderColor: "#FF2000",
            boxShadow: "none",
          },
        }}
        startIcon={<AddIcon />}
        onClick={handleOpen} // Mở pop-up khi nút được ấn
      >
        Add
      </Button>

      <BasicTable data={data.content} />
      <div>
        <Pagination
          count={data.totalPages}
          color="primary"
          page={data.number + 1}
          onChange={handlePageChange}
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
            my: 8,
          }}
        />
      </div>
    </div>
  );
}

export default PenaltyTicket;
