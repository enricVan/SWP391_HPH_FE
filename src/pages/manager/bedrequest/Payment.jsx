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

  const checkPaid = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    await privateAxios.put(
      `payment/${payment.paymentId}/check?managerId=${user.managerId}`
    );
    window.location.reload();
  };

  const handleClickCheckPaid = () => {
    checkPaid();
  };

  function formatPrice(price) {
    price = (price + "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    price = price + " VND";

    return price;
  }
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>
        <div
          style={{
            backgroundColor: "#034EA2",
            borderRadius: "8px",
            padding: "5px",
            fontWeight: "bold",
            color: "#fff",
            textAlign: "center",
          }}
        >
          Payment
        </div>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={3} sx={{ fontWeight: "bolder" }}>
            ID:
          </Grid>
          <Grid item xs={9}>
            {payment.paymentId}
          </Grid>
          <Grid item xs={3} sx={{ fontWeight: "bolder" }}>
            Amount:
          </Grid>
          <Grid item xs={9}>
            {formatPrice(payment.amount)}
          </Grid>
          <Grid item xs={3} sx={{ fontWeight: "bolder" }}>
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
                textTransform: "uppercase",
                fontWeight: "bold",
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
              disabled={payment.status === "paid"}
              onClick={handleClickCheckPaid}
            >
              <CheckCircleIcon sx={{ color: "#088803" }} />
            </IconButton>
          </Grid>
          <Grid item xs={3} sx={{ fontWeight: "bolder" }}>
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
