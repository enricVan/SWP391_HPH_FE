/* eslint-disable react/prop-types */
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Searchbar from "../../../components/Searchbar";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import Switch from "@mui/material/Switch";
import { privateAxios } from "../../../service/axios";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import UserDetails from "./UserDetails";
import { MenuItem, Select } from "@mui/material";

const { Search, SearchIconWrapper, StyledInputBase } = Searchbar;

const StatusToggle = ({ value, onStatusChange }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span>Inactive</span>
      <Switch checked={value} onChange={() => onStatusChange(!value)} />
      <span>Active</span>
    </div>
  );
};

const updateStatusInDatabase = async (userId, newStatus, reload, setReload) => {
  try {
    const response = await privateAxios.put(`v1/admin/user/${userId}`, {
      status: newStatus,
    });

    console.log(newStatus, response);
    setReload(!reload);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

export default function DataTable({ users, reload, setReload }) {
  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "username",
      headerName: "Username",
      width: 180,
    },
    {
      field: "role",
      headerName: "Role",
      width: 180,
      renderCell: (params) => <span>{params.value.name}</span>,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 260,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 260,
    },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <StatusToggle
          value={params.value === "active"}
          onStatusChange={(newValue) => {
            const updatedStatus = newValue ? "active" : "inactive";
            const confirmation = window.confirm(
              `Do you want to change the status to ${updatedStatus} for ID ${params.row.id}?`
            );
            if (confirmation) {
              updateStatusInDatabase(
                params.row.id,
                updatedStatus,
                reload,
                setReload
              );
            }
          }}
        />
      ),
    },
    {
      field: "details",
      headerName: "View Details",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <RemoveRedEyeIcon
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => handleViewDetailsClick(params.row.id)}
        />
      ),
    },
  ];

  // Show user details
  const [userDetails, setUserDetails] = useState(null);

  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);

  const openUserDetailsPopup = () => {
    setIsUserDetailsOpen(true);
  };

  const closeUserDetailsPopup = () => {
    setIsUserDetailsOpen(false);
  };

  const handleViewDetailsClick = async (userId) => {
    try {
      const response = await privateAxios.get(`v1/admin/user/${userId}`);
      const userData = await response.data;
      console.log(userData);
      setUserDetails(userData);
      openUserDetailsPopup(); // Open the user details popup
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //Filter by role
  const [selectedRole, setSelectedRole] = useState("All Roles");

  const rolesSet = new Set();
  users.forEach((user) => {
    if (user.role && user.role.name) {
      rolesSet.add(user.role.name);
    }
  });

  const uniqueRoles = Array.from(rolesSet);

  const handleRoleFilterChange = (event) => {
    setSelectedRole(event.target.value);
  };

  // Search by username
  const [searchQuery, setSearchQuery] = useState("");

  const filterUsers = () => {
    return users.filter((user) => {
      if (
        selectedRole &&
        user.role &&
        user.role.name &&
        selectedRole !== "All Roles"
      ) {
        return (
          user.username.toLowerCase().includes(searchQuery.toLowerCase()) &&
          user.role.name === selectedRole
        );
      } else {
        return user.username.toLowerCase().includes(searchQuery.toLowerCase());
      }
    });
  };

  const rows = filterUsers();

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div style={{ height: "580px", width: "100%" }}>
      <Box flex sx={{ marginBottom: "20px", marginTop: "20px" }}>
        <Search sx={{ display: "inline-block" }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Search by username…"
            inputProps={{ "aria-label": "search" }}
            sx={{
              border: "5px solid orangered",
              borderRadius: "30px",
              marginBottom: "10px",
            }}
          />
        </Search>

        <Select
          value={selectedRole}
          onChange={handleRoleFilterChange}
          sx={{ minWidth: 120, marginRight: "2vw", float: "right" }}
        >
          <MenuItem value="All Roles">All Roles</MenuItem>
          {uniqueRoles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <div>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
      {userDetails && (
        <UserDetails
          open={isUserDetailsOpen}
          handleClose={closeUserDetailsPopup}
          userDetails={userDetails}
        />
      )}
    </div>
  );
}
