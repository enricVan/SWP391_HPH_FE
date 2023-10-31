/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import { privateAxios } from "../../../service/axios";
import MessageModal from "./MessageModal";

export default function BedModal({
  roomId,
  open,
  setOpen,
  studentId,
  semesterId,
}) {
  const [bedList, setBedList] = useState([]);
  const [selectedBed, setSelectedBed] = useState(null);
  const [bookedStatus, setBookedStatus] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [reload, setReload] = useState(false);
  const handleBedClick = (bed) => {
    if (bed.status.toLowerCase() === "vacant") {
      setSelectedBed(bed);
    }
  };

  const handleConfirm = (bed) => {
    // Handle the confirmation action here
    if (selectedBed && confirm(`Confirmed Booking: ${selectedBed.bedName}?`)) {
      privateAxios
        .post(
          `bed-request/book?studentId=${studentId}&bedId=${bed.id}&semesterId=${semesterId}`
        )
        .then((response) => {
          console.log(response);
          if (response.data.bedRequestId) {
            setBookedStatus(true);
          } else {
            setBookedStatus(false);
          }
          setOpenStatus(true);
          setReload(!reload);
        })
        .catch((error) => {
          setBookedStatus(false);
          setOpenStatus(true);
          setReload(!reload);
        });
      // You can perform further actions here, e.g., submit data or update the state.
    }
  };
  const fetchBed = async () => {
    const res = await privateAxios.get(`room/${roomId}/beds`);
    if (res.data) setBedList(res.data);
  };
  useEffect(() => {
    fetchBed();
  }, [reload]);
  if (openStatus) {
    return (
      <MessageModal
        open={openStatus}
        setOpen={setOpenStatus}
        status={bookedStatus}
      />
    );
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
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
                {bed.bedName}
                <IconButton
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fill:
                        bed.status.toLowerCase() === "vacant"
                          ? "currentColor"
                          : bed.status.toLowerCase() === "reserved"
                          ? "yellow"
                          : "red",
                      width: "50px",
                      height: "50px",
                    },
                    cursor:
                      bed.status.toLowerCase() === "occupied" ||
                      bed.status.toLowerCase() === "reserved"
                        ? "not-allowed !important"
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
                Selected Bed: {selectedBed.bedName}
              </Typography>
              <Typography variant="body1">
                Status: {selectedBed.status}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleConfirm(selectedBed)}
              >
                Book
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
