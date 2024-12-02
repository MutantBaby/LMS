"use client";

import "react-pro-sidebar/dist/css/styles.css";
import { FC, useEffect, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";

import avatarDefault from "@/assets/avatar.png";

import {
  WebIcon,
  QuizIcon,
  GroupsIcon,
  WysiwygIcon,
  SettingsIcon,
  VideocallIcon,
  ExitToAppIcon,
  MapOutlinedIcon,
  HomeOutlinedIcon,
  ArrowBackIosIcon,
  OndemandVideoIcon,
  ManageHistoryIcon,
  PeopleOutlinedIcon,
  ArrowForwardIosIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
} from "./Icons";
import Link from "next/link";
import { IUser } from "@/types";
import { useAppSelector } from "@/app/_redux";
import { useTheme } from "next-themes";

interface ItemProps {
  to: string;
  title: string;
  selected: string;
  icon: JSX.Element;
  setSelected: (selected: any) => void;
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
      <ProSidebar collapsed={isCollapsed}></ProSidebar>
    </Box>
  );

  return <div>Admin Sidebar</div>;
};

export default AdminSideBar;
