// import Searchbar from "../../../components/Searchbar";
// import SearchIcon from "@mui/icons-material/Search";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { privateAxios } from '../../../../service/axios';
import { ArrowForward } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPic } from '../../../../features/picSlice';
import picService from '../../../../service/picService';
// const { Search, SearchIconWrapper, StyledInputBase } = Searchbar;
const MainInfo = ({ student }) => {
  return (
    <>
      <Table>
        <TableBody>
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
        </TableBody>
      </Table>
    </>
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
          {/* <TableRow sx={{ backgroundColor: '#fff' }}>
            <TableCell
              colSpan={2}
              align='center'
              sx={{ fontWeight: 'bolder', fontSize: '24px' }}
            >
              Room {student.roomName ? student.roomName : ''}
            </TableCell>
          </TableRow> */}
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
  const dispatch = useDispatch();
  const [picUrl, setPicUrl] = useState(null);
  const { rollNumber } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [showNext, setShowNext] = useState(false);
  const fetchStudentData = async () => {
    const res = await privateAxios.get(`student/${rollNumber}`);
    setStudent(res.data);
    // dispatch(getUserPic(res.data.userDto.id));
    const avatar = await picService.getUserPic(res.data.userDto.id);
    setPicUrl(avatar);
    return res;
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
                    sx={{
                      width: '100%',
                      height: 400,
                      marginRight: 4,
                      mb: 5,
                    }}
                    src={picUrl}
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
