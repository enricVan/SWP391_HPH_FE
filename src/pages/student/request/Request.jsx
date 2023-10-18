import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { privateAxios } from "../../../service/axios";
export default function Request() {
  const [open, setOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [requestTypeId, setRequestTypeId] = useState("");
  const [types, setTypes] = useState([]);
  const [inputText, setInputText] = useState("");
  const [reload, setReload] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState({
    successOpen: false,
    vertical: "bottom",
    horizontal: "right",
  });
  const { vertical, horizontal, successOpen } = snackBarOpen;
  const handleInputContent = (e) => {
    setInputText(e.target.value);
    console.log(e.target.value);
  };
  const handleSendRequest = () => {
    console.log(inputText);
    const request = {
      student: {
        studentId: 1,
      },
      studentRequestType: {
        studentRequestTypeId: requestTypeId,
      },
      requestContent: inputText,
    };
    privateAxios.post("request-application", request).then(() => {
      setOpen(!open);
      setInputText("");
      setSnackBarOpen({ ...snackBarOpen, successOpen: true });
      setReload(!reload);
    });
  };
  const handleChange = (e) => {
    setRequestTypeId(e.target.value);
    console.log(e.target.value);
  };
  const fetchData = async () => {
    const res1 = await privateAxios.get("request-application");
    if (res1 && res1.data) {
      setRequests(res1.data);
    }
    const res2 = await privateAxios.get("request-application-type");
    if (res2 && res2.data) {
      setTypes(res2.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, [reload]);
  return (
    <Box padding={1}>
      <Box display={"flex"} sx={{ justifyContent: "space-between" }}>
        <h1 style={{ marginLeft: "8px" }}>Requests History</h1>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          startIcon={<AddCircleOutlineIcon />}
          sx={{ bgcolor: "orangered" }}
        >
          Create Request
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          marginTop: 2,
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Request Type</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow
                key={request.requestApplicationId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {request.requestApplicationId}
                </TableCell>
                <TableCell>
                  {request.requestApplicationType.requestApplicationTypeName}
                </TableCell>
                <TableCell sx={{ whiteSpace: "pre" }}>
                  {request.createdAt}
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                  }}
                >
                  {request.requestContent}
                </TableCell>
                <TableCell
                  sx={{
                    ...(request.status === "Pending" && {
                      color: "#ccb01c",
                    }),
                    ...(request.status === "Denied" && {
                      color: "red",
                    }),
                    ...(request.status === "Resolved" && {
                      color: "green",
                    }),
                  }}
                >
                  {request.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Request</DialogTitle>
        <Box p={3}>
          <FormControl fullWidth>
            <InputLabel id="requestType-label">Request Type</InputLabel>
            <Select
              id="select"
              label="Request Type"
              value={requestTypeId}
              labelId="requestType-label"
              onChange={handleChange}
            >
              {types.map((type) => {
                return (
                  <MenuItem
                    key={type.requestApplicationTypeId}
                    value={type.requestApplicationTypeName}
                  >
                    {type.requestApplicationTypeName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <DialogContent>
          <DialogContentText>
            To send your request, please enter your description of what you want
            to improve.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="My request"
            type="email"
            fullWidth
            multiline
            variant="standard"
            value={inputText}
            onChange={handleInputContent}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            sx={{ color: "orangered" }}
          >
            Cancel
          </Button>
          <Button onClick={handleSendRequest} sx={{ color: "orangered" }}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ width: 500 }}>
        <Snackbar
          autoHideDuration={3000}
          anchorOrigin={{ vertical, horizontal }}
          open={successOpen}
          onClose={() => {
            setSnackBarOpen({ ...snackBarOpen, successOpen: false });
          }}
          message="Send Request Success"
          key={vertical + horizontal}
          ContentProps={{
            sx: {
              bgcolor: "green",
            },
          }}
        />
      </Box>
    </Box>
  );
}
