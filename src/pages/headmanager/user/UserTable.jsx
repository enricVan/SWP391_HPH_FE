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
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Fullname</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Date Of Birth</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Avatar Image</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">Updated At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{user.userId}</TableCell>
              <TableCell align="right">{user.role.roleName}</TableCell>
              <TableCell align="right">{user.username}</TableCell>
              <TableCell align="right">{user.fullName}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.gender}</TableCell>
              <TableCell align="right">{user.dateOfBirth}</TableCell>
              <TableCell align="right">{user.phone}</TableCell>
              <TableCell align="right">{user.address}</TableCell>
              <TableCell align="right">{user.avatarImage}</TableCell>
              <TableCell align="right">{user.status}</TableCell>
              <TableCell align="right">{user.createdAt}</TableCell>
              <TableCell align="right">{user.updatedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
