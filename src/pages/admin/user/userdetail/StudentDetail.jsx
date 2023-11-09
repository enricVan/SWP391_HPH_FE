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
} from '@mui/material';
// import Searchbar from "../../../components/Searchbar";
// import SearchIcon from "@mui/icons-material/Search";
import Button from '@mui/material/Button';
import avatarLong from '../../../../assets/image/avatar.png';
import avatarTuan from '../../../../assets/image/avatar-1.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { privateAxios } from '../../../../service/axios';
import { ArrowForward } from '@mui/icons-material';

// const { Search, SearchIconWrapper, StyledInputBase } = Searchbar;
const MainInfo = ({ student }) => {
  return (
    <Table>
      <TableRow>
        <TableCell align='right' sx={{ fontWeight: 'bolder' }}>
          Roll Number
        </TableCell>
        <TableCell align='right'>{student.rollNumber}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align='right' sx={{ fontWeight: 'bolder' }}>
          Name
        </TableCell>
        <TableCell align='right'>{student.userDto?.fullName}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell align='right' sx={{ fontWeight: 'bolder' }}>
          Parent Name
        </TableCell>
        <TableCell align='right'>{student.parentName}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align='right' sx={{ fontWeight: 'bolder' }}>
          Gender
        </TableCell>
        <TableCell align='right'>{student.userDto?.gender}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align='right' sx={{ fontWeight: 'bolder' }}>
          Date of birth
        </TableCell>
        <TableCell align='right'>{student.userDto?.dob}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align='right' sx={{ fontWeight: 'bolder' }}>
          Phone Number
        </TableCell>
        <TableCell align='right'>{student.userDto?.phone}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align='right' sx={{ fontWeight: 'bolder' }}>
          Address
        </TableCell>
        <TableCell align='right'>{student.userDto?.address}</TableCell>
      </TableRow>
    </Table>
  );
};
const SideInfo = ({ student }) => {
  return (
    <>
      <Box paddingLeft={1}>
        <Table sx={{ borderRadius: '20px' }}>
          <TableRow sx={{ backgroundColor: '#fff' }}>
            <TableCell
              colSpan={2}
              align='center'
              sx={{ fontWeight: 'bolder', fontSize: '24px' }}
            >
              Account
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='right' sx={{ fontWeight: 'bolder' }}>
              ID
            </TableCell>
            <TableCell align='left'>{student.userDto.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='right' sx={{ fontWeight: 'bolder' }}>
              User Name
            </TableCell>
            <TableCell align='left'>{student.userDto?.username}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='right' sx={{ fontWeight: 'bolder' }}>
              Status
            </TableCell>
            <TableCell
              align='left'
              sx={{
                color: student.userDto?.status === 'active' ? 'green' : 'red',
              }}
            >
              {student.userDto?.status}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align='right' sx={{ fontWeight: 'bolder' }}>
              Email
            </TableCell>
            <TableCell align='left'>{student.userDto?.email}</TableCell>
          </TableRow>
        </Table>
      </Box>
      <Box>
        <Table sx={{ borderRadius: '20px' }}>
          <TableRow sx={{ backgroundColor: '#fff' }}>
            <TableCell
              colSpan={2}
              align='center'
              sx={{ fontWeight: 'bolder', fontSize: '24px' }}
            >
              Room {student.roomName ? student.roomName : ''}
            </TableCell>
          </TableRow>
          {student.roomName && (
            <>
              <TableRow>
                <TableCell align='right' sx={{ fontWeight: 'bolder' }}>
                  Building
                </TableCell>
                <TableCell align='right'>{student.buildingName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='right' sx={{ fontWeight: 'bolder' }}>
                  Floor
                </TableCell>
                <TableCell align='right'>{student.floor}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='right' sx={{ fontWeight: 'bolder' }}>
                  Room Type
                </TableCell>
                <TableCell align='right'>{student.roomTypeName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='right' sx={{ fontWeight: 'bolder' }}>
                  Bed
                </TableCell>
                <TableCell align='right'>{student.bedName}</TableCell>
              </TableRow>
            </>
          )}
        </Table>
      </Box>
    </>
  );
};
export default function StudentDetail() {
  const { rollNumber } = useParams();
  const navigate = useNavigate();
  console.log(rollNumber);
  const [student, setStudent] = useState({});
  const [showNext, setShowNext] = useState(false);
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
          navigate('../student');
        }}
        variant='contained'
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
                    sx={{ width: '100%', height: 400, marginRight: 4, mb: 5 }}
                    src={rollNumber == 'HE173334' ? avatarTuan : avatarLong}
                  />
                </Grid>
                <Grid item xs={12} md={7}>
                  {!showNext ? (
                    <div style={{ textAlign: 'right' }}>
                      <ArrowForward
                        onClick={() => setShowNext(true)}
                        sx={{ cursor: 'pointer' }}
                      />
                    </div>
                  ) : (
                    <div>
                      <ArrowBackIcon
                        onClick={() => setShowNext(false)}
                        sx={{ cursor: 'pointer' }}
                      />
                    </div>
                  )}
                  {!showNext ? (
                    <MainInfo student={student} />
                  ) : (
                    <SideInfo student={student} />
                  )}
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
