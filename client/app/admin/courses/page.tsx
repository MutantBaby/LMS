"use client";

import AdminSideBar from "@/app/_components/Admin/AdminSideBar";
import AllCourses from "@/app/_components/Admin/Course/AllCourses";
import DashboardHero from "@/app/_components/Admin/DashboardHero";
import AdminProtectedHook from "@/hooks/useAdminProtectedHook";
import Heading from "@/utils/Heading";
import React, { FC } from "react";

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
          <AllCourses />
        </div>
      </div>
    </AdminProtectedHook>
  );
};

export default page;
