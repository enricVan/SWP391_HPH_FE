import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SingleBedIcon from "@mui/icons-material/SingleBed";

const bedList = [
  { id: 1, name: "Bed1", status: "vacant" },
  { id: 2, name: "Bed2", status: "vacant" },
  { id: 3, name: "Bed3", status: "vacant" },
  { id: 4, name: "Bed4", status: "occupied" },
  { id: 5, name: "Bed4", status: "occupied" },
  { id: 6, name: "Bed4", status: "occupied" },
];

export default function Test() {
  const [open, setOpen] = useState(false);
  const [selectedBed, setSelectedBed] = useState(null);

  const handleBedClick = (bed) => {
    if (bed.status !== "occupied") {
      setSelectedBed(bed);
    }
  };

  const handleConfirm = () => {
    // Handle the confirmation action here
    if (selectedBed) {
      alert(`Confirmed: ${selectedBed.name}`);
      // You can perform further actions here, e.g., submit data or update the state.
    }
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Bed Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto", // Enable vertical scrolling
            maxHeight: "80vh", // Set a maximum height to enable scrolling
          }}
        >
          <Grid container spacing={2} sx={{ xs: 12, md: 4 }}>
            {bedList.map((bed) => (
              <Grid item xs={12} md={3} textAlign={"center"} key={bed.id}>
                {bed.name}
                <IconButton
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fill: bed.status === "vacant" ? "currentColor" : "red",
                      width: "50px",
                      height: "50px",
                    },
                    cursor:
                      bed.status === "occupied" || bed.status === "reserved"
                        ? "not-allowed"
                        : "pointer",
                    "&.selected": {
                      "& .MuiSvgIcon-root": {
                        fill: "green",
                      },
                    },
                  }}
                  className={selectedBed === bed ? "selected" : ""}
                  onClick={() => handleBedClick(bed)}
                >
                  <SingleBedIcon />
                </IconButton>
              </Grid>
            ))}
          </Grid>
          {selectedBed && (
            <div>
              <Typography variant="h6">
                Selected Bed: {selectedBed.name}
              </Typography>
              <Typography variant="body1">
                Status: {selectedBed.status}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleConfirm}
              >
                Confirm
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
