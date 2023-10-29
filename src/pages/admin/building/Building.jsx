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

const createColumns = (setEditOpen, setBuilding, reload, setReload) => [
  {
    field: "buildingId",
    headerName: "ID",
    disableColumnMenu: true,
    flex: 0.3,
    sortable: false,
  },
  {
    field: "buildingName",
    headerName: "Name",
    editable: true,
    disableColumnMenu: true,
    flex: 0.5,
    sortable: false,
  },
  {
    field: "numberFloor",
    headerName: "Number Floor",
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
              const res = await privateAxios.get(`building/${id}`);
              const apiData = await res.data;
              setBuilding(apiData);
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
            if (confirm(`Building ID ${id} will be delete?`)) {
              (async () => {
                privateAxios.delete(`building/${id}`);
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
export default function Building() {
  const [reload, setReload] = React.useState(false);
  const [building, setBuilding] = React.useState(null);
  const [addOpen, setAddOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [buildings, setbuildings] = React.useState([]);
  const columns = createColumns(setEditOpen, setBuilding, reload, setReload);
  const fetchData = async () => {
    const res = await privateAxios.get("building");
    const apiData = await res.data;
    setbuildings(apiData);
    console.log(apiData)
  };
  React.useEffect(() => {
    fetchData();
    console.log(buildings);
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
            getRowId={(row) => row.buildingId}
            rows={buildings}
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
        building={building}
        reload={reload}
        setReload={setReload}
      />
    </>
  );
}
