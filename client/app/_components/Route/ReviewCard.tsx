import Ratings from "@/utils/Ratings";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";

type Props = {
  item: any;
};

const ReviewCard: FC<Props> = ({ item }) => {
  return (
    <div className="w-full min-h-[30vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-70] rounded-lg p-3 shadow-sm dark:shadow-inner">
      <div className="flex w-full">
        <Image
          src={item.avatar}
          width={50}
          height={50}
          className="object-cover w-[50px] h-[50px] rounded-lg"
          alt=""
        />

        <div className="800px:flex w-full hidden justify-between">
          <div className="pl-4">
            <h5 className={`text-black dark:text-white text-[20px]`}>
              {item.name}
            </h5>

            <h6 className={`text-black dark:text-white text-[14px]`}>
              {item.profession}
            </h6>
          </div>

          <Ratings rating={5} />
        </div>

        <div className="800px:hidden w-full flex flex-col justify-between">
          <div className="pl-4">
            <h5 className={`text-black dark:text-white text-[20px]`}>
              {item.name}
            </h5>

            <h6 className={`text-black dark:text-white text-[14px]`}>
              {item.profession}
            </h6>
          </div>

          <Ratings rating={5} />
        </div>
      </div>

      <p className={`text-black dark:text-white font-Poppins pt-2 px-2`}>
        {item.comment}
      </p>
    </div>
  );
};

export default ReviewCard;
