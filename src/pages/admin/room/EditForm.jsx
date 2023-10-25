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
import { useEffect, useState } from "react";
import { privateAxios } from "../../../service/axios";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
const schema = yup
  .object({
    roomName: yup.string().nonNullable().required(),
    roomType: yup.number().required(),
    building: yup.number().required(),
    roomPrice: yup.number().min(1).required(),
    floor: yup.number().min(1).max(5).required(),
  })
  .required();
export default function EditForm({ open, setOpen, room, reload, setReload }) {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [buildings, setBuildings] = useState([]);
  const [roomType, setRoomtype] = useState(1);
  const [building, setBuilding] = useState(1);
  const [roomtypes, setRoomtypes] = useState([]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
  } = useForm({
    createdAt: "",
    roomId: 0,
    roomName: "",
    roomType: 1,
    building: 1,
    roomPrice: 0,
    floor: 1,
    resolver: yupResolver(schema),
  });

  //   const fetchData = async () => {
  //     const res = await privateAxios.get(`room/${id}`);
  //     const apiData = await res.data;
  //     setroom(apiData);
  //   };
  //   useEffect(() => {
  //     if (id) {
  //       fetchData();
  //     }
  //   }, []);

  const fetchData1 = async () => {
    const res = await privateAxios.get("room-type");
    const apiData = await res.data;
    console.log(res.data);
    setRoomtypes(apiData);
  };
  useEffect(() => {
    fetchData1();
    console.log(roomtypes);
  }, [reload]);

  const handleChangeRoomType = (event) => {
    console.log(event.target.value);
    setRoomtype(event.target.value);
  };
  const handleChangeBuilding = (event) => {
    console.log(event.target.value);
    setBuilding(event.target.value);
  };
  const fetchData2 = async () => {
    const res = await privateAxios.get("building");
    const apiData = await res.data;
    console.log(res.data);
    setBuildings(apiData);
  };
  useEffect(() => {
    fetchData2();
    console.log(roomtypes);
  }, [reload]);

  const onSubmit = (data) => {
    console.log(data);
    (async () => {
      await privateAxios.put(`room/${data.roomId}`, data);
    })().then(() => {
      setSnackBarOpen(true);
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
          <Typography align="center">Edit Room ID {room?.roomId}</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <input
                type="hidden"
                defaultValue={room?.roomId}
                {...register("roomId")}
              ></input>
              <input
                type="hidden"
                defaultValue={room?.createdAt}
                {...register("createdAt")}
              ></input>
              <Controller
                name="roomName"
                control={control}
                defaultValue={room ? room.roomName : ""}
                render={({ field }) => (
                  <TextField
                    variant="standard"
                    label="Name"
                    fullWidth
                    {...field}
                    error={errors.roomName ? true : false}
                    helperText={errors.roomName?.message}
                  />
                )}
              />
              <Controller
                name="roomPrice"
                control={control}
                defaultValue={room ? room.roomPrice : ""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Room Price"
                    sx={{ mt: 3 }}
                    fullWidth
                    multiline
                    error={errors.roomPrice ? true : false}
                    helperText={errors.roomPrice?.message}
                  />
                )}
              />

              <Controller
                name="roomType"
                control={control}
                defaultValue={room ? room.roomType.roomTypeId : ""}
                render={({ field }) => (
                  <FormControl fullWidth variant="standard" sx={{ mt: 3 }}>
                    <>
                      <InputLabel id="demo-simple-select-standard-label">
                        Room Type
                      </InputLabel>
                      <Select
                        {...field}
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={roomType}
                        onChange={handleChangeRoomType}
                      >
                        {roomtypes.map((item) => (
                          <MenuItem
                            value={item.roomTypeId}
                            key={item.roomTypeId}
                          >
                            {item.roomTypeName}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  </FormControl>
                )}
              />

              <Controller
                name="floor"
                control={control}
                defaultValue={room ? room.floor : ""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Floor"
                    sx={{ mt: 3 }}
                    fullWidth
                    multiline
                    error={errors.floor ? true : false}
                    helperText={errors.floor?.message}
                  />
                )}
              />
              <Controller
                name="building"
                control={control}
                defaultValue={room ? room.building.buildingId : ""}
                // defaultValue=""
                render={({ field }) => (
                  <FormControl fullWidth variant="standard" sx={{ mt: 3 }}>
                    <>
                      <InputLabel id="demo-simple-select-standard-label">
                        Building
                      </InputLabel>
                      <Select
                        {...field}
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={building}
                        onChange={handleChangeBuilding}
                      >
                        {buildings.map((item) => (
                          <MenuItem
                            value={item.buildingId}
                            key={item.buildingId}
                          >
                            {item.buildingName}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  </FormControl>
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
