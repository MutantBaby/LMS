"use client";

import toast from "react-hot-toast";
import React, { FC, useEffect, useState } from "react";

import CourseData from "./CourseData";
import CourseOptions from "./CourseOptions";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import CourseInformation from "./CourseInformation";
import {
  useEditCourseMutation,
  useGetAllCoursesQuery,
} from "@/app/_redux/features/courses/courseApi";
import { redirect } from "next/navigation";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type Props = {
  id: string;
};

interface ICourseData {
  desc: string;
  title: string;
  videoUrl: string;
  suggestion: string;
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
  preRequisites: { title: string }[];
  thumbnail: { publicId: string; url: string };
  courseData: ICourseData[];
}

//! Check user course (match there ids)
//! Fix issue of edit (course deleted from db)

const EditCourse: FC<Props> = ({ id }) => {
  const [
    editCourse,
    { isError, isSuccess, error, isLoading: isLoadingForEdit },
  ] = useEditCourseMutation();
  const { data, isLoading: isLoadingForCourses } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [active, setActive] = useState(0);
  const [courseData, setCourseData] = useState({});
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [preRequisites, setPreRequisites] = useState([{ title: "" }]);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    desc: "",
    tags: "",
    price: "",
    demoUrl: "",
    diffLevel: "",
    thumbnail: "",
    estimatedPrice: "",
  });
  const [courseContentData, setCourseContentData] = useState<ICourseData[]>([
    {
      title: "",
      videoUrl: "",
      suggestion: "",
      desc: "",
      videoSection: "",
      links: [{ title: "", url: "" }],
    },
  ]);

  const handleSubmit = () => {
    // first format the data
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    const formattedPreRequisites = preRequisites.map((preRequisite) => ({
      title: preRequisite.title,
    }));
    const formattedCourseContentData = courseContentData.map(
      (courseContentData) => ({
        desc: courseContentData.desc,
        title: courseContentData.title,
        videoUrl: courseContentData.videoUrl,
        suggestion: courseContentData.suggestion,
        videoSection: courseContentData.videoSection,
        links: courseContentData.links.map((link) => ({
          url: link.url,
          title: link.title,
        })),
      })
    );

    const data: IData = {
      name: courseInfo.name,
      tags: courseInfo.tags,
      desc: courseInfo.desc,
      price: courseInfo.price,
      demoUrl: courseInfo.demoUrl,
      benefits: formattedBenefits,
      diffLevel: courseInfo.diffLevel,
      totalVideos: courseContentData.length,
      preRequisites: formattedPreRequisites,
      courseData: formattedCourseContentData,
      estimatedPrice: courseInfo.estimatedPrice,
      thumbnail: { url: courseInfo.thumbnail, publicId: "" },
    };

    setCourseData(data);
  };

  const handleCourseUpdate = async (e: any) => {
    try {
      const data = { id, courseData };

      if (!isLoadingForEdit) await editCourse(data as any);
    } catch (err) {
      console.log("Error 1 EditCourse: ", err);
    }
  };

  const editCourseData = data?.courses.find(
    (course: any) => course._id === id
  ) as IData | undefined;

  useEffect(() => {
    if (editCourseData) {
      setBenefits(editCourseData?.benefits);
      setPreRequisites(editCourseData?.preRequisites);
      setCourseContentData(editCourseData?.courseData);
      setCourseInfo({
        name: editCourseData?.name,
        desc: editCourseData?.desc,
        tags: editCourseData?.tags,
        price: editCourseData?.price,
        demoUrl: editCourseData?.demoUrl,
        diffLevel: editCourseData?.diffLevel,
        thumbnail: editCourseData?.thumbnail?.url,
        estimatedPrice: editCourseData?.estimatedPrice,
      });
    }
  }, [editCourseData]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Updated Successfully");
      redirect("/admin/courses");
    }

    if (isError)
      if (("data" in error) as any) {
        const errorData = (error as FetchBaseQueryError).data as any;
        toast.error(errorData.message);
      } else toast.error("Some Error Occured");
  }, [isSuccess]);

  console.log("courseData", courseData);

  return (
    <div suppressHydrationWarning className="w-full flex min-h-screen">
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
            isEdit={true}
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreateOrUpdate={handleCourseUpdate}
          />
        )}
      </div>

      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
