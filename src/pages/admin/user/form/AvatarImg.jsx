import { Close, CloudUpload, InsertDriveFile } from "@mui/icons-material";
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import React, { useEffect } from "react";
import Dropzone from "react-dropzone";
import { Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
export default function AvatarImg({ control, errors, resetField, setValue }) {
  return (
    <div>
      <Controller
        control={control}
        name="avatar"
        defaultValue={[]}
        render={({ field: { onBlur, onChange, name, value } }) => (
          <>
            <Dropzone onDrop={onChange} multiple={false}>
              {({ getRootProps, getInputProps }) => (
                <Paper
                  variant="outlined"
                  {...getRootProps()}
                  sx={{
                    backgroundColor: "#eee",
                    textAlign: "center",
                    cursor: "pointer",
                    color: "#333",
                    padding: "10px",
                    marginTop: "20px",
                  }}
                >
                  <CloudUpload
                    sx={{
                      marginTop: "16px",
                      color: "#333",
                      fontSize: "42px",
                    }}
                  />
                  <input {...getInputProps()} name={name} onBlur={onBlur} />
                  <p>Drag 'n' drop files here, or click select files</p>
                </Paper>
              )}
            </Dropzone>
            <List>
              {value.map((f, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <InsertDriveFile />
                  </ListItemIcon>
                  <ListItemText primary={f.name} secondary={f.size} />
                  <IconButton
                    onClick={() => {
                      resetField("avatar", { defaultValue: [] });
                    }}
                  >
                    <Close />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </>
        )}
      />
    </div>
  );
}
