import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { useDispatch, useSelector } from "react-redux";
import Role from "./Role";
import Actor from "./Actor";
import UserInfo from "./UserInfo";
import AvatarImg from "./AvatarImg";
import Account from "./Account";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  back,
  next,
  updateFields,
  setAvatar,
} from "../../../../features/userFormSlice";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { privateAxios } from "../../../../service/axios";
const actors = { 2: "STUDENT", 3: "MANAGER" };
var phoneRegEx =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export default function AddUser({ open, setOpen }) {
  const dispatch = useDispatch();
  const { currentStep, user } = useSelector((state) => state.userForm);
  const title = [
    "Role",
    actors[user.roleId ? user.roleId : 0],
    "User Information",
    "User Avatar",
    "Account",
  ];
  const schema = yup.object().shape({
    parentName: yup.string().required(),
    rollNumber: yup.string().required(),
    fullName: yup.string().required(),
    phone: yup
      .string()
      .matches(phoneRegEx, "Phone number is not valid")
      .required(),
    address: yup.string().required(),
    username: yup.string().required(),
    password: yup
      .string()
      .matches("admin", "Password must be 'admin'!")
      .required(),
    email: yup.string().email("Wrong email format!").required(),
  });
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
    register,
    watch,
    resetField,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const forms = [
    <Role />,
    <Actor register={register} control={control} errors={errors} />,
    <UserInfo register={register} control={control} errors={errors} />,
    <AvatarImg
      setValue={setValue}
      control={control}
      errors={errors}
      resetField={resetField}
    />,
    <Account register={register} control={control} errors={errors} />,
  ];
  const onSubmit = async (data) => {
    // const formData = new FormData();
    const newUser = Object.fromEntries(
      Object.entries(user).filter((entry) => entry[0] !== "avatar")
    );
    // const json = JSON.stringify(newUser);
    // const blob = new Blob([json], {
    //   type: "application/json",
    // });
    const { avatar } = user;
    // console.log(blob);
    console.log(avatar);
    console.log(newUser);
    // formData.append("document", blob);
    // formData.append("file", avatar);
    const res = await privateAxios.post(
      "user",
      {
        user: newUser,
        file: avatar,
      },
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  };
  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Open form dialog
      </Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true}>
          <div style={{ position: "absolute", right: 10 }}>
            {currentStep}/{forms.length}
          </div>
          <DialogTitle sx={{ textAlign: "center" }}>
            {title[currentStep - 1]}
          </DialogTitle>
          <DialogContent sx={{ paddingTop: "20px !important" }}>
            {forms[currentStep - 1]}
          </DialogContent>
          {currentStep !== 1 && (
            <DialogActions>
              <Button
                onClick={() => {
                  if (currentStep === 2) reset();
                  dispatch(back());
                }}
              >
                Back
              </Button>
              <Button
                variant={currentStep === 5 ? "contained" : "outlined"}
                onClick={() => {
                  (async () => {
                    let field = [];
                    let actorName = "";
                    switch (currentStep) {
                      case 2: {
                        if (user.roleId === 2) {
                          field = ["parentName", "rollNumber"];
                          actorName = "studentDto";
                        } else if (user.roleId === 3) {
                          actorName = "managetDto";
                          field = ["description"];
                        }
                        break;
                      }
                      case 3: {
                        field = ["fullName", "address", "gender", "phone"];
                        break;
                      }
                      case 4: {
                        field = ["avatar"];
                        break;
                      }
                      case 5: {
                        field = ["username", "password", "email"];
                        break;
                      }
                    }
                    const isvalidated = await trigger(field, {
                      shouldFocus: true,
                    });
                    if (isvalidated) {
                      let partialData = {};
                      if (field[0] !== "avatar") {
                        field.map((name) => {
                          partialData = { ...partialData, [name]: watch(name) };
                        });
                      }
                      console.log(partialData);
                      if (actorName) {
                        dispatch(updateFields({ [actorName]: partialData }));
                      } else if (field[0] === "avatar") {
                        console.log(watch("avatar")[0]);
                        dispatch(setAvatar(watch("avatar")[0]));
                      } else {
                        dispatch(updateFields(partialData));
                      }
                      if (currentStep === 5) {
                        handleSubmit(onSubmit)();
                      }
                      dispatch(next());
                    }
                  })();
                }}
              >
                {currentStep === 5 ? "Finish" : "Next"}
              </Button>
            </DialogActions>
          )}
        </Dialog>
      </form>
    </>
  );
}
