import React from "react";
import Box from "@mui/material/Box";
import Item from "../../../constants/Item";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Searchbar from "../../../components/Searchbar";
import { Pagination } from "@mui/material";

const LinkItems = [
  "new1",
  "new1",
  "new1",
  "new1",
  "new1",
  "new1",
  "new1",
  "new1",
  "new1",
  "new1",
];
export default function News() {
  return (
    <Box>
      <h1 style={{ marginLeft: "8px" }}>News</h1>
      <Searchbar />
      <Grid container p={"8px"} spacing={1}>
        {LinkItems.map((link, index) => {
          return (
            <Grid item xs={6}>
              <Item>
                <Link href="#" underline="none">
                  {link}
                </Link>
              </Item>
            </Grid>
          );
        })}
      </Grid>
      <Pagination
        color="primary"
        count={5}
        sx={{
          justifyContent: "center",
          "& .MuiPagination-ul": {
            justifyContent: "center",
          },
          "&& .Mui-selected": {
            bgcolor: "orangered",
          },
          "& .MuiPaginationItem-root:hover": {
            bgcolor: "rgba(255,69,0,0.8)",
          },
          "&& .Mui-selected:hover": {
            bgcolor: "rgba(255,69,0,0.8)",
          },
        }}
      />
    </Box>
  );
}
