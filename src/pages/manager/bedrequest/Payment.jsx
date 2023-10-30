/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { privateAxios } from "../../../service/axios";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Payment({ open, setOpen, bedRequestId }) {
  const [payment, setPayment] = useState({});
  const fetchPayment = async () => {
    const res = await privateAxios.get(`bed-request/${bedRequestId}/payment`);
    console.log(res);
    if (res.data) {
      setPayment(res.data);
    }
  };
  useEffect(() => {
    fetchPayment();
  }, []);
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Payment</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            ID:
          </Grid>
          <Grid item xs={9}>
            {payment.paymentId}
          </Grid>
          <Grid item xs={3}>
            Amount:
          </Grid>
          <Grid item xs={9}>
            {payment.amount} đ
          </Grid>
          <Grid item xs={3}>
            Status:
          </Grid>
          <Grid item xs={9}>
            <span
              style={{
                color:
                  payment.status === "expired"
                    ? "red"
                    : payment.status === "pending"
                    ? "#FFC300 "
                    : "green",
              }}
            >
              {payment.status} &nbsp; &nbsp;
            </span>
            <IconButton
              variant="contained"
              sx={{
                border: "1px solid green",
                color: "#56E90D",
                "&:hover": { color: "#088803" },
                display: payment.status === "expired" ? "none" : "",
              }}
            >
              <CheckCircleIcon />
            </IconButton>
          </Grid>
          <Grid item xs={3}>
            Expiration Date:
          </Grid>
          <Grid item xs={9}>
            {payment.expirationDate}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
