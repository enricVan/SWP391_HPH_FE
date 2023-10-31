import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";

export default function BedDetails({ open, setOpen, bed }) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Bed Detail</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            Name:
          </Grid>
          <Grid item xs={9}>
            {bed.bedName}
          </Grid>
          <Grid item xs={3}>
            Dorm:
          </Grid>
          <Grid item xs={9}>
            {bed.buildingName}
          </Grid>
          <Grid item xs={3}>
            Room:
          </Grid>
          <Grid item xs={9}>
            {bed.roomName}
          </Grid>
          <Grid item xs={3}>
            Room Type:
          </Grid>
          <Grid item xs={9}>
            {bed.roomTypeName}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
