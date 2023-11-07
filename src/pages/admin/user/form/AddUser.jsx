import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MenuItem, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  chooseRole,
  updateFields,
  open,
} from "../../../../features/userFormSlice";
import { useNavigate } from "react-router-dom";
import { privateAxios } from "../../../../service/axios";
export default function AddUser({ openAdd, setOpenAdd }) {
  const [roleList, setRoleList] = React.useState([]);
  const fetchRole = async () => {
    const res = await privateAxios.get("role");
    const data = res.data.filter((role) => role.id !== 1);
    setRoleList(data);
    console.log(data);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValue = {
    username: "",
    password: "",
    roleId: 2,
  };
  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup
      .string()
      .matches("admin", "Password must be 'admin'!")
      .required(),
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    dispatch(updateFields(data));
    switch (data.roleId) {
      case 2: {
        dispatch(open("ADD_STUDENT"));
        navigate("/admin/user/student");
        break;
      }
      case 3: {
        dispatch(open("ADD_MANAGER"));
        navigate("/admin/user/manager");
        break;
      }
      case 4: {
        dispatch(open("ADD_GUARD"));
        navigate("/admin/user/guard");
        break;
      }
    }
  };
  React.useEffect(() => {
    fetchRole();
  }, []);
  return (
    <>
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Subscribe</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              {...register("username")}
              autoFocus
              margin="dense"
              label="User Name"
              type="text"
              fullWidth
              error={!!errors.username}
              helperText={errors?.username?.message}
            />
            <TextField
              {...register("password")}
              autoFocus
              margin="dense"
              label="Password"
              type="text"
              fullWidth
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
            <Controller
              name="roleId"
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  {roleList?.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.roleName}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
            <Button type="submit">Next</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
