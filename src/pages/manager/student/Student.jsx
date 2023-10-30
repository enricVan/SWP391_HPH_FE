import {
  Box,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import Searchbar from "../../../components/Searchbar";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { privateAxios } from "../../../service/axios";
import { Link } from "react-router-dom";

const { Search, SearchIconWrapper, StyledInputBase } = Searchbar;

function Student() {
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchStudents = async () => {
    const res = await privateAxios.get("student");
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);
  return (
    <Box p={2}>
      <h1 style={{ marginLeft: "8px", textAlign: "center" }}>Student</h1>
      <Grid container spacing={2}>
        {/* Search box start */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px auto",
            width: "80%",
          }}
        >
          <Search sx={{ display: "inline-block" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by Rollnumber…"
              inputProps={{ "aria-label": "search" }}
              sx={{
                width: "400px",
                border: "5px solid orangered",
                borderRadius: "30px",
              }}
            />
          </Search>
        </Box>
        {/* Search box end */}

        <Grid container p={4} md={12} spacing={2}>
          {/* Filter start */}
          {/* <Grid item md={4}>
            <FormControl sx={{ width: "80%" }}>
              <InputLabel id="building-label">Building</InputLabel>
              <Select
                labelId="building-label"
                label="Building"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              >
                <MenuItem value="all">OK</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={4}>
            <FormControl sx={{ width: "80%" }}>
              <InputLabel id="building-label">Building</InputLabel>
              <Select
                labelId="building-label"
                label="Building"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              >
                <MenuItem value="all">OK</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={4}>
            <FormControl sx={{ width: "80%" }}>
              <InputLabel id="building-label">Building</InputLabel>
              <Select
                labelId="building-label"
                label="Building"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              >
                <MenuItem value="all">OK</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
          {/* Filter end */}
        </Grid>
        <Grid item md={12}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Rollnumber</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>View Detail</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students &&
                  students
                    .filter((student) =>
                      student.rollNumber
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                    )
                    .map((student) => (
                      <TableRow key={student.studentId}>
                        <TableCell>{student.rollNumber}</TableCell>
                        <TableCell>Tên</TableCell>
                        <TableCell>Giới tính</TableCell>
                        <TableCell>
                          <Link to={`${student.rollNumber}`}>
                            <IconButton>
                              <VisibilityIcon />
                            </IconButton>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Student;
