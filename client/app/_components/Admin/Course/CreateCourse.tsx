"use client";

import React, { FC, useEffect, useState } from "react";

import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import CourseData from "./CourseData";
import CourseOptions from "./CourseOptions";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import CourseInformation from "./CourseInformation";
import { useCreateCourseMutation } from "@/app/_redux/features/courses/courseApi";

type Props = {};

interface ICourseData {
  desc: string;
  title: string;
  videoUrl: string;
  suggestion: string;
  videoLength: number;
  videoSection: string;
  links: { url: string; title: string }[];
}

interface IData {
  name: string;
  tags: string;
  desc: string;
  price: string;
  demoUrl: string;
  diffLevel: string;
  totalVideos: number;
  estimatedPrice: string;
  benefits: { title: string }[];
  categories: { title: string }[];
  preRequisites: { title: string }[];
  thumbnail: { publicId: string; url: string };
  courseData: ICourseData[];
}

const CreateCourse: FC<Props> = () => {
  const [createCourse, { isError, isSuccess, error, isLoading }] =
    useCreateCourseMutation();

  const [active, setActive] = useState(0);
  const [courseData, setCourseData] = useState({});
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [categories, setCategories] = useState([{ title: "" }]);
  const [preRequisites, setPreRequisites] = useState([{ title: "" }]);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    desc: "",
    tags: "",
    price: "",
    demoUrl: "",
    diffLevel: "",
    thumbnail: "",
    categories: "",
    estimatedPrice: "",
  });
  const [courseContentData, setCourseContentData] = useState<ICourseData[]>([
    {
      desc: "",
      title: "",
      videoUrl: "",
      suggestion: "",
      videoLength: 0,
      videoSection: "",
      links: [{ title: "", url: "" }],
    },
  ]);

  const handleSubmit = () => {
    // first format the data
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    const formattedCategories = benefits.map((categorie) => ({
      title: categorie.title,
    }));
    const formattedPreRequisites = preRequisites.map((preRequisite) => ({
      title: preRequisite.title,
    }));
    const formattedCourseContentData = courseContentData.map((data) => ({
      desc: data.desc,
      title: data.title,
      videoUrl: data.videoUrl,
      suggestion: data.suggestion,
      videoLength: data.videoLength,
      videoSection: data.videoSection,
      links: data.links.map((link) => ({
        url: link.url,
        title: link.title,
      })),
    }));

    const data: IData = {
      name: courseInfo.name,
      tags: courseInfo.tags,
      desc: courseInfo.desc,
      price: courseInfo.price,
      demoUrl: courseInfo.demoUrl,
      benefits: formattedBenefits,
      categories: formattedCategories,
      diffLevel: courseInfo.diffLevel,
      totalVideos: courseContentData.length,
      preRequisites: formattedPreRequisites,
      courseData: formattedCourseContentData,
      estimatedPrice: courseInfo.estimatedPrice,
      thumbnail: { url: courseInfo.thumbnail, publicId: "" },
    };

    setCourseData(data);
  };

  const handleCourseCreate = async (e: any) => {
    try {
      const data = courseData;

      if (!isLoading) await createCourse(data);
    } catch (err) {
      console.log("Error 1 CreateCourse: ", err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Created Successfully");
      redirect("/admin/courses");
    }

    if (isError)
      if (("data" in error) as any) {
        const errorData = (error as FetchBaseQueryError).data as any;
        toast.error(errorData.message);
      } else toast.error("Some Error Occured");
  }, [isSuccess]);

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
            benefits={benefits}
            setActive={setActive}
            categories={categories}
            setBenefits={setBenefits}
            preRequisites={preRequisites}
            setCategories={setCategories}
            setPreRequisites={setPreRequisites}
          />
        )}

        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}

        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreateOrUpdate={handleCourseCreate}
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
