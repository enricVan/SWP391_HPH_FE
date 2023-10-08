import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
/* eslint-disable react/prop-types */
const UserDetails = ({ open, handleClose, userDetails }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent>
        {/* Display user details here */}
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>ID:</TableCell>
                <TableCell>{userDetails.id}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Username:</TableCell>
                <TableCell>{userDetails.username}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Fullname:</TableCell>
                <TableCell>{userDetails.fullName}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Role:</TableCell>
                <TableCell>{userDetails.role.name}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Email:</TableCell>
                <TableCell>{userDetails.email}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Gender:</TableCell>
                <TableCell>{userDetails.gender}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Date of birth:</TableCell>
                <TableCell>{userDetails.dateOfBirth}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Phone:</TableCell>
                <TableCell>{userDetails.phone}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Address:</TableCell>
                <TableCell>{userDetails.address}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Status:</TableCell>
                <TableCell>{userDetails.status}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>createdAt:</TableCell>
                <TableCell>{userDetails.createdAt}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>updatedAt:</TableCell>
                <TableCell>{userDetails.updatedAt}</TableCell>
              </TableRow>

              {/* Add more user details in a similar format */}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Add more user details as needed */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetails;
