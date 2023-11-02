import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { privateAxios } from "../../../service/axios";

export default function Building() {
  const [buildings, setBuildings] = useState([]);

  const fetchData = async () => {
    try {
      const res = await privateAxios.get(`building`);
      console.log(res.config.url);
      console.log(res.data);
      setBuildings(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box padding={2}>
      <Box>
        <div
          style={{
            backgroundColor: "#034EA2",
            padding: "6px",
            borderRadius: "15px",
            marginBottom: "10px",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#fff",
              textTransform: "uppercase",
              margin: "0",
            }}
          >
            Building
          </h1>
        </div>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#FF5800" }}>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", color: "#fff" }}>
                ID
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#fff" }}>
                Building Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#fff" }}>
                Number of Floor
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#fff" }}>
                Created Date
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#fff" }}>
                Updated Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buildings.map((b) => (
              <TableRow
                key={b.buildingId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {b.buildingId}
                </TableCell>
                <TableCell>{b.buildingName}</TableCell>
                <TableCell>{b.numberFloor}</TableCell>
                <TableCell>{b.createdAt}</TableCell>
                <TableCell>{b.updatedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
