import React, { FC } from "react";

import { IUser } from "@/types";
import { useAppSelector } from "@/app/_redux";
import Ratings from "@/utils/Ratings";
import {
  IoCheckmarkCircleOutline,
  IoCheckmarkDoneOutline,
} from "react-icons/io5";

type Props = {
  data: any;
};

const CourseDetails: FC<Props> = ({ data }) => {
  const { user }: { user: IUser } = useAppSelector(
    (state: { auth: { user: IUser } }) => state.auth
  );
  const discountPercentage =
    ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;

  const discountPercentagePrice = discountPercentage.toFixed(0);
  const isPurchased =
    user &&
    user?.courses?.find((item) => String(item.courseId) === String(data?._id));

  const handleOrder = (e: any) => {};

  return (
    <div>
      <div className="w-[90%] 800px:w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              {data.name}
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
            {/* courseLIST */}
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
                            {/* {item?.userId?.name?.slice(0, 1)} */}
                            {/* {console.log("item", item)} */}
                          </h1>
                        </div>
                      </div>

                      <div className="hidden 800px:block pl-2">
                        <div className="flex center">
                          <h5 className="text-[18px] font-Poppins pr-2 text-black dark:text-white"></h5>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
