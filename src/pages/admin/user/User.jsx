/* eslint-disable react/jsx-key */

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { privateAxios } from "../../../service/axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import AddForm from "./AddForm";
import EditForm from "./EditForm";
import { useEffect, useState } from "react";

const createColumns = (setEditOpen, setuser, reload, setReload) => [
  {
    field: "Id",
    headerName: "ID",
    disableColumnMenu: true,
    flex: 0.3,
    sortable: false,
  },
  {
    field: "userName",
    headerName: "Name",
    editable: true,
    disableColumnMenu: true,
    flex: 0.5,
    sortable: false,
  },
  {
    field: "userPrice",
    headerName: "User Price",
    editable: true,
    disableColumnMenu: true,
    flex: 1,
    sortable: false,
  },
  {
    field: "userType",
    headerName: "User Type",
    editable: true,
    disableColumnMenu: true,
    flex: 1,
    sortable: false,
    // renderCell: (params) =>{
    //   return <>{params.value.userTypeName}</>
    // }
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
    // renderCell: (params) =>{
    //   return <>{params.value.buildingName}</>
    // }
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
              const res = await privateAxios.get(`user/${id}`);
              const apiData = await res.data;
              setuser(apiData);
              // console.log(apiData);
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
            if (confirm(`User Type ID ${id} will be delete?`)) {
              (async () => {
                privateAxios.delete(`user/${id}`);
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

export default function User() {
  const [reload, setReload] = useState(false);
  const [user, setuser] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [users, setusers] = useState([]);
  const columns = createColumns(setEditOpen, setuser, reload, setReload);
  const fetchData = async () => {
    const res = await privateAxios.get("user");
    const apiData = await res.data;
    console.log(res.data);
    setusers(apiData);
    // console.log(users)
  };
  useEffect(() => {
    fetchData();
    console.log("this is users"+ users);
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
            getRowId={(row) => row.id}
            rows={users}
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
        user={user}
        reload={reload}
        setReload={setReload}
      />
    </>
  );
}
