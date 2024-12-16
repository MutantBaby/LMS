"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

type Props = {};

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => (
        <Button>
          <AiOutlineEdit size={20} className="dark:text-white text-black" />
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => (
        <Button>
          <AiOutlineDelete size={20} className="dark:text-white  text-black" />
        </Button>
      ),
    },
  ];

  const rows = [
    {
      id: "1234",
      ratings: "5",
      title: "React",
      purchased: "30",
      created_at: "12/12/12",
    },
  ];

  return (
    <div className="mt-[120px]">
      <Box m="20px">
        <Box
          m="40px 0 0 0"
          height={"80vh"}
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              outline: "none",
            },
            "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
              color: theme === "dark" ? "white" : "black",
            },
            "& .MuiDataGrid-sortIcon": {
              color: theme === "dark" ? "white" : "black",
            },
            "& .MuiTablePagination-root": {
              color: theme === "dark" ? "white" : "black",
            },
            "& .name-column--cell": {
              color: theme === "dark" ? "white" : "black",
            },
            "& .MuiDataGrid--cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-row": {
              color: theme === "dark" ? "white" : "black",
              borderBottom:
                theme === "dark"
                  ? "1px solid #333 !important"
                  : "1px solid #ccc !important",
            },
            ".css-5wdp45-MuiDataGrid-root .MuiDataGrid-container--top [role=row]":
              {
                backgroundColor:
                  theme === "dark"
                    ? "#3e4396 !important"
                    : "#A4A9FC !important",
              },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: "none",
              color: theme === "dark" ? "white" : "black",
              backgroundColor:
                theme === "dark" ? "#3e4396 !important" : "#A4A9FC !important",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              color: theme === "dark" ? "#fff" : "black",
              backgroundColor:
                theme === "dark" ? "#3e4396 !important" : "#A4A9FC !important",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor:
                theme === "dark" ? "#1F2A40 !important" : "#F2F0F0 !important",
            },
            "& .MuiCheckbox-root": {
              color:
                theme === "dark" ? "#b7ebde !important" : "#000 !important",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: "#fff !important",
            },
          }}>
          <DataGrid checkboxSelection rows={rows} columns={columns} />
        </Box>
      </Box>
    </div>
  );
};

export default AllCourses;
