import React, { FC } from "react";
import CoursePlayer from "@/utils/CoursePlayer";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
};

const CoursePreview: FC<Props> = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
}) => {
  return (
    <div className="w-[90%] m-auto py-5 mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            title={courseData?.title}
            videoUrl={courseData?.demoUrl}
          />
        </div>

        <div className="flex items-center">
          <h1 className="pl=5"></h1>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
