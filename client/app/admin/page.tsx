"use client";

import { FC } from "react";

import Heading from "@/utils/Heading";
import AdminSideBar from "../_components/Admin/AdminSideBar";
import AdminProtectedHook from "@/hooks/useAdminProtectedHook";
import DashboardHero from "../_components/Admin/DashboardHero";

interface Props {}

const Page: FC<Props> = () => {
  return (
    <AdminProtectedHook>
      <Heading
        title={`Admin Panel`}
        description="Learn Online Courses"
        keywords="Programming, MERN, MEAN, Python"
      />

      <div className="flex h-[200vh]">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSideBar />
        </div>

        <div className="w-[85]">
          <DashboardHero />
        </div>
      </div>
    </AdminProtectedHook>
  );
};

export default Page;
