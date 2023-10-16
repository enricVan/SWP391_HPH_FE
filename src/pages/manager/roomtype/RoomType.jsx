/* eslint-disable react/jsx-key */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { privateAxios } from "../../../service/axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import AddForm from "./AddForm";
import EditForm from "./EditForm";

const createColumns = (setEditOpen, setRoomType, reload, setReload) => [
  {
    field: "roomTypeId",
    headerName: "ID",
    disableColumnMenu: true,
    flex: 0.3,
    sortable: false,
  },
  {
    field: "roomTypeName",
    headerName: "Name",
    editable: true,
    disableColumnMenu: true,
    flex: 0.5,
    sortable: false,
  },
  {
    field: "roomTypeDescription",
    headerName: "description",
    editable: true,
    disableColumnMenu: true,
    flex: 1,
    sortable: false,
  },
  {
    field: "createdAt",
    headerName: "Created Date",
    disableColumnMenu: true,
    flex: 1,
    sortable: false,
  },
  {
    field: "updatedAt",
    headerName: "Updated Date",
    disableColumnMenu: true,
    flex: 1,
    sortable: false,
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 100,
    cellClassName: "actions",
    flex: 0.5,
    getActions: ({ id }) => {
      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={() => {
            (async () => {
              const res = await privateAxios.get(`roomType/${id}`);
              const apiData = await res.data;
              setRoomType(apiData);
            })().then(() => {
              setEditOpen(true);
            });
          }}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            if (confirm(`Room Type ID ${id} will be delete?`)) {
              (async () => {
                privateAxios.delete(`roomType/${id}`);
              })().then(() => {
                setReload(!reload);
              });
            }
          }}
          color="inherit"
        />,
      ];
    },
  },
];

export default function RoomType() {
  const [reload, setReload] = React.useState(false);
  const [roomType, setRoomType] = React.useState(null);
  const [addOpen, setAddOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [roomTypes, setroomTypes] = React.useState([]);
  const columns = createColumns(setEditOpen, setRoomType, reload, setReload);
  const fetchData = async () => {
    const res = await privateAxios.get("roomType");
    const apiData = await res.data;
    setroomTypes(apiData);
  };
  React.useEffect(() => {
    fetchData();
    console.log(roomTypes);
  }, [reload]);
  return (
    <>
      <Box p={2}>
        <div style={{ minHeight: "400px" }}>
          <Button
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              setAddOpen(true);
            }}
          >
            Add record
          </Button>
          <DataGrid
            sx={{
              "& .MuiDataGrid-cell": {
                whiteSpace: "normal !important",
                lineHeight: "normal !important",
              },
            }}
            getRowId={(row) => row.roomTypeId}
            rows={roomTypes}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </Box>
      <AddForm
        open={addOpen}
        setOpen={setAddOpen}
        reload={reload}
        setReload={setReload}
      />
      <EditForm
        open={editOpen}
        setOpen={setEditOpen}
        roomType={roomType}
        reload={reload}
        setReload={setReload}
      />
    </>
  );
}
