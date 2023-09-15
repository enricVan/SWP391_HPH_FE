import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import BootstrapInput from "../../../constants/BootstrapInput";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
export default function BedBooking() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box>
      <h1 style={{ marginLeft: "8px" }}>Choose Room Type</h1>
      <Box padding={3} display={"flex"}>
        <Box flexGrow={1} padding={1}>
          <FormControl
            fullWidth
            sx={{
              "&& .MuiInputBase-root": {
                borderRadius: "70px",
              },
            }}
          >
            <InputLabel id="demo-simple-select-label">Room</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box flexGrow={1} padding={1}>
          <FormControl
            fullWidth
            sx={{
              "&& .MuiInputBase-root": {
                borderRadius: "70px",
              },
            }}
          >
            <InputLabel id="demo-simple-select-label">Semester</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box padding={3} display={"flex"}>
        <Box flexGrow={1} padding={1}>
          <FormControl
            fullWidth
            sx={{
              "&& .MuiInputBase-root": {
                borderRadius: "70px",
              },
            }}
          >
            <InputLabel id="demo-simple-select-label">Dorm</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select-dorm"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box flexGrow={1} padding={1}>
          <FormControl
            fullWidth
            sx={{
              "&& .MuiInputBase-root": {
                borderRadius: "70px",
              },
            }}
          >
            <InputLabel id="demo-simple-select-label">Floor</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <FormControl
        sx={{
          marginLeft: 4,
        }}
      >
        <TextField label="Note" component={Paper}></TextField>
      </FormControl>
      <Box flexGrow={1} padding={4} display={"flex"}>
        <FormControl
          fullWidth
          sx={{
            "&& .MuiInputBase-root": {
              borderRadius: "70px",
            },
          }}
        >
          <BootstrapInput readOnly disabled={true} value={""} />
        </FormControl>
        <Button variant="contained" sx={{ bgcolor: "orangered" }}>
          Book
        </Button>
      </Box>
    </Box>
  );
}
