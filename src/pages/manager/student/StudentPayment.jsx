import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { privateAxios } from "../../../service/axios";
import { Pagination } from "@mui/material";
import { useParams } from "react-router-dom";

export default function StudentPayment() {
  const { rollNumber } = useParams();
  console.log(rollNumber);
  const [payments, setPayments] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    try {
      const res = await privateAxios.get(
        `payment?pageNo=${currentPage - 1}&rollNumber=${rollNumber}`
      );
      console.log(res.config.url);
      console.log(res.data);
      setPayments(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);
  return (
    <Box padding={2}>
      <Box>
        <div
          style={{
            backgroundColor: "#034EA2",
            padding: "6px",
            borderRadius: "15px",
            marginBottom: "10px",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#fff",
              textTransform: "uppercase",
              margin: "0",
            }}
          >
            Payment of {rollNumber}
          </h1>
        </div>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#FF5800" }}>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Created By</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Checked by</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Amount</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Created Date</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Updated Date</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow
                key={payment.bedRequestId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {payment.paymentId}
                </TableCell>
                <TableCell>{payment.studentRollNumber}</TableCell>
                <TableCell>
                  {payment.managerId ? (
                    <span>
                      {payment.managerName} (ID: {payment.managerId})
                    </span>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>{payment.amount} VNĐ</TableCell>
                <TableCell>{payment.createdAt}</TableCell>
                <TableCell>{payment.createdAt}</TableCell>
                <TableCell>
                  <span
                    style={{
                      color:
                        payment.status === "expired"
                          ? "red"
                          : payment.status === "pending"
                          ? "#FFC300 "
                          : "green",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                    }}
                  >
                    {payment.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        color="primary"
        count={totalPages}
        page={currentPage}
        onChange={(e, value) => {
          setCurrentPage(value);
        }}
        sx={{
          justifyContent: "center",
          "& .MuiPagination-ul": {
            justifyContent: "center",
          },
          "&& .Mui-selected": {
            bgcolor: "orangered",
          },
          "& .MuiPaginationItem-root:hover": {
            bgcolor: "rgba(255,69,0,0.8)",
          },
          "&& .Mui-selected:hover": {
            bgcolor: "rgba(255,69,0,0.8)",
          },
          my: 4,
        }}
      />
    </Box>
  );
}