import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { privateAxios, testAxios } from "../../../service/axios";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function Test() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const handleSelectCountry = (e) => {
    setSelectedCountry(e.target.value);
    console.log(e.target.value);
  };
  const handleSelectState = (e) => {
    setSelectedState(e.target.value);
  };
  const fetchCoutries = async () => {
    const res = await testAxios.get("country");
    setCountries(res.data);
  };
  const fetchStates = async () => {
    const res = await testAxios.get(`country?iso_a2=${selectedCountry}`);
    setStates(res.data);
  };
  useEffect(() => {
    fetchCoutries();
  }, []);
  useEffect(() => {
    if (selectedCountry) {
      fetchStates();
    }
  }, [selectedCountry]);
  return (
    <Box padding={1}>
      <Box display={"flex"} sx={{ justifyContent: "space-between" }}>
        <h1 style={{ marginLeft: "8px" }}>Payment History</h1>
      </Box>
      <Box display={"flex"} sx={{ gap: 2 }}>
        <FormControl sx={{ width: 250 }}>
          <InputLabel id="country-label">Country</InputLabel>
          <Select
            labelId="country-label"
            label="Country"
            value={selectedCountry}
            onChange={handleSelectCountry}
          >
            {countries.map((country) => (
              <MenuItem value={country.key}>{country.value}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 250 }}>
          <InputLabel id="state-label">State</InputLabel>
          <Select
            labelId="state-label"
            label="state"
            value={selectedState}
            onChange={handleSelectState}
          >
            {states.map((state) => (
              <MenuItem value={state.iso_a2}>{state.value}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 250 }}>
          <InputLabel id="state-label">State</InputLabel>
          <Select
            labelId="state-label"
            label="state"
            value={selectedState}
            onChange={handleSelectState}
          >
            {states.map((state) => (
              <MenuItem value={state.iso_a2}>{state.value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Room Type</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Create Date</TableCell>
              <TableCell>Update Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.calories}
                </TableCell>
                <TableCell>{row.carbs}</TableCell>
                <TableCell>{row.calories}</TableCell>
                <TableCell>{row.calories}</TableCell>
                <TableCell>{row.calories}</TableCell>
                <TableCell>{row.calories}</TableCell>
                <TableCell>{row.calories}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
