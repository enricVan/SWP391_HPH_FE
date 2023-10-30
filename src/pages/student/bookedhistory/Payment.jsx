import React, { useEffect, useState } from "react";
import { privateAxios } from "../../../service/axios";
import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";

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
            {payment.amount}
          </Grid>
          <Grid item xs={3}>
            Status:
          </Grid>
          <Grid
            item
            xs={9}
            sx={{
              color:
                payment.status === "expired"
                  ? "red"
                  : payment.status === "pending"
                  ? "#FFC300 "
                  : "green",
            }}
          >
            {payment.status}
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
