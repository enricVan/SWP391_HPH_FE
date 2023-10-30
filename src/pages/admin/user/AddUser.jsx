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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

const schema = yup
    .object({
        username: yup.string().nonNullable().required(),
        fullname: yup.string().nonNullable().required(),
        email: yup.string().nonNullable().email().required(),
        phone: yup.string()
            .test('is-phone-valid', 'Phone number is not valid', (value) => {
                // Check if the value is exactly 10 digits and starts with '0'
                return /^0[0-9]{9}$/.test(value);
            })
            .required(),
        address: yup.string().required(),
        dob: yup
            .date()
            .max(new Date(), 'Date of birth must be in the past')
            .required('Date of birth is required'),
        floor: yup.number().min(1).max(5).required(),
    })
    .required();

export default function AddUser({ open, setOpen, reload, setReload }) {
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [dob, setDob] = useState(null)
    const [roles, setRoles] = useState([]);

    const [gender, setGender] = useState(false);

    const [role, setRole] = useState(2);
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitted },
        reset,
    } = useForm({
        defaultValues: {
            username: "",
            fullname: "",
            email: "",
            gender: false,
            phone: "",
            address: "",
            dob: "",
            role: 2
        },
        resolver: yupResolver(schema),
    });

    const fetchDataUser = async () => {
        const res = await privateAxios.get("role");
        const apiData = res.data;
        console.log(res.data);
        setRoles(apiData);
    };
    useEffect(() => {
        fetchDataUser();
    }, [reload]);

    const handleChooseRole = (event) => {
        // console.log(event.target.value);
        setRole(event.target.value);
    };

    const handleChangeGender = (event) => {
        setGender(event.target.value)
    }

    const onSubmit1 = (data) => {
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

            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "%",
                    p: 4,
                }}
                component={Paper}
            >
                <Typography align="center">New User</Typography>
                <form onSubmit={() => {
                    handleSubmit(onSubmit1)
                }}>
                    <Box>
                        <Controller
                            name="username"
                            control={control}
                            // defaultValue={""}
                            render={({ field }) => (
                                <TextField
                                    variant="standard"
                                    label="Username"
                                    fullWidth
                                    {...field}
                                    error={errors.username ? true : false}
                                    helperText={errors.username?.message}
                                />
                            )}
                        />
                        <Controller
                            name="fullname"
                            control={control}
                            defaultValue={""}
                            render={({ field }) => (
                                <TextField
                                    variant="standard"
                                    label="Fullname"
                                    fullWidth
                                    {...field}
                                    error={errors.fullname ? true : false}
                                    helperText={errors.fullname?.message}
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            defaultValue={""}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    sx={{ mt: 3 }}
                                    fullWidth
                                    multiline
                                    error={errors.email ? true : false}
                                    helperText={errors.email?.message}
                                />
                            )}
                        />

                        <Controller
                            name="gender"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth variant="standard" sx={{ mt: 3 }}>
                                    <>
                                        <InputLabel id="demo-simple-select-standard-label">
                                            Gender
                                        </InputLabel>
                                        <Select
                                            {...field}
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={gender}
                                            onChange={handleChangeGender}
                                        >
                                            <MenuItem
                                                value={false}
                                                key={1}
                                            >
                                                Female
                                            </MenuItem>
                                            <MenuItem
                                                value={true}
                                                key={2}
                                            >
                                                Male
                                            </MenuItem>
                                        </Select>
                                    </>
                                </FormControl>
                            )}
                        />
                        <Controller
                            name="phone"
                            control={control}
                            defaultValue={""}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Phone"
                                    sx={{ mt: 3 }}
                                    fullWidth
                                    multiline
                                    error={errors.phone ? true : false}
                                    helperText={errors.phone?.message}
                                />
                            )}
                        />
                        <Controller
                            name="address"
                            control={control}
                            defaultValue={""}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Address"
                                    sx={{ mt: 3 }}
                                    fullWidth
                                    multiline
                                    error={errors.address ? true : false}
                                    helperText={errors.address?.message}
                                />
                            )}
                        />

                        <Controller
                            name="dob"
                            control={control}
                            defaultValue={""}
                            render={({ field }) => (

                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            {...field}
                                            label="Date of birth"
                                            sx={{ mt: 3 }}
                                            fullWidth
                                            multiline
                                            error={errors.dob ? true : false}
                                            helperText={errors.dob?.message}
                                            onChange={(date) => {
                                                setDob(date);
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            )}
                        />
                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth variant="standard" sx={{ mt: 3 }}>
                                    <>
                                        <InputLabel id="demo-simple-select-standard-label">
                                            Role
                                        </InputLabel>
                                        <Select
                                            {...field}
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={role}
                                            onChange={handleChooseRole}
                                        >
                                            {roles.map((item) => (
                                                <MenuItem
                                                    value={item.id}
                                                    key={item.id}
                                                >
                                                    {item.roleName}
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
                                onClick={() => { console.log("test"); }}
                            >
                                ADD USER
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
                        message="Update Room Success!"
                        ContentProps={{
                            sx: {
                                bgcolor: "green",
                            },
                        }}
                    />
                </Box>
            </ClickAwayListener>

        </Modal>
    );
}
