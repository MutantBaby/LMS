"use client";

import React, { FC, useEffect, useState } from "react";
import { format } from "timeago.js";
import { useTheme } from "next-themes";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/app/_redux/features/courses/courseApi";
import Loading from "../../Loading";
import { styles } from "@/styles";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Link from "next/link";

type Props = {};

const AllCourses: FC<Props> = () => {
  const { theme, setTheme } = useTheme();
  const { data, refetch, isLoading } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [
    deleteCourse,
    {
      error: errorForDelete,
      isError: isErrorForDelete,
      isSuccess: isSuccessForDelete,
    },
  ] = useDeleteCourseMutation();

  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "rating", headerName: "Ratings", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => (
        <Link href={`/admin/edit-course/${params.row.id}`} passHref>
          <AiOutlineEdit size={20} className="dark:text-white text-black" />
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => (
        <Button
          onClick={() => {
            setOpen(!open);
            setCourseId(params.row.id);
          }}>
          <AiOutlineDelete size={20} className="dark:text-white  text-black" />
        </Button>
      ),
    },
  ];

  const rows: any[] = [];

  {
    data &&
      data.courses?.forEach((item: any) => {
        rows.push({
          id: item._id,
          title: item.name,
          rating: item.rating,
          purchased: item.purchased,
          created_at: format(item.createdAt, "en_US"),
        });
      });
  }

  const handleDelete = async () => {
    try {
      const id = courseId;
      await deleteCourse(id);
      setOpen(false);
    } catch (err) {
      console.log("Error in AllCourses: ", err);
    }
  };

  useEffect(() => {
    if (isSuccessForDelete) {
      refetch();
      toast.success("Course Deleted successfully!");
      setOpen(false);
    }

    if (isErrorForDelete)
      if (("data" in errorForDelete!) as any) {
        const errorData = (errorForDelete as FetchBaseQueryError).data as any;
        toast.error(errorData.message);
      } else toast.error("Some Error Occured");
  }, [isSuccessForDelete]);

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loading />
      ) : (
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
                  theme === "dark"
                    ? "#3e4396 !important"
                    : "#A4A9FC !important",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                color: theme === "dark" ? "#fff" : "black",
                backgroundColor:
                  theme === "dark"
                    ? "#3e4396 !important"
                    : "#A4A9FC !important",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor:
                  theme === "dark"
                    ? "#1F2A40 !important"
                    : "#F2F0F0 !important",
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

          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby={"modal-modal-title"}
              aria-describedby={"modal-modal-description"}>
              <Box
                className={`absolute top-[50%] !text-white left-[50%] -translate-x-1/2 p-3 bg-[#07090f] rounded-lg`}>
                <h1 className={`${styles.title} !text-white`}>
                  Are you sure you want to delete this course?
                </h1>
                <div
                  className={`flex w-full items-center justify-between mb-6`}>
                  <div
                    onClick={() => setOpen(!open)}
                    className={`${styles.button} !w-[120px] h-[30px] !bg-[#57c7A3]`}>
                    Cancel
                  </div>

                  <div
                    onClick={handleDelete}
                    className={`${styles.button} !w-[120px] h-[30px] !bg-[#c75757]`}>
                    Delete
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
