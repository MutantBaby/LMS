"use client";

import CourseDetailsPage from "@/app/_components/course/CourseDetailsPage";
import React, { FC, use } from "react";

type Props = {};

const Page: FC<Props> = ({ params }: any) => {
  const paramsVal: any = use(params);
  const id = paramsVal?.id;

  return (
    <div>
      <CourseDetailsPage id={id} />
    </div>
  );
};

export default Page;
