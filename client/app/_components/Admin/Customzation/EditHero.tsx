import { AiOutlineCamera } from "react-icons/ai";
import React, { FC, useEffect, useState } from "react";

import { styles } from "@/styles";
import avatarDefault from "@/assets/avatar.png";
import {
  useEditHeroMutation,
  useGetHeroQuery,
} from "@/app/_redux/features/layout/layoutApi";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type Props = {};

const EditHero: FC<Props> = () => {
  const { data, refetch } = useGetHeroQuery(
    { type: "Banner" },
    { refetchOnMountOrArgChange: true }
  );
  const [editHero, { isSuccess, isError, error }] = useEditHeroMutation();

  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const handleUpdate = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) setImg(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleEdit = async () => {
    try {
      const data = {
        type: "Banner",
        banner: {
          img: {
            url: img,
            publicId: "",
          },
          title,
          subTitle,
        },
      };

      await editHero(data);
    } catch (err) {
      console.log("Error in EditHero: ", err);
    }
  };

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner?.title || "");
      setImg(data?.layout?.banner?.img?.url || "");
      setSubTitle(data?.layout?.banner?.subTitle || "");
    }

    if (isSuccess) {
      toast.success("Hero Updated successfully!");
      refetch();
    }

    if (isError)
      if (("data" in error!) as any) {
        const errorData = (error as FetchBaseQueryError).data as any;
        toast.error(errorData.message);
      } else toast.error("Some Error Occured");
  }, [data, isSuccess]);

  return (
    <>
      <div className="w-full flex items-center h-[100vh] justify-center">
        <div className="mr-3 relative">
          <img
            alt="avatar"
            src={img ? (img as string) : (avatarDefault as unknown as string)}
            className={`800px:w-[300px] 800px:h-[300px] 600px:w-[250px] 600px:h-[250px] 400px:w-[200px] 400px:h-[200px] w-[350px] h-[350px] rounded-full cursor-pointer border-[3px] border-[#5775bf] dark:border-[#5775bf]`}
          />
          <input
            type="file"
            name=""
            id="banner"
            accept="image/*"
            onChange={handleUpdate}
            className="hidden"
          />

          <label htmlFor="banner">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera className="text-[18px] dark:text-white text-black cursor-pointer" />
            </div>
          </label>
        </div>

        <div className="flex flex-col items-center text-center">
          <textarea
            className="dark:text-white resize-none text-[#0000c7] text-[30px] px-3 w-full 1000px:text-[40px] 1500px:text-[50px] font-Josefin"
            name=""
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Improve Your Learning Experience"
            id=""></textarea>

          <br />
          <textarea
            className="dark:text-white resize-none text-[#0000c7] text-[20px] px-3 w-full 1000px:text-[30px] 1500px:text-[40px] font-Josefin"
            name=""
            value={subTitle || ""}
            onChange={(e) => setSubTitle(e.target.value)}
            placeholder="40k+ COurses & 100+ Categories"
            id=""></textarea>

          <br />
          <br />

          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#ccccc34]
                ${
                  data?.layout?.banner?.title !== title ||
                  data?.layout?.banner?.subTitle !== subTitle ||
                  data?.layout?.banner?.img?.url !== img
                    ? "cursor-pointer bg-[#42d383]"
                    : "!cursor-not-allowed"
                }
                !rounded absolute bottom-12 right-12
                `}
            onClick={
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.img?.url !== img
                ? handleEdit
                : () => null
            }>
            Save
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHero;
