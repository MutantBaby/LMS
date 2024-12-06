"use client";

import React, { FC, useState } from "react";

type Props = {};

const CreateCourse: FC<Props> = () => {
  const [active, setActive] = useState(0);
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

  return <div>CreateCourse</div>;
};

export default CreateCourse;
