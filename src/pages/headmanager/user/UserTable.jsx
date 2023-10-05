/* eslint-disable react/prop-types */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({ users }) {
  return (
    <TableContainer component={Paper} sx={{ padding: "15px" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ bgcolor: "orangered" }}>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell align="center">Role</TableCell>
            <TableCell align="center">Username</TableCell>
            {/* <TableCell align="center">Fullname</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">Date Of Birth</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Avatar Image</TableCell> */}
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Created At</TableCell>
            <TableCell align="center">Updated At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{user.userId}</TableCell>
              <TableCell align="center">{user.role.roleName}</TableCell>
              <TableCell align="center">{user.username}</TableCell>
              {/* <TableCell align="center">{user.fullName}</TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">{user.gender}</TableCell>
              <TableCell align="center">{user.dateOfBirth}</TableCell>
              <TableCell align="center">{user.phone}</TableCell>
              <TableCell align="center">{user.address}</TableCell>
              <TableCell align="center">{user.avatarImage}</TableCell> */}
              <TableCell align="center">{user.status}</TableCell>
              <TableCell align="center">{user.createdAt}</TableCell>
              <TableCell align="center">{user.updatedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
