import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { privateAxios } from "../../../service/axios";
const schema = yup
  .object({
    buildingName: yup.string().required(),
    numberFloor: yup.string().required(),
  })
  .required();
export default function AddForm({ open, setOpen, reload, setReload }) {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
  } = useForm({
    buildingName: "",
    numberFloor: "",
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    (async () => {
      await privateAxios.post("building", data);
    })().then(() => {
      setSnackBarOpen(true);
      reset();
      setReload(!reload);
    });
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            p: 4,
          }}
          component={Paper}
        >
          <Typography align="center">New Building</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Controller
                name="buildingName"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <TextField
                    variant="standard"
                    label="Name"
                    fullWidth
                    {...field}
                    error={errors.buildingName ? true : false}
                    helperText={errors.buildingName?.message}
                  />
                )}
              />
              <Controller
                name="numberFloor"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Floor"
                    sx={{ mt: 3 }}
                    fullWidth
                    multiline
                    error={errors.numberFloor ? true : false}
                    helperText={errors.numberFloor?.message}
                  />
                )}
              />
              <div
                style={{
                  padding: "16px 4px 4px 4px",
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Button
                  type="submit"
                  sx={{
                    width: "60%",
                    bgcolor: "orangered",
                    color: "white",
                    ":hover": { bgcolor: "rgba(255,69,0,0.😎" },
                  }}
                >
                  ADD
                </Button>
              </div>
            </Box>
          </form>
        </Box>
        <ClickAwayListener onClickAway={() => setSnackBarOpen(false)}>
          <Box sx={{ width: 500 }}>
            <Snackbar
              autoHideDuration={3000}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              open={snackBarOpen}
              onClose={(reason) => {
                setSnackBarOpen(false);
              }}
              message="Add New Building Success!"
              ContentProps={{
                sx: {
                  bgcolor: "green",
                },
              }}
            />
          </Box>
        </ClickAwayListener>
      </>
    </Modal>
  );
}
