import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import { DataGrid } from "@mui/x-data-grid";
import React, { FC, useEffect } from "react";
import { AiOutlineMail } from "react-icons/ai";

import Loading from "../../Loading";
import { useGetAllCoursesQuery } from "@/app/_redux/features/courses/courseApi";
import { useAllOrdersQuery } from "@/app/_redux/features/orders/ordersApi";
import { useGetAllUsersQuery } from "@/app/_redux/features/user/userApi";

type Props = {
  isDashboard?: boolean;
};

const AllVoices: FC<Props> = ({ isDashboard }) => {
  const { theme, setTheme } = useTheme();
  const { data: dataForAllUsers } = useGetAllUsersQuery({});
  const { data: dataForAllCourses } = useGetAllCoursesQuery({});
  const { isLoading, data: dataForAllOrders } = useAllOrdersQuery({});

  const [orderdata, setOrderData] = React.useState<any>([]);

  const colums: any = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.3 },
    ...(isDashboard
      ? []
      : [
          { field: "userEmail", headerName: "Email", flex: 1 },
          { field: "title", headerName: "Course Title", flex: 1 },
        ]),
    { field: "userPrice", headerName: "Price", flex: 0.5 },
    ...(isDashboard
      ? [{ field: "created_at", headerName: "Created At", flex: 0.5 }]
      : [
          {
            field: " ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => (
              <a href={`mailto:${params.row.userEmail}`}>
                <AiOutlineMail
                  size={20}
                  className="dark:text-white text-black"
                />
              </a>
            ),
          },
        ]),
  ];

  const rows: any = [];

  orderdata &&
    orderdata.forEach((item: any) => {
      rows.push({
        id: item._id,
        title: item.title,
        userPrice: item.price,
        userName: item.userName,
        userEmail: item.userEmail,
        created_at: item.createdAt,
      });
    });

  useEffect(() => {
    if (dataForAllOrders) {
      const temp = dataForAllOrders?.orders.map((item: any) => {
        const user = dataForAllUsers?.users.find(
          (user: any) => String(user._id) === String(item.userId)
        );
        const course = dataForAllCourses?.courses.find(
          (course: any) => String(course._id) === String(item.courseId)
        );

        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: `$` + course?.price,
        };
      });

      setOrderData(temp);
    }
  }, [dataForAllCourses, dataForAllOrders, dataForAllUsers]);

  return (
    <div className={!isDashboard ? "mt-[120px]" : "mt-[0px]"}>
      {isLoading ? (
        <Loading />
      ) : (
        <Box m={isDashboard ? "0" : "40px"}>
          <Box
            height={isDashboard ? "45vh" : "90vh"}
            m={isDashboard ? "0" : "40px 0 0 0"}
            overflow={"hidden"}
            sx={{
              "& .MuiDataGrid-root": { border: "none", outline: "none" },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderColor:
                  theme === "dark"
                    ? "1px solid #fffff30 !important"
                    : "1px solid #ccc !important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none !important",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: "none !important",
                color: theme === "dark" ? "#fff" : "#000",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9Fc",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none !important",
                color: theme === "dark" ? "#fff" : "#000",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9Fc",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? "#b7ebde !important" : "#000 !important",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButtom-text": {
                color: "#000 !important",
              },
              "& .css-5wdp45-MuiDataGrid-root .MuiDataGrid-container--top [role=row]":
                {
                  backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9Fc",
                },
            }}>
            <DataGrid
              rows={rows}
              columns={colums}
              checkboxSelection={isDashboard ? false : true}
              // components={isDashboard ? {} : { Toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllVoices;
