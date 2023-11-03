import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { useDispatch, useSelector } from "react-redux";
import Role from "./form/Role";
import Actor from "./form/Actor";
import UserInfo from "./form/UserInfo";
import AvatarImg from "./form/AvatarImg";
import Account from "./form/Account";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import {
  back,
  next,
  updateFields,
  setAvatar,
} from "../../../features/userFormSlice";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { privateAxios } from "../../../service/axios";
const title = ["Role", "Actor", "User Info", "User Avatar", "Account"];
var phoneRegEx =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export default function Test() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { currentStep, user } = useSelector((state) => state.userForm);
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
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const forms = [
    <Role />,
    <Actor register={register} control={control} errors={errors} />,
    <UserInfo register={register} control={control} errors={errors} />,
    <AvatarImg control={control} errors={errors} />,
    <Account register={register} control={control} errors={errors} />,
  ];
  const onSubmit = async (data) => {
    const formData = new FormData();
    const { avatar } = user;
    const newUser = Object.fromEntries(
      Object.entries(user).filter((entry) => entry[0] !== "avatar")
    );
    console.log({ user: newUser });
    console.log(avatar);
    // const res = await privateAxios.get("users", {
    //   data: formData,
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
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
                          field = ["description"];
                          actorName = "managerDto";
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
                      // console.log(partialData);
                      if (actorName) {
                        // console.log({ [actorName]: partialData });
                        dispatch(updateFields({ [actorName]: partialData }));
                      } else if (field[0] === "avatar") {
                        // console.log(watch("avatar"));
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
