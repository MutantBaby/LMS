import Link from "next/link";
import React, { FC, useState } from "react";
import { format } from "timeago.js";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

import { IUser } from "@/types";
import { styles } from "@/styles";
import Ratings from "@/utils/Ratings";
import { useAppSelector } from "@/app/_redux";
import CoursePlayer from "@/utils/CoursePlayer";
import CourseContentList from "./CourseContentList";

type Props = {
  data: any;
};

const CourseDetails: FC<Props> = ({ data }) => {
  const { user }: { user: IUser } = useAppSelector(
    (state: { auth: { user: IUser } }) => state.auth
  );
  const [open, setOpen] = useState(false);

  const discountPercentage =
    ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;

  const discountPercentagePrice = discountPercentage.toFixed(0);
  const isPurchased =
    user &&
    user?.courses?.find((item) => String(item.courseId) === String(data?._id));

  const handleOrder = (e: any) => {
    setOpen(true);
  };

  return (
    <div>
      <div className="w-[90%] 800px:w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              {data?.name!}
            </h1>

            <div className="flex justify-between items-center pt-3">
              <div className="flex items-center">
                <Ratings rating={data?.ratings} />
                <h5 className="text-black dark:text-white">
                  {data?.reviews?.length} Reviews
                </h5>
              </div>

              <h5 className="text-black dark:text-white">
                {data?.purchased} Students
              </h5>
            </div>

            <br />
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              What you will learn from this course?
            </h1>

            <div>
              {data?.benefits.map((item: any, index: number) => (
                <div
                  className="flex w-full 800px:items-center py-2"
                  key={index}>
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline className="text-black dark:text-white" />
                  </div>

                  <p className="pl-2 text-black dark:text-white">
                    {item.title}
                  </p>
                </div>
              ))}
              <br />
              <br />
            </div>

            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              What are the preRequisites for the students in this course?
            </h1>

            <div>
              {data?.preRequisites?.map((item: any, index: number) => (
                <div
                  className="flex w-full 800px:items-center py-2"
                  key={index}>
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline className="text-black dark:text-white" />
                  </div>

                  <p className="pl-2 text-black dark:text-white">
                    {item.title}
                  </p>
                </div>
              ))}
              <br />
              <br />
            </div>

            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              Course Overview
            </h1>

            <CourseContentList data={data?.courseData} isDemo={true} />

            <br />
            <br />

            {/* course description */}
            <div className="w-full">
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                Course Details
              </h1>
              <p className="text-[18px] mt-[20px] whitespaces-per-line w-full overflow-hidden text-black dark:text-white">
                {data?.desc}
              </p>
            </div>
            <br />
            <br />

            <div className="w-full">
              <div className="800px:flex items-center">
                <Ratings rating={data?.ratings} />
                <div className="mb-2 800px:mb-[unset]" />

                <h5 className="text-[25px] font-Poppins text-black dark:text-white">
                  {Number.isInteger(data?.ratings)
                    ? data?.ratings?.toFixed(1)
                    : data?.ratings?.toFixed(2)}
                  Course Rating - {data?.reviews?.length} Reviews
                </h5>
              </div>
              <br />

              {(data?.reviews && [...data?.reviews].reverse())?.map(
                (item: any, index: number) => (
                  <div className="w-full pb-4" key={index}>
                    <div className="flex">
                      <div className="w-[50px] h-[50px]">
                        <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                          <h1 className="uppercase text-[18px] text-black dark:text-white">
                            {item?.user?.name?.slice(0, 1)}
                          </h1>
                        </div>
                      </div>

                      <div className="hidden 800px:block pl-2">
                        <div className="flex center">
                          <h5 className="text-[18px] font-Poppins pr-2 text-black dark:text-white">
                            {item?.user?.name}
                          </h5>
                          <Ratings rating={item?.rating} />
                        </div>

                        <p className="text-black dark:text-white">
                          {item?.comment}
                        </p>

                        <small className="text-black dark:text-white">
                          {format(item.createdAt)}
                        </small>
                      </div>

                      <div className="pl-2 flex 800px:hidden items-center">
                        <h5 className="text-[18px] font-Poppins pr-2 text-black dark:text-white">
                          {item?.user?.name}
                        </h5>
                        <Ratings rating={item?.rating} />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="w-full 800px:w-[35%] relative">
            <div className="sticky top-[100px] left-0 z-50 w-full">
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />

              <div className="flex items-center">
                <h1 className="pt-5 text-[25px] text-black dark:text-white">
                  {data?.price === 0 ? "Free" : `$${data?.price}`}
                </h1>

                <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white">
                  {data?.estimatedPrice}$
                </h5>
                <h4 className="pl-5 pt-4 text-[22px] text-black dark:text-white">
                  {discountPercentagePrice}% Off
                </h4>
              </div>

              <div className="flex items-center">
                {isPurchased ? (
                  <Link
                    href={`/course-access/${data?._id}`}
                    className={`${styles?.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}>
                    Enter to Course
                  </Link>
                ) : (
                  <div
                    className={`${styles?.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}>
                    Buy Now {data?.price}
                  </div>
                )}
              </div>

              <p className="pb-1 text-black dark:text-white">
                - Source Code included
              </p>
              <p className="pb-1 text-black dark:text-white">
                - Full lifetime access
              </p>
              <p className="pb-1 text-black dark:text-white">
                - Certificate of completion
              </p>
              <p className="pb-1 text-black dark:text-white">
                - Premium Support
              </p>
            </div>
          </div>
        </div>
      </div>

      <>
      </>
    </div>
  );
};

export default CourseDetails;
