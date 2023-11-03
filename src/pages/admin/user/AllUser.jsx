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
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import { deepOrange, orange } from "@mui/material/colors";
import { AddCircle, Edit } from "@mui/icons-material";
import AddUser from "./form/AddUser";

export default function AllUser() {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [checked, setChecked] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reload, setReload] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [openUserDetails, setOpenUserDetails] = useState(false);
  const [partialName, setPartialName] = useState("");
  const [roleId, setRoleId] = useState(0);
  const [roles, setRoles] = useState([]);
  const [selectedStatus, SetSelectedStatus] = useState("all");
  const [openAdd, setOpenAdd] = useState(false);

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
      <Box textAlign={"right"} mb={2}>
        <Button
          onClick={() => setOpenAdd(true)}
          variant="contained"
          endIcon={<AddCircle />}
        >
          Create
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "orangered" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Username
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Activate
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Created Date
              </TableCell>
              <TableCell
                colSpan={2}
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Settings
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th">{item.id}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <FormControl>
                    <Switch
                      checked={checked}
                      onChange={(e) => setChecked(e.target.checked)}
                    />
                  </FormControl>
                </TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setSelectedUser(item);
                      setOpenUserDetails(true);
                    }}
                    variant="contained"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setSelectedUser(item);
                      setOpenUserDetails(true);
                    }}
                    variant="contained"
                  >
                    <Delete />
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
      {openAdd && <AddUser open={openAdd} setOpen={setOpenAdd} />}
    </Box>
  );
}
