import React, { useEffect, useState } from "react";
import { privateAxios } from "../../../service/axios";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import AddCircle from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { open } from "../../../features/userFormSlice";
import StudentForm from "./form/StudentForm";
import Searchbar from "../../../components/Searchbar";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
const { Search, SearchIconWrapper, StyledInputBase } = Searchbar;
export default function StudentUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openAddStudent } = useSelector((state) => state.userForm);
  const [students, setStudents] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const fetchStudent = async () => {
    const res = await privateAxios.get(`student?rollNumber=${search}`);
    setStudents(res.data.data);
    setCurrentPage(1);
    setTotalPages(res.totalPages);
  };
  useEffect(() => {
    fetchStudent();
  }, [search]);
  return (
    <Box padding={1}>
      <Search sx={{ display: "inline-block" }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onChange={(e) => {
            setTimeout(() => {
              setSearch(e.target.value);
            }, 700)();
          }}
          placeholder="Roll Number..."
          inputProps={{ "aria-label": "search" }}
          sx={{
            border: "5px solid orangered",
            borderRadius: "30px",
          }}
        />
      </Search>
      <Box textAlign={"right"} mb={2}>
        <Button
          onClick={() => {
            dispatch(open("ADD_STUDENT"));
          }}
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
                Roll Number
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                FullName
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Address
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Created Date
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Updated Date
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
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell component="th">{student.id}</TableCell>
                <TableCell>{student.rollNumber}</TableCell>
                <TableCell>{student.userDto.fullName}</TableCell>
                <TableCell>{student.userDto.address}</TableCell>
                <TableCell>{student.createdAt}</TableCell>
                <TableCell>{student.updateAt}</TableCell>
                <TableCell>
                  <IconButton onClick={() => {}} variant="contained">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => {}} variant="contained">
                    <Delete />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      navigate(`${student.rollNumber}`);
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
      {openAddStudent && <StudentForm />}
    </Box>
  );
}
