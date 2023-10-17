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
    roomTypeName: yup.string().required(),
    roomTypeDescription: yup.string().required(),
  })
  .required();
export default function EditForm({
  open,
  setOpen,
  roomType,
  reload,
  setReload,
}) {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
  } = useForm({
    createdAt: "",
    roomTypeId: 0,
    roomTypeName: "",
    roomTypeDescription: "",
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
    (async () => {
      await privateAxios.put(`room-type/${data.roomTypeId}`, data);
    })().then(() => {
      setSnackBarOpen(true);
      setReload(!reload);
    });
  };
  //   const fetchData = async () => {
  //     const res = await privateAxios.get(`roomType/${id}`);
  //     const apiData = await res.data;
  //     setRoomType(apiData);
  //   };
  //   useEffect(() => {
  //     if (id) {
  //       fetchData();
  //     }
  //   }, []);
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
          <Typography align="center">
            Edit Room Type ID {roomType?.roomTypeId}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <input
                type="hidden"
                defaultValue={roomType?.roomTypeId}
                {...register("roomTypeId")}
              ></input>
              <input
                type="hidden"
                defaultValue={roomType?.createdAt}
                {...register("createdAt")}
              ></input>
              <Controller
                name="roomTypeName"
                control={control}
                defaultValue={roomType ? roomType.roomTypeName : ""}
                render={({ field }) => (
                  <TextField
                    variant="standard"
                    label="Name"
                    fullWidth
                    {...field}
                    error={errors.roomTypeName ? true : false}
                    helperText={errors.roomTypeName?.message}
                  />
                )}
              />
              <Controller
                name="roomTypeDescription"
                control={control}
                defaultValue={roomType ? roomType.roomTypeDescription : ""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    sx={{ mt: 3 }}
                    fullWidth
                    multiline
                    error={errors.roomTypeDescription ? true : false}
                    helperText={errors.roomTypeDescription?.message}
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
                    ":hover": { bgcolor: "rgba(255,69,0,0.8)" },
                  }}
                >
                  SAVE CHANGES
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
              message="Add New Room Type Success!"
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
