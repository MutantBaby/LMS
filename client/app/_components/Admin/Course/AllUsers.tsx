"use client";

import React, { FC, use, useEffect, useState } from "react";
import { format } from "timeago.js";
import { useTheme } from "next-themes";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";

import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/app/_redux/features/user/userApi";
import { styles } from "@/styles";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type Props = {
  isTeam?: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const { data, isLoading, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [
    updateUserRole,
    {
      error: errorForRole,
      isError: isErrorForRole,
      isSuccess: isSuccessForRole,
    },
  ] = useUpdateUserRoleMutation();
  const [
    deleteUser,
    {
      error: errorForDelete,
      isError: isErrorForDelete,
      isSuccess: isSuccessForDelete,
    },
  ] = useDeleteUserMutation();

  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("user");
  const [open, setOpen] = useState(false);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => (
        <Button
          onClick={() => {
            setOpen(!open);
            setUserId(params.row.id);
          }}>
          <AiOutlineDelete size={20} className="dark:text-white  text-black" />
        </Button>
      ),
    },
    {
      field: "mail",
      headerName: "Mail",
      flex: 0.2,
      renderCell: (params: any) => (
        <Button>
          <a href={`mailto:${params.row.email}`}>
            <AiOutlineMail size={20} className="dark:text-white  text-black" />
          </a>
        </Button>
      ),
    },
  ];

  const rows: any[] = [];

  if (isTeam) {
    const newData =
      data && data?.users?.filter((item: any) => item.role === "admin");

    newData?.forEach((item: any) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        courses: item.courses.length,
        created_at: format(item.createdAt, "en_US"),
      });
    });
  } else {
    data &&
      data.users?.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt, "en_US"),
        });
      });
  }

  const handleDelete = async () => {
    try {
      const id = userId;
      await deleteUser(id);
      setOpen(false);
    } catch (err) {
      console.log("Error in AllUsers: ", err);
    }
  };

  const handleRole = async () => {
    try {
      const data = { email, role };
      await updateUserRole(data);
      setActive(false);
    } catch (err) {
      console.log("Error in AllUsers: ", err);
    }
  };

  useEffect(() => {
    if (isSuccessForRole) {
      refetch();
      toast.success("User Role Updated successfully!");
      setActive(false);
    }

    if (isSuccessForDelete) {
      refetch();
      toast.success("User Deleted successfully!");
      setOpen(false);
    }

    if (isErrorForRole || isErrorForDelete)
      if (("data" in errorForRole! || "data" in errorForDelete!) as any) {
        const errorData =
          ((errorForRole as FetchBaseQueryError).data as any) ||
          ((errorForDelete as FetchBaseQueryError).data as any);
        toast.error(errorData.message);
      } else toast.error("Some Error Occured");
  }, [isSuccessForRole, isSuccessForDelete]);

  return (
    <div className="mt-[120px]">
      <Box m="20px">
        <div className="flex z-10 w-full justify-end">
          <div
            className={`!${styles.button} !w-[220px]`}
            onClick={() => setActive(!active)}>
            Add a member
          </div>
        </div>

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

        {active && (
          <Modal
            open={active}
            onClose={() => setActive(!active)}
            aria-labelledby={"modal-modal-title"}
            aria-describedby={"modal-modal-description"}>
            <Box
              className={` absolute top-[30%] left-[50%] -translate-x-1/2 dark:bg-[#181f35] bg-[#a4a9fc] p-3 rounded-lg`}>
              <h1 className={`${styles.title}`}>
                Enter Email you want to change
              </h1>

              <div>
                <div>
                  <label className={`${styles.label} !text-left`}>
                    Enter Email:
                  </label>
                  <input
                    type="text"
                    placeholder="example@mail.com"
                    onClick={() => setActive(!open)}
                    className={`${styles.input} h-[30px]`}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <br />
                <div>
                  <label
                    htmlFor="role"
                    className={`${styles.label} !text-left`}>
                    Choose a Role:
                    <select
                      id="role"
                      name="role"
                      defaultValue="user"
                      onChange={(e) => setRole(e.target.value)}
                      className={`${styles.input} h-[30px] dark:!bg-[#2d395b] `}>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </label>
                </div>

                <input
                  type="submit"
                  onClick={handleRole}
                  className={`${styles.button} mt-3 h-[30px]`}
                />
              </div>
            </Box>
          </Modal>
        )}

        {open && (
          <Modal
            open={open}
            onClose={() => setOpen(!open)}
            aria-labelledby={"modal-modal-title"}
            aria-describedby={"modal-modal-description"}>
            <Box
              className={`absolute top-[50%] left-[50%] -translate-x-1/2 bg-[#07090f] p-3 rounded-lg`}>
              <h1 className={`${styles.title}`}>
                Are you sure you want to delete this user?
              </h1>
              <div className={`flex w-full items-center justify-between mb-6`}>
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
    </div>
  );
};

export default AllUsers;
