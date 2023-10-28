import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { RemoveRedEye } from "@mui/icons-material";
import { privateAxios } from "../../../service/axios";
import { IconButton } from "@mui/material";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function PaymentHistory() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [paymentList, setPaymentList] = useState([]);
  const fetchPayment = async () => {
    const res = await privateAxios.get(`payment/${user.id}`);
    setPaymentList(res.data.data);
    console.log(res.data.data);
  };
  useEffect(() => {
    fetchPayment();
  }, []);
  return (
    <Box padding={1}>
      <Box display={"flex"} sx={{ justifyContent: "space-between" }}>
        <h1 style={{ marginLeft: "8px" }}>Payment History</h1>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentList.map((payment) => (
              <TableRow
                key={payment.paymentId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {payment.paymentId}
                </TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{payment.status}</TableCell>
                <TableCell>{payment.createdAt}</TableCell>
                <TableCell>
                  <IconButton>
                    <RemoveRedEye />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
