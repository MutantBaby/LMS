"use client";

import { FC } from "react";
import Heading from "@/utils/Heading";
import AdminSideBar from "@/app/_components/Admin/AdminSideBar";
import DashboardHeader from "@/app/_components/Admin/DashboardHeader";
import CreateCourse from "@/app/_components/Admin/Course/CreateCourse";
import EditCourse from "@/app/_components/Admin/Course/EditCourse";

interface Props {}

const Page: FC<Props> = ({ params }: any) => {
  const id = params?.id;

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
          <EditCourse id={id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
