"use client";

import { styles } from "@/styles";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
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

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updateData = [...courseContentData];
    updateData[index].links.splice(linkIndex, 1);
    setCourseContentData(updateData);
  };

  const handleAddLink = (index: number) => {
    const updateData = [...courseContentData];
    updateData[index].links.push({ title: "", url: "" });
    setCourseContentData(updateData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.videoUrl === "" ||
      item.description === "" ||
      item.links[0].url === "" ||
      item.links[0].title === ""
    ) {
      return toast.error("Please Fill All The Fields");
    } else {
      let newVideoSection = "";

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        if (lastVideoSection) newVideoSection = lastVideoSection;
      }
      setCourseContentData([
        ...courseContentData,
        {
          title: "",
          videoUrl: "",
          description: "",
          videoSection: newVideoSection,
          links: [{ title: "", url: "" }],
        },
      ]);
    }
  };

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
                  showSectionInput ? "mt-10" : "mb-10"
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
                        placeholder="Untitled Section"
                        value={item?.videoSection}
                        onChange={(e: any) => {
                          const updateData = [...courseContentData];
                          updateData[index].videoSection = e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />

                      <BsPencil className="cursor-pointer dark:text-white text-black" />
                    </div>
                    <br />
                  </div>
                )}

                <div className="w-full flex items-center justify-between my-0">
                  <div>
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
                  </div>

                  {/* arrow btn for collasped */}
                  <div className="flex items-center">
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
                  <>
                    <div className="my-3">
                      <label className={styles.label}>Video Title</label>
                      <input
                        type="text"
                        className={`${styles.input}`}
                        placeholder="Project Planning"
                        value={item?.title}
                        onChange={(e: any) => {
                          const updateData = [...courseContentData];
                          updateData[index].title = e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label className={styles.label}>Video Url</label>
                      <input
                        type="text"
                        className={`${styles.input}`}
                        placeholder="Watch123"
                        value={item?.videoUrl}
                        onChange={(e: any) => {
                          const updateData = [...courseContentData];
                          updateData[index].videoUrl = e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label className={styles.label}>Video Description</label>
                      <textarea
                        cols={8}
                        rows={5}
                        className={`${styles.input} !h-min py-2`}
                        placeholder="Edit Description..."
                        value={item?.description}
                        onChange={(e: any) => {
                          const updateData = [...courseContentData];
                          updateData[index].description = e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />
                      <br />
                    </div>

                    {item?.links?.map((link: any, linkIndex: number) => (
                      <div key={linkIndex} className="mb-3 block">
                        <div className="w-full flex items-center justify-between">
                          <label className={styles.label}>
                            Link {linkIndex + 1}
                          </label>

                          <AiOutlineDelete
                            className={`${
                              linkIndex === 0
                                ? "cursor-no-drop"
                                : "cursor-pointer"
                            } text:black dark:text-white text-[20px]`}
                            onClick={() =>
                              linkIndex === 0
                                ? null
                                : handleRemoveLink(index, linkIndex)
                            }
                          />
                        </div>

                        <input
                          type="text"
                          className={`${styles.input}`}
                          placeholder="Source Code... (Link Title)"
                          value={link?.title}
                          onChange={(e: any) => {
                            const updateData = [...courseContentData];
                            updateData[index].links[linkIndex].title =
                              e.target.value;
                            setCourseContentData(updateData);
                          }}
                        />

                        <input
                          type="text"
                          className={`${styles.input} mt-5`}
                          placeholder="Source Code... (Link Url)"
                          value={link?.url}
                          onChange={(e: any) => {
                            const updateData = [...courseContentData];
                            updateData[index].links[linkIndex].url =
                              e.target.value;
                            setCourseContentData(updateData);
                          }}
                        />
                      </div>
                    ))}
                    <br />

                    <div className="inline-block mb-4">
                      <p
                        onClick={() => handleAddLink(index)}
                        className="flex items-center text-[18px] dark:text-white text-black cursor-pointer">
                        <BsLink45Deg className="mr-2" />
                        Add Link
                      </p>
                    </div>
                  </>
                )}
                <br />

                {index === courseContentData.length - 1 && (
                  <div>
                    <p
                      onClick={(e: any) => newContentHandler(item)}
                      className="flex items-center text-[18px] dark:text-white text-black cursor-pointer">
                      <AiOutlinePlusCircle className="mr-2" />
                      Add new content
                    </p>
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
