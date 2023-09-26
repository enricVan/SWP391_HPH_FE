import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import { Avatar } from "@mui/material";
import Item from "../../../constants/Item";
import student from "../../../data/student.json";
import avatar from "../../../assets/image/avatar.jpeg";
import axios from "axios";

export default function Home() {
  const [news, setNews] = React.useState([]);
  const fetchData = async () => {
    const res = await axios.get(
      "http://localhost:8888/api/v1/admin/news?page=0"
    );
    setNews(res.data.content);
  };
  React.useEffect(() => {
    fetchData();
  }, []);
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
              {news.map((item, index) => {
                return (
                  <>
                    <ListItem key={index}>
                      <Link
                        href={`news/detail/${item.newsId}`}
                        underline="none"
                        width={"100%"}
                      >
                        {item.title}
                      </Link>
                    </ListItem>
                    <p style={{ marginLeft: "16px" }}>{item.createdAt}</p>
                  </>
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
                  sx={{ width: "100%", height: 150 }}
                  variant="square"
                  src={avatar}
                />
              </Grid>
              <Grid item xs={8} width={"100%"} paddingLeft={1}>
                <Typography>{student.fullName}</Typography>
                <Typography>{student.dob}</Typography>
                <Typography>{student.gender}</Typography>
                <Typography>{student.bed}</Typography>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
