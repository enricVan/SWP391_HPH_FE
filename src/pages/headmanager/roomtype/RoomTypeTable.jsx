/* eslint-disable react/prop-types */
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Searchbar from "../../../components/Searchbar";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import Switch from "@mui/material/Switch";
import { privateAxios } from "../../../service/axios";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import RoomTypeDetails from "./RoomTypeDetails";
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

const updateStatusInDatabase = async (roomtypeId, newStatus, reload, setReload) => {
  try {
    const response = await privateAxios.put(`room-type/${roomtypeId}`, {
      status: newStatus,
    });

    console.log(newStatus, response);
    setReload(!reload);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

export default function DataTable({ roomtypes, reload, setReload }) {
  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "roomtypename",
      headerName: "RoomTypename",
      width: 180,
    },
    {
      field: "fullName",
      headerName: "Full Name",
      width: 180,
    },
    {
      field: "role",
      headerName: "Role",
      width: 180,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 180,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 180,
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

  // Show roomtype details
  const [roomtypeDetails, setRoomTypeDetails] = useState(null);

  const [isRoomTypeDetailsOpen, setIsRoomTypeDetailsOpen] = useState(false);

  const openRoomTypeDetailsPopup = () => {
    setIsRoomTypeDetailsOpen(true);
  };

  const closeRoomTypeDetailsPopup = () => {
    setIsRoomTypeDetailsOpen(false);
  };

  const handleViewDetailsClick = async (roomtypeId) => {
    try {
      const response = await privateAxios.get(`roomtype/${roomtypeId}`);
      const roomtypeData = await response.data;
      console.log(roomtypeData);
      setRoomTypeDetails(roomtypeData);
      openRoomTypeDetailsPopup(); // Open the roomtype details popup
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //Filter by role
  const [selectedRole, setSelectedRole] = useState("All Roles");

  const rolesSet = new Set();
  roomtypes.forEach((roomtype) => {
    if (roomtype.role) {
      rolesSet.add(roomtype.role);
    }
  });

  const uniqueRoles = Array.from(rolesSet);

  const handleRoleFilterChange = (event) => {
    setSelectedRole(event.target.value);
  };

  // Search by roomtypename
  const [searchQuery, setSearchQuery] = useState("");

  const filterRoomTypes = () => {
    return roomtypes.filter((roomtype) => {
      if (selectedRole && roomtype.role && selectedRole !== "All Roles") {
        return (
          roomtype.roomtypename.toLowerCase().includes(searchQuery.toLowerCase()) &&
          roomtype.role === selectedRole
        );
      } else {
        return roomtype.roomtypename.toLowerCase().includes(searchQuery.toLowerCase());
      }
    });
  };

  const rows = filterRoomTypes();

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div style={{ height: "580px", width: "100%" }}>
      <Box flex sx={{ margin: "25px" }}>
        <Search sx={{ display: "inline-block" }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Search by roomtypename…"
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
      {roomtypeDetails && (
        <RoomTypeDetails
          open={isRoomTypeDetailsOpen}
          handleClose={closeRoomTypeDetailsPopup}
          roomtypeDetails={roomtypeDetails}
        />
      )}
    </div>
  );
}
