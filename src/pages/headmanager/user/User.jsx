/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "../../../service/axios";
import UserTable from "./UserTable";
import Searchbar from "../../../components/Searchbar";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";

const { Search, SearchIconWrapper, StyledInputBase } = Searchbar;

function User() {
  const [users, setUsers] = useState([]);

  const [partialUsername, setPartialUsername] = useState("");

  const fetchData = async () => {
    const res = await axios.get(
      `v1/admin/user/search?partialUsername=${partialUsername}`
    );
    if (res && res.data) {
      console.log(res.data);
      setUsers(res.data);
    }
    return res.data;
  };

  useEffect(() => {
    fetchData();
  }, [partialUsername]);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>User List</h1>

      <Box flex>
        <Search sx={{ display: "inline-block" }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            onChange={(e) => {
              setPartialUsername(e.target.value);
            }}
            placeholder="Search by username…"
            inputProps={{ "aria-label": "search" }}
            sx={{
              border: "5px solid orangered",
              borderRadius: "30px",
            }}
          />
        </Search>
      </Box>

      <UserTable users={users} />
    </>
  );
}

export default User;
