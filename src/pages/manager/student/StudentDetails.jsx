import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Table,
  TableCell,
  TableRow,
} from "@mui/material";
// import Searchbar from "../../../components/Searchbar";
// import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import avatarLong from "../../../assets/image/avatar.png";
import avatarTuan from "../../../assets/image/avatar-1.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { privateAxios } from "../../../service/axios";

// const { Search, SearchIconWrapper, StyledInputBase } = Searchbar;

export default function StudentDetail() {
  const { rollNumber } = useParams();
  console.log(rollNumber);
  const [student, setStudent] = useState({});
  const fetchStudentData = async () => {
    const res = await privateAxios.get(`student/${rollNumber}`);
    setStudent(res.data);
  };

  useEffect(() => {
    fetchStudentData();
  }, []);
  return (
    <Box p={2}>
      <h1 style={{ marginLeft: "8px", textAlign: "center" }}>Student Detail</h1>
      {/* Search box start */}
      {/* <Box flex>
        <Search sx={{ display: "inline-block" }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            // onChange={(e) => {
            //   setRollnumber(e.target.value);
            // }}
            placeholder="Search by Rollnumber…"
            inputProps={{ "aria-label": "search" }}
            sx={{
              width: "400px",
              border: "5px solid orangered",
              borderRadius: "30px",
            }}
          />
        </Search>
      </Box> */}
      {/* Search box end */}

      <Grid container spacing={4}>
        {/* Student Card start */}
        <Grid item xs={9} md={9}>
          <Card>
            <CardContent>
              <div style={{ display: "flex" }}>
                <Avatar
                  sx={{ width: 350, height: 400, marginRight: 4 }}
                  src={rollNumber == "HE173334" ? avatarTuan : avatarLong}
                />
                <Table>
                  <TableRow>
                    <TableCell align="right">Roll Number</TableCell>
                    <TableCell align="right">{student.rollNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">
                      {student.userDto?.fullName}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align="right">Parent Name</TableCell>
                    <TableCell align="right">{student.parentName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">Gender</TableCell>
                    <TableCell align="right">
                      {student.userDto?.gender}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">Date of birth</TableCell>
                    <TableCell align="right">{student.userDto?.dob}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">Phone Number</TableCell>
                    <TableCell align="right">
                      {student.userDto?.phone}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">
                      {student.userDto?.email}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">Address</TableCell>
                    <TableCell align="right">
                      {student.userDto?.address}
                    </TableCell>
                  </TableRow>
                </Table>
              </div>
            </CardContent>
          </Card>
        </Grid>
        {/* Student Card end */}
        <Grid item xs={3} md={3}>
          <Button
            variant="contained"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            View payment
          </Button>
          <br />
          <Button
            variant="contained"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            View request
          </Button>
          <br />
          <Button
            variant="contained"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            View penalty ticket
          </Button>
          <br />
        </Grid>
      </Grid>
    </Box>
  );
}
