import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import { Avatar } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
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
export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} padding={1}>
        <Grid item xs={8}>
          <Typography
            variant="h5"
            sx={{
              backgroundColor: "#1976d2",
              textAlign: "center",
            }}
          >
            News
          </Typography>
          <Item>
            <List>
              {LinkItems.map((link, index) => {
                return (
                  <ListItem>
                    <Link href="#" underline="none">
                      {link}
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
              backgroundColor: "#1976d2",
              textAlign: "center",
            }}
          >
            Personal Information
          </Typography>
          <Item>
            <Grid container m={0}>
              <Grid item xs={4}>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
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
