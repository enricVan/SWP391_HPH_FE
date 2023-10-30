/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

export default function BookedStatusModal({
  status,
  setStatus,
  open,
  setOpen,
}) {
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (status) {
      setMessage("Your booked request have been received!");
    } else {
      setMessage("Failed to send booked request");
    }
  }, [reload]);
  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          <p style={{ color: status ? "green" : "red" }}>
            {status ? "Booked Success" : "Booked Failed"}
          </p>
        </DialogTitle>
        <DialogContent>{message}</DialogContent>
      </Dialog>
    </div>
  );
}
