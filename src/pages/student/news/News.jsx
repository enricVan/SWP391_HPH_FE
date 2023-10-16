import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import Searchbar from "../../../components/Searchbar";
import {
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Pagination,
  Typography,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import { privateAxios } from "../../../service/axios";
const { Search, SearchIconWrapper, StyledInputBase } = Searchbar;
const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
export default function News() {
  const [news, setNews] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const fetchData = async () => {
    const res = await privateAxios.get(
      `news?title=${searchTitle}&page=${currentPage - 1}`
    );
    setNews(res.data.content);
    setTotalPages(res.data.totalPages);
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, searchTitle]);
  return (
    <Box>
      <h1 style={{ marginLeft: "8px" }}>News</h1>
      <Box flex>
        <Search sx={{ display: "inline-block" }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            onChange={(e) => {
              setSearchTitle(e.target.value);
            }}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            sx={{
              border: "5px solid orangered",
              borderRadius: "30px",
            }}
          />
        </Search>
      </Box>
      <Grid container p={"8px"} spacing={1}>
        {news.map((item) => {
          return (
            <Grid item xs={6} my={2} key={item.newsId}>
              <Card sx={{ width: "100%", height: "100%" }}>
                <StyledLink to={`detail/${item.newsId}`}>
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h7"
                        component="div"
                        fontWeight={"bold"}
                        color={"gray"}
                      >
                        {item.createdAt}
                      </Typography>
                      <Divider sx={{ bgcolor: "black" }} />
                      <Typography variant="body2" color="primary" mt={1}>
                        {item.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </StyledLink>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Pagination
        color="primary"
        count={totalPages}
        page={currentPage}
        onChange={(e, value) => {
          setCurrentPage(value);
        }}
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
          my: 4,
        }}
      />
    </Box>
  );
}
