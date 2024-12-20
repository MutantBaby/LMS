"use strict";

import { styles } from "@/styles";
import React, { FC } from "react";
import toast from "react-hot-toast";
import { IoAddCircle } from "react-icons/io5";

type Props = {
  active: number;
  benefits: { title: string }[];
  categories: { title: string }[];
  preRequisites: { title: string }[];
  setActive: (active: number) => void;
  setBenefits: (benefits: { title: string }[]) => void;
  setCategories: (categories: { title: string }[]) => void;
  setPreRequisites: (benefits: { title: string }[]) => void;
};

const CourseData: FC<Props> = ({
  active,
  benefits,
  categories,
  preRequisites,
  setActive,
  setBenefits,
  setCategories,
  setPreRequisites,
}) => {
  const handleBenefitsChange = (index: number, value: any) => {
    const newBenefits = [...benefits];
    newBenefits[index].title = value;
    setBenefits(newBenefits);
  };

  const handleAddBenefits = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePreRequisitesChange = (index: number, value: any) => {
    const newPerRequistes = [...preRequisites];
    newPerRequistes[index].title = value;
    setPreRequisites(newPerRequistes);
  };

  const handleAddPreRequisites = () => {
    setPreRequisites([...preRequisites, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      preRequisites[preRequisites.length - 1]?.title !== ""
    )
      setActive(active + 1);
    else toast.error("Please Fill All The Fields");
  };

  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          What are the benefits for the students in this course?
        </label>

        <br />
        {benefits.map((benefit: any, index: number) => (
          <input
            required
            type="text"
            key={index}
            name="Benefits"
            value={benefit.title}
            className={`${styles.input} my-2`}
            placeholder="Need TO learn basics of MERN Knowledge"
            onChange={(e) => handleBenefitsChange(index, e.target.value)}
          />
        ))}

        <IoAddCircle
          onClick={handleAddBenefits}
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
        />
      </div>

      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          What are the preRequisites for the students in this course?
        </label>

        <br />
        {preRequisites.map((benefit: any, index: number) => (
          <input
            required
            type="text"
            key={index}
            name="preRequisites"
            value={benefit.title}
            className={`${styles.input} my-2`}
            placeholder="You will be able to build FULL Stack Apps"
            onChange={(e) => handlePreRequisitesChange(index, e.target.value)}
          />
        ))}

        <IoAddCircle
          onClick={handleAddPreRequisites}
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
        />
      </div>

      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] cursor-pointer h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 "
          onClick={() => prevButton()}>
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] cursor-pointer h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 "
          onClick={() => handleOptions()}>
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
