"use client";

import { FC, use } from "react";
import Heading from "@/utils/Heading";
import AdminSideBar from "@/app/_components/Admin/AdminSideBar";
import EditHero from "@/app/_components/Admin/Customzation/EditHero";
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
          <EditHero />
        </div>
      </div>
    </div>
  );
};

export default Page;
