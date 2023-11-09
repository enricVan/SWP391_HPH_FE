import React, { useEffect, useState } from 'react';
import { privateAxios } from '../../../service/axios';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import AddCircle from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { open } from '../../../features/userFormSlice';
import Searchbar from '../../../components/Searchbar';
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material';
import ManagerForm from './form/ManagerForm';
const { Search, SearchIconWrapper, StyledInputBase } = Searchbar;
export default function ManagerUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openAddManager } = useSelector((state) => state.userForm);
  const [openEdit, setOpenEdit] = useState(false);
  const [managers, setManagers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState('');
  const fetchManager = async () => {
    const res = await privateAxios.get(`manager?rollNumber=${search}`);
    setManagers(res.data.data);

    setTotalPages(res.totalPages);
  };
  useEffect(() => {
    fetchManager();
    setCurrentPage(1);
  }, [search, reload]);
  useEffect(() => {
    fetchManager();
  }, [currentPage]);
  return (
    <Box padding={1}>
      <Search sx={{ display: 'inline-block' }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onChange={(e) => {
            setTimeout(() => {
              setSearch(e.target.value);
            }, 700)();
          }}
          placeholder='Roll Number...'
          inputProps={{ 'aria-label': 'search' }}
          sx={{
            border: '5px solid orangered',
            borderRadius: '30px',
          }}
        />
      </Search>
      <Box textAlign={'right'} mb={2}>
        <Button
          onClick={() => {
            dispatch(open('ADD_MANAGER'));
          }}
          variant='contained'
          endIcon={<AddCircle />}
        >
          Create
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'orangered' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                ID
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                Description
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                FullName
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                Created Date
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                Updated Date
              </TableCell>
              <TableCell
                colSpan={2}
                sx={{ color: 'white', fontWeight: 'bold' }}
              >
                Settings
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {managers.map((manager) => (
              <TableRow key={manager.id}>
                <TableCell component='th'>{manager.id}</TableCell>
                <TableCell>{manager.rollNumber}</TableCell>
                <TableCell>{manager.userDto.fullName}</TableCell>
                <TableCell>{manager.userDto.address}</TableCell>
                <TableCell>{manager.createdAt}</TableCell>
                <TableCell>{manager.updateAt}</TableCell>
                <TableCell>
                  <IconButton onClick={() => {}} variant='contained'>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => {}} variant='contained'>
                    <Delete />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      navigate(`${manager.rollNumber}`);
                    }}
                    variant='contained'
                  >
                    <RemoveRedEye />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        color='primary'
        count={totalPages}
        page={currentPage}
        onChange={(e, value) => {
          setCurrentPage(value);
        }}
        sx={{
          justifyContent: 'center',
          '& .MuiPagination-ul': {
            justifyContent: 'center',
          },
          '&& .Mui-selected': {
            bgcolor: 'orangered',
          },
          '& .MuiPaginationItem-root:hover': {
            bgcolor: 'rgba(255,69,0,0.8)',
          },
          '&& .Mui-selected:hover': {
            bgcolor: 'rgba(255,69,0,0.8)',
          },
          my: 4,
        }}
      />
      {openAddManager && <ManagerForm reload={reload} setReload={setReload} />}
      {openEdit && (
        <EditUser
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          user={selectedUser}
        />
      )}
    </Box>
  );
}
