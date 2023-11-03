import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";
export default function Actor({ control, errors, register }) {
  const { user } = useSelector((state) => state.userForm);
  return (
    <>
      {user.roleId === 2 && (
        <>
          <TextField
            fullWidth
            label="Parent Name"
            {...register("parentName")}
            error={!!errors.parentName}
            helperText={errors?.parentName?.message}
          />
          <Controller
            name="rollNumber"
            control={control}
            render={({ field }) => (
              <TextField
                sx={{ marginTop: 2 }}
                fullWidth
                label="Roll Number"
                {...field}
                error={!!errors.rollNumber}
                helperText={errors?.rollNumber?.message}
              />
            )}
          />
        </>
      )}
      {user.roleId === 3 && (
        <>
          <TextField
            fullWidth
            label="Description"
            {...register("description")}
            error={!!errors.description}
            helperText={errors?.description?.message}
          />
        </>
      )}
    </>
  );
}
