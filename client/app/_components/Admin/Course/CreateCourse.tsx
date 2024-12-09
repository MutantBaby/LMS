"use client";

import React, { FC, useState } from "react";

import CourseOptions from "./CourseOptions";
import CourseInformation from "./CourseInformation";
import CourseData from "./CourseData";

type Props = {};

const CreateCourse: FC<Props> = () => {
  const [active, setActive] = useState(1);
  const [courseData, setCourseData] = useState({});
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [preRequisites, setPreRequisites] = useState([{ title: "" }]);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    tags: "",
    price: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
    description: "",
    estimatedPrice: "",
  });
  const [courseContentData, setCourseContentData] = useState([
    {
      title: "",
      videoUrl: "",
      suggestion: "",
      description: "",
      videoSection: "",
      links: [{ title: "", url: "" }],
    },
  ]);

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            active={active}
            setActive={setActive}
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
          />
        )}

        {active === 1 && (
          <CourseData
            active={active}
            setActive={setActive}
            benefits={benefits}
            preRequisites={preRequisites}
            setBenefits={setBenefits}
            setPreRequisites={setPreRequisites}
          />
        )}
      </div>

      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
