import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Table,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
// import Searchbar from "../../../components/Searchbar";
// import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import avatarLong from "../../../../assets/image/avatar.png";
import avatarTuan from "../../../../assets/image/avatar-1.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { privateAxios } from "../../../../service/axios";

// const { Search, SearchIconWrapper, StyledInputBase } = Searchbar;

export default function StudentDetail() {
  const { rollNumber } = useParams();
  const navigate = useNavigate();
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
      <Button
        onClick={() => {
          navigate("../student");
        }}
        variant="contained"
        startIcon={<ArrowBackIcon />}
      >
        Back
      </Button>
      <Grid container spacing={4}>
        {/* Student Card start */}
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent>
              <Grid container>
                <Grid item xs={12} md={5}>
                  <Avatar
                    sx={{ width: "100%", height: 400, marginRight: 4, mb: 5 }}
                    src={rollNumber == "HE173334" ? avatarTuan : avatarLong}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 20,
                    }}
                  >
                    <Tooltip title="Account">
                      <Button variant="contained" sx={{ width: "35%" }}>
                        <AccountCircleIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Room">
                      <Button variant="contained" sx={{ width: "35%" }}>
                        <OtherHousesIcon />
                      </Button>
                    </Tooltip>
                  </div>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Table>
                    <TableRow>
                      <TableCell align="right" sx={{ fontWeight: "bolder" }}>
                        Roll Number
                      </TableCell>
                      <TableCell align="right">{student.rollNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right" sx={{ fontWeight: "bolder" }}>
                        Name
                      </TableCell>
                      <TableCell align="right">
                        {student.userDto?.fullName}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell align="right" sx={{ fontWeight: "bolder" }}>
                        Parent Name
                      </TableCell>
                      <TableCell align="right">{student.parentName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right" sx={{ fontWeight: "bolder" }}>
                        Gender
                      </TableCell>
                      <TableCell align="right">
                        {student.userDto?.gender}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right" sx={{ fontWeight: "bolder" }}>
                        Date of birth
                      </TableCell>
                      <TableCell align="right">
                        {student.userDto?.dob}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right" sx={{ fontWeight: "bolder" }}>
                        Phone Number
                      </TableCell>
                      <TableCell align="right">
                        {student.userDto?.phone}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell align="right" sx={{ fontWeight: "bolder" }}>
                        Email
                      </TableCell>
                      <TableCell align="right">
                        {student.userDto?.email}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right" sx={{ fontWeight: "bolder" }}>
                        Address
                      </TableCell>
                      <TableCell align="right">
                        {student.userDto?.address}
                      </TableCell>
                    </TableRow>
                  </Table>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        {/* Student Card end */}
      </Grid>
    </Box>
  );
}
