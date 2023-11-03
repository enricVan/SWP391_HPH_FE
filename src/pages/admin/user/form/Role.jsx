import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import { useDispatch } from "react-redux";
import { next, chooseRole } from "../../../../features/userFormSlice";
export default function Role() {
  const dispatch = useDispatch();
  return (
    <div>
      <ButtonGroup sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={() => {
            dispatch(chooseRole(2));
            dispatch(next());
          }}
          variant="contained"
        >
          Student
        </Button>
        <Button
          onClick={() => {
            dispatch(chooseRole(3));
            dispatch(next());
          }}
          variant="contained"
        >
          Manager
        </Button>
      </ButtonGroup>
    </div>
  );
}
