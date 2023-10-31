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
  TextField,
} from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";
import Payment from "./Payment";
import BedDetails from "./BedDetails";
import { deepOrange, orange } from "@mui/material/colors";

export default function User() {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reload, setReload] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [openUserDetails, setOpenUserDetails] = useState(false);
  const [partialName, setPartialName] = useState("");
  const [roleId, setRoleId] = useState(0);
  const [roles, setRoles] = useState([]);
  const [selectedStatus, SetSelectedStatus] = useState("all");

  const fetchData = async () => {
    try {
      var res;
      if (roleId != 0) {
        res = await privateAxios.get(
          `user?partialName=${partialName}&roleId=${roleId}&pageNo=${
            currentPage - 1
          }`
        );
      } else {
        res = await privateAxios.get(
          `user?partialName=${partialName}&roleId=&pageNo=${currentPage - 1}`
        );
      }
      console.log(res.config.url);
      console.log(res.data);
      if (selectedStatus === "all") {
        // If 'all', set users without filtering
        setUsers(res.data.data);
      } else {
        // If not 'all', filter the data to keep only items with status 'active'
        const activeUsers = res.data.data.filter(
          (item) => item.status === selectedStatus
        );
        setUsers(activeUsers);
      }
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, reload, roleId, partialName, selectedStatus]);

  const fetchRoles = async () => {
    try {
      const res = await privateAxios.get("role");
      setRoles(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRoles();
  }, []);

  // const deleteUser = async () => {
  //   try {
  //     const res = await privateAxios.delete('user')
  //     setRoles(res.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <Box padding={1}>
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
          User Management
        </h1>
      </div>
      <Box
        display={"flex"}
        sx={{ justifyContent: "space-between" }}
        margin={"5vh 0"}
      ></Box>
      <Box display={"flex"} justifyContent={"center"} gap={2} mb={2}>
        <FormControl sx={{ width: 250 }}>
          <TextField
            label="Username"
            fullWidth
            multiline
            value={partialName}
            onChange={(event) => {
              setPartialName(event.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ width: 250 }}>
          <InputLabel id="floor-label">Role</InputLabel>
          <Select
            labelId="floor-label"
            label="Floor"
            value={roleId}
            onChange={(e) => {
              setRoleId(e.target.value);
            }}
          >
            <MenuItem key={1} value={0}>
              ALL
            </MenuItem>
            {roles &&
              roles.map((item, index) => (
                <MenuItem key={index + 1} value={item.id}>
                  {item.roleName}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 250 }}>
          <InputLabel id="room-type-label">Status</InputLabel>
          <Select
            labelId="room-type-label"
            label="Status"
            value={selectedStatus}
            onChange={(e) => {
              SetSelectedStatus(e.target.value);
            }}
          >
            <MenuItem key={0} value={"all"}>
              {"ALL"}
            </MenuItem>
            <MenuItem key={0} value={"active"}>
              {"ACTIVE"}
            </MenuItem>
            <MenuItem key={0} value={"deactive"}>
              {"DEACTIVE"}
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "orangered" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Roll Number
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Username
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Fullname
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Created Date
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Returned Date
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Details
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th">{item.id}</TableCell>
                <TableCell>{item.studentRollNumber}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell
                  sx={{ color: item.status === "active" ? "green" : "red" }}
                >
                  {item.status.toUpperCase()}
                </TableCell>
                <TableCell>{item.updatedAt}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setSelectedUser(item);
                      setOpenUserDetails(true);
                    }}
                    variant="contained"
                  >
                    <RemoveRedEye />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setSelectedUser(item);
                      setOpenUserDetails(true);
                    }}
                    variant="contained"
                  >
                    <RemoveRedEye />
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
      {openPayment && (
        <Payment
          open={openPayment}
          setOpen={setOpenPayment}
          bedRequestId={selectedUser.id}
        />
      )}
      {openUserDetails && (
        <BedDetails
          open={openUserDetails}
          setOpen={setOpenUserDetails}
          bed={selectedUser}
        />
      )}
    </Box>
  );
}
