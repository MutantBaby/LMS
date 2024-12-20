"use client";

import React, { FC } from "react";

import Heading from "@/utils/Heading";

import AdminProtectedHook from "@/hooks/useAdminProtectedHook";
import AdminSideBar from "@/app/_components/Admin/AdminSideBar";
import AllVoices from "@/app/_components/Admin/Order/AllVoices";
import DashboardHero from "@/app/_components/Admin/DashboardHero";

type Props = {};

const page: FC<Props> = () => {
  return (
    <AdminProtectedHook>
      <Heading
        title={`Admin Panel`}
        description="Learn Online Courses"
        keywords="Programming, MERN, MEAN, Python"
      />

      <div className="flex h-screen">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSideBar />
        </div>

        <div className="w-[85%]">
          <DashboardHero />
          <AllVoices />
        </div>
      </div>
    </AdminProtectedHook>
  );
};

export default page;
