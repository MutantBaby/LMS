"use client";

import { styles } from "@/styles";
import React, { FC, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
  active: number;
  courseContentData: any;
  handleSubmit: () => void;
  setActive: (active: number) => void;
  setCourseContentData: (courseContentData: any) => void;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  handleSubmit,
  courseContentData,
  setCourseContentData,
}) => {
  const [activeSection, setActiveSection] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const handleCollapseToggle = (index: number) => {};

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form action="" onSubmit={handleSubmit}>
        {courseContentData.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <div key={index}>
              <div
                className={`w-full bg-[#cdc8c817] p-4 ${
                  showSectionInput ? "mt-10" : "mb-0"
                }`}>
                {showSectionInput && (
                  <div>
                    <div className="flex w-full items-center">
                      <input
                        type="text"
                        className={`text-[20px] font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none ${
                          item.videoSection === "Untitled Section"
                            ? "w-[170px]"
                            : "w-min"
                        }`}
                        value={item.videoSection}
                        onChange={(e: any) => {
                          const updateData = [...courseContentData];
                          updateData[index].videoSection = e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />

                      <BsPencil className="cursor-pointer dark:text-white text-black" />
                    </div>
                  </div>
                )}

                <div className="flex w-full items-center justify-between my-0">
                  {isCollapsed[index] ? (
                    <>
                      {item?.title ? (
                        <p className="font-Poppins dark:text-white text-black">
                          {index + 1}, {item.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}

                  {/* arrow btn for collasped */}
                  <div className="flex items-center ">
                    <AiOutlineDelete
                      onClick={() => {
                        if (index > 0) {
                          const updateData = [...courseContentData];
                          updateData.splice(index, 1);
                          setCourseContentData(updateData);
                        }
                      }}
                      className={`dark:text-white text-[20px] mr-2 text-black ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                    />
                    <MdOutlineKeyboardArrowDown
                      fontSize={"large"}
                      className="dark:text-white text-black"
                      style={{
                        transform: isCollapsed[index]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>

                {!isCollapsed[index] && (
                  <div className="my-3">
                    <label className={styles.label}>Video Title</label>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default CourseContent;
