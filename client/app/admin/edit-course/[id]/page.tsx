"use client";

import { FC, use } from "react";
import Heading from "@/utils/Heading";
import AdminSideBar from "@/app/_components/Admin/AdminSideBar";
import EditCourse from "@/app/_components/Admin/Course/EditCourse";
import DashboardHeader from "@/app/_components/Admin/DashboardHeader";

interface Props {}

const Page: FC<Props> = ({ params }: any) => {
  const paramsVal: any = use(params);
  const id = paramsVal?.id;

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
