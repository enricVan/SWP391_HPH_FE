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

const createColumns = (setEditOpen, setroom, reload, setReload) => [
  {
    field: "roomId",
    headerName: "ID",
    disableColumnMenu: true,
    flex: 0.3,
    sortable: false,
  },
  {
    field: "roomName",
    headerName: "Name",
    editable: true,
    disableColumnMenu: true,
    flex: 0.5,
    sortable: false,
  },
  {
    field: "roomPrice",
    headerName: "Room Price",
    editable: true,
    disableColumnMenu: true,
    flex: 1,
    sortable: false,
  },
  {
    field: "roomType",
    headerName: "Room Type",
    editable: true,
    disableColumnMenu: true,
    flex: 1,
    sortable: false,
    renderCell: (params) =>{
      return <>{params.value.roomTypeName}</>
    }
  },
  {
    field: "floor",
    headerName: "Floor",
    editable: true,
    disableColumnMenu: true,
    flex: 1,
    sortable: false,
  },
  {
    field: "building",
    headerName: "Building",
    editable: true,
    disableColumnMenu: true,
    flex: 1,
    sortable: false,
    renderCell: (params) =>{
      return <>{params.value.buildingName}</>
    }
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
              const res = await privateAxios.get(`room/${id}`);
              const apiData = await res.data;
              setroom(apiData);
              console.log(apiData);
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
                privateAxios.delete(`room/${id}`);
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

export default function room() {
  const [reload, setReload] = React.useState(false);
  const [room, setroom] = React.useState(null);
  const [addOpen, setAddOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [rooms, setrooms] = React.useState([]);
  const columns = createColumns(setEditOpen, setroom, reload, setReload);
  const fetchData = async () => {
    const res = await privateAxios.get("room");
    const apiData = await res.data;
    console.log(res.data);
    setrooms(apiData);
  };
  React.useEffect(() => {
    fetchData();
    console.log(rooms);
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
            getRowId={(row) => row.roomId}
            rows={rooms}
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
        room={room}
        reload={reload}
        setReload={setReload}
      />
    </>
  );
}
