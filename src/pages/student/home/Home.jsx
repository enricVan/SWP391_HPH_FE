import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import { Avatar } from "@mui/material";
import Item from "../../../constants/Item";
import newsService from "../../../service/newsService";
const LinkItems = newsService.getRecentNews();
export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} padding={1}>
        <Grid item xs={8}>
          <Typography
            variant="h5"
            bgcolor="#1565c0"
            sx={{
              textAlign: "center",
              color: "white",
            }}
          >
            News
          </Typography>
          <Item>
            <List>
              {LinkItems.map((link, index) => {
                return (
                  <ListItem key={index}>
                    <Link href={`news/detail/${link.id}`} underline="none">
                      {link.title}
                    </Link>
                  </ListItem>
                );
              })}
            </List>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Typography
            variant="h5"
            sx={{
              backgroundColor: "#1565c0",
              textAlign: "center",
              color: "white",
            }}
          >
            Personal Information
          </Typography>
          <Item>
            <Grid container m={0}>
              <Grid item xs={4}>
                <Avatar
                  alt="Remy Sharp"
                  sx={{ width: 120, height: 150 }}
                  variant="square"
                />
              </Grid>
              <Grid item xs={8}>
                <Typography>Info</Typography>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
