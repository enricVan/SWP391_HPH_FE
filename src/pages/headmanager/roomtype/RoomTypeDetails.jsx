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
const RoomTypeDetails = ({ open, handleClose, roomtypeDetails }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>RoomType Details</DialogTitle>
      <DialogContent>
        {/* Display roomtype details here */}
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>ID:</TableCell>
                <TableCell>{roomtypeDetails.id}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>RoomTypename:</TableCell>
                <TableCell>{roomtypeDetails.roomtypename}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Fullname:</TableCell>
                <TableCell>{roomtypeDetails.fullName}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Role:</TableCell>
                <TableCell>{roomtypeDetails.role.name}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Email:</TableCell>
                <TableCell>{roomtypeDetails.email}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Gender:</TableCell>
                <TableCell>{roomtypeDetails.gender}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Date of birth:</TableCell>
                <TableCell>{roomtypeDetails.dateOfBirth}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Phone:</TableCell>
                <TableCell>{roomtypeDetails.phone}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Address:</TableCell>
                <TableCell>{roomtypeDetails.address}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Status:</TableCell>
                <TableCell>{roomtypeDetails.status}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>createdAt:</TableCell>
                <TableCell>{roomtypeDetails.createdAt}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>updatedAt:</TableCell>
                <TableCell>{roomtypeDetails.updatedAt}</TableCell>
              </TableRow>

              {/* Add more roomtype details in a similar format */}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Add more roomtype details as needed */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoomTypeDetails;
