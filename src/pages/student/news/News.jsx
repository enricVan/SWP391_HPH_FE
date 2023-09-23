import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Searchbar from "../../../components/Searchbar";
import {
  Card,
  CardActionArea,
  CardContent,
  CssBaseline,
  Divider,
  Pagination,
  Typography,
} from "@mui/material";
import { getRecentNews } from "../../../service/newsService";

const LinkItems = getRecentNews();
export default function News() {
  return (
    <Box>
      <h1 style={{ marginLeft: "8px" }}>News</h1>
      <Searchbar />
      <Grid container p={"8px"} spacing={1}>
        {LinkItems.map((item, index) => {
          return (
            <Grid item xs={6}>
              <Card>
                <CardActionArea>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h7"
                      component="div"
                      fontWeight={"bold"}
                    >
                      {item.date}
                    </Typography>
                    <Divider sx={{ bgcolor: "black" }} />
                    <Typography variant="body2" color="primary" mt={1}>
                      {item.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
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
