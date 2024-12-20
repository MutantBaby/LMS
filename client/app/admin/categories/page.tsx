"use client";

import { FC } from "react";
import Heading from "@/utils/Heading";
import AdminSideBar from "@/app/_components/Admin/AdminSideBar";
import DashboardHeader from "@/app/_components/Admin/DashboardHeader";
import EditFaq from "@/app/_components/Admin/Customzation/EditFaq";
import EditCategories from "@/app/_components/Admin/Customzation/EditCategories";

interface Props {}

const Page: FC<Props> = () => {
  return (
    <div>
      <Heading
        title={`Admin Panel`}
        description="Learn Online Courses"
        keywords="Programming, MERN, MEAN, Python"
      />

      <div className="flex">
        <div className="1500px:w-[16%] w-1/5 ">
          <AdminSideBar />
        </div>

        <div className="w-[85%]">
          <DashboardHeader />
          <EditCategories />
        </div>
      </div>
    </div>
  );
};

export default Page;
