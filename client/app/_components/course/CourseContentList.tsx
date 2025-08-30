import React, { FC } from "react";

import { ICourData } from "@/types";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";

type Props = {
  data: ICourData[];
  isDemo?: boolean;
  activeVideo?: number;
  setActiveVideo?: any;
};

const CourseContentList: FC<Props> = ({
  data,
  isDemo,
  activeVideo,
  setActiveVideo,
}) => {
  console.log("data in content list", data);

  const [visibleSections, setVisibleSections] = React.useState<Set<string>>(
    new Set<string>()
  );

  const videoSections: string[] = [
    ...new Set<string>(
      data?.map((item: ICourData) => item.videoSection as string)
    ),
  ];

  let totalCount: number = 0;

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);

    if (newVisibleSections.has(section)) newVisibleSections.delete(section);
    else newVisibleSections.add(section);

    setVisibleSections(newVisibleSections);
  };

  return (
    <div
      className={`mt-[15px] w-full ${
        !isDemo && "ml-[-30px] sticky top-24 left-0 z-30"
      }`}>
      {videoSections.map((section: string, index: number) => {
        const isSectionVisible = visibleSections.has(section);

        const sectionVideos: any[] = data?.filter(
          (item: ICourData) => item.videoSection === section
        );

        const sectionVideoCount = sectionVideos?.length;
        const sectionVideoLength = sectionVideos?.reduce(
          (totalLength: number, item: ICourData) =>
            totalLength + item?.videoLength!,
          0
        );

        const sectionStartIndex = totalCount;
        totalCount += sectionVideoCount;

        const sectionContentHours = sectionVideoLength / 60;

        return (
          <div
            className={`${isDemo && `border-b border-[#ffffff8c] pb-2`}`}
            key={section}>
            <div className="w-full flex justify-between">
              {/* render video section */}

              <h2 className="text-[22px] font-Poppins text-black dark:text-white">
                {section}
              </h2>

              <button
                className="cursor-pointer mr-4 text-black dark:text-white"
                onClick={() => toggleSection(section)}>
                {isSectionVisible ? (
                  <BsChevronUp size={20} />
                ) : (
                  <BsChevronDown size={20} />
                )}
              </button>
            </div>

            <h5 className="font-Poppins text-black dark:text-white">
              {sectionVideoCount} Lectures .{" "}
              {sectionVideoLength < 60
                ? sectionVideoLength
                : sectionContentHours.toFixed(2)}{" "}
              {sectionVideoLength < 60 ? "hours" : "minutes"}
            </h5>

            <br />

            {isSectionVisible && (
              <div className="w-full">
                {sectionVideos?.map(
                  (item: ICourData & { _id: string }, index: number) => {
                    const videoIndex = sectionStartIndex + index;
                    const contentLength = item?.videoLength! / 60;

                    return (
                      <div
                        className={`w-full ${
                          videoIndex === activeVideo ? "bg-slate-800" : ""
                        } cursor-pointer transition-all p-2`}
                        key={item?._id}
                        onClick={() =>
                          isDemo ? null : setActiveVideo(videoIndex)
                        }>
                        <div className="flex items-start">
                          <div>
                            <MdOutlineOndemandVideo
                              size={25}
                              className="mr-2"
                              color={`#1cdada`}
                            />
                          </div>
                          <h1 className="text-[18px] inline-block break-words font-Poppins font-[600] text-black dark:text-white">
                            {item?.title}
                          </h1>
                        </div>

                        <h5 className="pl-8 text-black dark:text-white">
                          {item?.videoLength! > 60
                            ? contentLength.toFixed(2)
                            : item?.videoLength}{" "}
                          {item?.videoLength! > 60 ? " hours" : " minutes"}
                        </h5>
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
