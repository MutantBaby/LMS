import React, { FC } from "react";
import CoursePlayer from "@/utils/CoursePlayer";
import { styles } from "@/styles";
import Ratings from "@/utils/Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

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
  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;

  const prevButton = () => {
    setActive(active - 1);
  };

  const createCourse = () => {
    handleCourseCreate();
  };

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
          <h1 className="pl=5 text-[25px]">
            {courseData?.price === 0 ? "Free" : courseData?.price + "$"}
          </h1>
          <h5 className="pl=3 text-[20px] mt-2 line-through opacity-80">
            {courseData?.price === 0 ? "Free" : courseData?.price + "$"}
          </h5>
          <h4 className="pl=5 pt-4 text-[22px] ">{discountPercentage}% Off</h4>
        </div>

        <div className="flex items-center">
          <div
            className={`${styles.button} !w-[180px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}>
            Buy Now {courseData?.price}$
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="Discount Code..."
            className={`${styles.input} !1500px:w-[50%] !1100px:w-[60%] ml-3 mt-0`}
          />
          <div
            className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer`}>
            Apply
          </div>
        </div>

        <p className="pb-1">* Source Code Included</p>
        <p className="pb-1">* Life Time Access</p>
        <p className="pb-1">* Certificate Of Completion</p>
        <p className="pb-3 800px:pb-1">* Premium Support</p>
      </div>

      <div className="w-full">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[25px] font-Poppins font-[600]">
            {courseData?.name}
          </h1>

          <div className="flex justify-between items-center pt-3">
            <div className="flex items-center">
              <Ratings rating={0} />
              <h5>0 Reviews</h5>
            </div>

            <h5>0 Students</h5>
          </div>

          <br />
          <h1 className="text-[25px] font-Poppins font-[600]">
            What you will learn from this course?
          </h1>
        </div>

        {courseData?.benefits?.map((items: any, index: number) => (
          <div className="flex w-full 800px:items-center py-2" key={index}>
            <div className="w-[15px] mr-1">
              <IoCheckmarkDoneOutline size={20} />
            </div>

            <p className="pl-2">{items?.title}</p>
          </div>
        ))}

        <br />
        <br />
        <h1 className="text-[25px] font-Poppins font-[600]">
          What are the PreRequisites for this course?
        </h1>
        {courseData?.preRequisites?.map((items: any, index: number) => (
          <div className="flex w-full 800px:items-center py-2" key={index}>
            <div className="w-[15px] mr-1">
              <IoCheckmarkDoneOutline size={20} />
            </div>

            <p className="pl-2">{items?.title}</p>
          </div>
        ))}

        <br />
        <br />
        <div className="w-full">
          <h1 className="text-[25px] font-Poppins font-[600]">
            Course Details
          </h1>

          {courseData?.desc}
        </div>

        <br />
        <br />
      </div>

      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] cursor-pointer h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 "
          onClick={() => prevButton()}>
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] cursor-pointer h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 "
          onClick={() => createCourse()}>
          Next
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
