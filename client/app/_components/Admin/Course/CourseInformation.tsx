"use strict";

import { styles } from "@/styles";
import toast from "react-hot-toast";
import React, { FC, useState } from "react";

type Props = {
  active: number;
  courseInfo: any;
  setActive: (active: number) => void;
  setCourseInfo: (course: any) => void;
};

const CourseInformation: FC<Props> = ({
  active,
  setActive,
  courseInfo,
  setCourseInfo,
}) => {
  const [dragging, setDragging] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];

    if (!file) {
      toast.error("Some Error Occured, Try Again");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: any) => {
      if (reader.readyState === 2)
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
    };

    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (!file) {
      toast.error("Some Error Occured, Try Again");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: any) => {
      setCourseInfo({ ...courseInfo, thumbnail: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor="name">Course Name</label>
          <input
            id="name"
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            placeholder="MERN stack LMS platform with Next.js"
            className={`${styles.input}`}
          />
        </div>

        <br />
        <div className="mb-5">
          <label htmlFor="description">Course Description</label>
          <textarea
            name="description"
            id="description"
            rows={6}
            cols={3}
            placeholder="Write somethings amazing"
            value={courseInfo.desc}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, desc: e.target.value })
            }
            className={`${styles.input} !h-min !py-2`}></textarea>
        </div>

        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="">Course Price</label>
            <input
              id="price"
              type="number"
              name=""
              required
              value={courseInfo.price}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              placeholder="30"
              className={`${styles.input}`}
            />
          </div>

          <div className="w-[45%]">
            <label htmlFor="estimatedPrice">
              EstimatedPrice Price (Optional)
            </label>
            <input
              id="estimatedPrice"
              type="number"
              name=""
              required
              value={courseInfo.estimatedPrice}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              placeholder="80"
              className={`${styles.input}`}
            />
          </div>
        </div>

        <br />
        <div>
          <label className={`${styles.label}`} htmlFor="tags">
            Course Tags
          </label>
          <input
            id="tags"
            type="string"
            name=""
            required
            value={courseInfo.tags}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            placeholder="MERN, Python, Redis"
            className={`${styles.input}`}
          />
        </div>

        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="level">Course Level</label>
            <input
              id="level"
              type="string"
              name=""
              required
              value={courseInfo.diffLevel}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, diffLevel: e.target.value })
              }
              placeholder="Beginner/Intermediate/Expert"
              className={`${styles.input}`}
            />
          </div>

          <div className="w-[45%]">
            <label htmlFor="demoUrl">Demo URL</label>
            <input
              id="demoUrl"
              type="string"
              name=""
              required
              value={courseInfo.demoUrl}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              placeholder="watch123"
              className={`${styles.input}`}
            />
          </div>
        </div>

        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />

          <label
            htmlFor="file"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`cursor-pointer w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}>
            {courseInfo.thumbnail ? (
              <img
                alt=""
                src={courseInfo.thumbnail}
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drage and Drop or Click to Upload Thumbnail
              </span>
            )}
          </label>
        </div>

        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value={"Next"}
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>

        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
