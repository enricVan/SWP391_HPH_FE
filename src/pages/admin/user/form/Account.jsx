import { Grid, TextField } from "@mui/material";
import React from "react";

export default function Account({ control, errors, register }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="User Name"
          {...register("username")}
          error={!!errors.username}
          helperText={errors?.username?.message}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors?.password?.message}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
      </Grid>
    </Grid>
  );
}
