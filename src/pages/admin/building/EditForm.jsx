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
export default function EditForm({
  open,
  setOpen,
  building,
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
    buildingId: 0,
    buildingName: "",
    floorNumber: "",
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
    (async () => {
      await privateAxios.put(building/${data.buildingId}, data);
    })().then(() => {
      setSnackBarOpen(true);
      setReload(!reload);
    });
  };
  //   const fetchData = async () => {
  //     const res = await privateAxios.get(roomType/${id});
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
            Edit Building ID {building?.buildingId}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <input
                type="hidden"
                defaultValue={building?.buildingId}
                {...register("buildingId")}
              ></input>
              {/* <input
                type="hidden"
                defaultValue={roomType?.createdAt}
                {...register("createdAt")}
              ></input> */}
              <Controller
                name="buildingName"
                control={control}
                defaultValue={building ? building.buildingName : ""}
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
                defaultValue={building ? building.numberFloor : ""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Number Floor"
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