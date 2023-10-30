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
import { InputLabel, MenuItem, Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";

const schema = yup
  .object({
    userName: yup.string().matches(/^[RL]\d{3}$/, 'User name must start with R or L followed by three numbers').required(),
    userType: yup.number().required(),
    building: yup.number().required(),
    userPrice: yup.number().min(1).required(),
    floor: yup.number().min(1).max(5).required(),
  })
  .required();
export default function AddForm({ open, setOpen, reload, setReload }) {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [buildings, setBuildings] = useState([]);
  const [userType, setUsertype] = useState(1);
  const [building, setBuilding] = useState(1);
  const [usertypes, setUsertypes] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
  } = useForm({
    defaultValues: {
      userName: "",
      userPrice: 1,
      userType: userType,
      floor: 1,
      building: building,
    },
    resolver: yupResolver(schema),
  });

  const fetchData1 = async () => {
    const res = await privateAxios.get("user-type");
    const apiData = await res.data;
    // console.log(res.data);
    setUsertypes(apiData);
  };
  useEffect(() => {
    fetchData1();
    // console.log(usertypes);
  }, [reload]);

  const handleChangeUserType = (event) => {
    // console.log(event.target.value);
    setUsertype(event.target.value);
  };
  const handleChangeBuilding = (event) => {
    // console.log(event.target.value);
    setBuilding(event.target.value);
  };
  const fetchData2 = async () => {
    const res = await privateAxios.get("building");
    const apiData = await res.data;
    // console.log(res.data);
    setBuildings(apiData);
  };
  useEffect(() => {
    fetchData2();
    // console.log(usertypes);
  }, [reload]);

  const onSubmit = (data) => {
    // console.log(data);
    (async () => {
      await privateAxios.post("user", data);
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
          <Typography align="center">New User</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Controller
                name="userName"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <TextField
                    variant="standard"
                    label="Name"
                    fullWidth
                    {...field}
                    error={errors.userName ? true : false}
                    helperText={errors.userName?.message}
                  />
                )}
              />
              <Controller
                name="userPrice"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="User Price"
                    sx={{ mt: 3 }}
                    fullWidth
                    multiline
                    error={errors.userPrice ? true : false}
                    helperText={errors.userPrice?.message}
                  />
                )}
              />

              <Controller
                name="userType"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl fullWidth variant="standard" sx={{ mt: 3 }}>
                    <>
                      <InputLabel id="demo-simple-select-standard-label">
                        User Type
                      </InputLabel>
                      <Select
                        {...field}
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={userType}
                        onChange={handleChangeUserType}
                      >
                        {usertypes.map((item) => (
                          <MenuItem
                            value={item.userTypeId}
                            key={item.userTypeId}
                          >
                            {item.userTypeName}
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
                defaultValue={""}
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
                defaultValue=""
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
              message="Update User Success!"
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
