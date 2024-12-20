"use client";

import "react-pro-sidebar/dist/css/styles.css";
import Link from "next/link";
import { useTheme } from "next-themes";
import { FC, useEffect, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";

import Web from "@mui/icons-material/Web";
import Quiz from "@mui/icons-material/Quiz";
import Groups from "@mui/icons-material/Groups";
import Wysiwyg from "@mui/icons-material/Wysiwyg";
import Settings from "@mui/icons-material/Settings";
import ExitToApp from "@mui/icons-material/ExitToApp";
import VideoCall from "@mui/icons-material/VideoCall";
import MapOutlined from "@mui/icons-material/MapOutlined";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import OndemandVideo from "@mui/icons-material/OndemandVideo";
import ManageHistory from "@mui/icons-material/ManageHistory";
import PeopleOutlined from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlined from "@mui/icons-material/ReceiptOutlined";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import BarChartOutlined from "@mui/icons-material/BarChartOutlined";

import { IUser } from "@/types";
import { useAppSelector } from "@/app/_redux";
import avatarDefault from "@/assets/avatar.png";
import Image from "next/image";

interface ItemProps {
  to: string;
  title: string;
  selected: string;
  icon: JSX.Element;
  setSelected: any;
}

interface Props {}

const Item: FC<ItemProps> = ({ to, title, selected, icon, setSelected }) => {
  return (
    <MenuItem
      icon={icon}
      active={selected === title}
      onClick={() => setSelected(title)}>
      <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
      <Link href={to}></Link>
    </MenuItem>
  );
};

const AdminSideBar: FC<Props> = () => {
  const { theme, setTheme } = useTheme();
  const { user }: { user: IUser } = useAppSelector((state) => state.auth);

  const [logout, setLogout] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const logoutHandle = () => {
    setLogout(true);
  };

  return (
    <Box
      className=" !bg-white dark:bg-[#1f1f1f]"
      sx={{
        "& .pro-sidebar-inner": {
          backgroundColor: `${
            theme === "dark" ? "#111C43 !important" : "#fff !important"
          }`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfd !important",
        },
        "& .pro-menu-item:active": {
          color: "#6870fa !important",
        },
        "& .pro-inner-item": {
          opacity: 1,
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-menu-item": {
          color: `${theme !== "dark" && "#000"}`,
        },
      }}>
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          top: 0,
          left: 0,
          height: "100vh",
          position: "fixed",
          width: isCollapsed ? "0%" : "16%",
        }}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIos /> : undefined}
            style={{ margin: "10px 0 20px 0" }}>
            {!isCollapsed && (
              <Box
                ml={"15px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}>
                <Link href={"/"}>
                  <h3 className="text-[25px] font-Poppins uppercase dark:text-white text-black">
                    LE-Course
                  </h3>
                </Link>

                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="inline-block">
                  <ArrowBackIos className="dark:text-white text-black" />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb={"25px"}>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}>
                <Image
                  alt="profile-user"
                  width={100}
                  height={100}
                  src={
                    user?.avatar ? (user?.avatar?.url as string) : avatarDefault
                  }
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "3px solid #6870fa",
                  }}
                />
              </Box>

              <Box textAlign={"center"}>
                <Typography
                  variant="h4"
                  sx={{ m: "10px 0 0 0" }}
                  className="!text-[20px] text-black dark:text-white">
                  {user?.name}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{ m: "10px 0 0 0" }}
                  className="!text-[20px] text-black dark:text-white">
                  {user?.role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              to="/admin"
              title="Dashboard"
              selected={selected}
              icon={<HomeOutlined />}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 25px" }}
              className="!text-[18px] text-black dark:text-white capitalize !font-[400]">
              {!isCollapsed && "Data"}
            </Typography>

            <Item
              to="/admin/users"
              title="User"
              selected={selected}
              icon={<Groups />}
              setSelected={setSelected}
            />

            <Item
              to="/admin/invoices"
              title="Invoices"
              selected={selected}
              icon={<ReceiptOutlined />}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 25px" }}
              className="!text-[18px] text-black dark:text-white capitalize !font-[400]">
              {!isCollapsed && "Content"}
            </Typography>

            <Item
              to="/admin/create-course"
              title="Create Course"
              selected={selected}
              icon={<VideoCall />}
              setSelected={setSelected}
            />

            <Item
              to="/admin/courses"
              title="Live Course"
              selected={selected}
              icon={<OndemandVideo />}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 25px" }}
              className="!text-[18px] text-black dark:text-white capitalize !font-[400]">
              {!isCollapsed && "Customize"}
            </Typography>

            <Item
              to="/admin/hero"
              title="Hero"
              selected={selected}
              icon={<Web />}
              setSelected={setSelected}
            />

            <Item
              to="/admin/faq"
              title="FAQ"
              selected={selected}
              icon={<Quiz />}
              setSelected={setSelected}
            />

            <Item
              to="/admin/categories"
              title="Categories"
              selected={selected}
              icon={<Wysiwyg />}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 25px" }}
              className="!text-[18px] text-black dark:text-white capitalize !font-[400]">
              {!isCollapsed && "Controllers"}
            </Typography>

            <Item
              to="/admin/team"
              title="Manage Team"
              selected={selected}
              icon={<PeopleOutlined />}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 25px" }}
              className="!text-[18px] text-black dark:text-white capitalize !font-[400]">
              {!isCollapsed && "Analytics"}
            </Typography>

            <Item
              to="/admin/course-analytics"
              title="Course Analytics"
              selected={selected}
              icon={<BarChartOutlined />}
              setSelected={setSelected}
            />

            <Item
              to="/admin/orders-analytics"
              title="Orders Analytics"
              selected={selected}
              icon={<MapOutlined />}
              setSelected={setSelected}
            />

            <Item
              to="/admin/user-analytics"
              title="User Analytics"
              selected={selected}
              icon={<ManageHistory />}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 25px" }}
              className="!text-[18px] text-black dark:text-white capitalize !font-[400]">
              {!isCollapsed && "Extras"}
            </Typography>

            <div onClick={logoutHandle}>
              <Item
                to="/"
                title="Logout"
                selected={selected}
                icon={<ExitToApp />}
                setSelected={setSelected}
              />
            </div>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default AdminSideBar;
