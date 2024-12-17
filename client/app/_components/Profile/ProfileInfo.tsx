"use client";

import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { IUser } from "@/types";
import { styles } from "@/styles";
import toast from "react-hot-toast";
import avatarDefault from "@/assets/avatar.png";
import { AiOutlineCamera } from "react-icons/ai";
import { useLoadUserQuery } from "@/app/_redux/features/api/apiSlice";
import {
  useUpdateAvatarMutation,
  useEditProfileMutation,
} from "@/app/_redux/features/user/userApi";

interface Props {
  user: IUser;
  avatar: string | null;
}

const ProfileInfo: FC<Props> = ({ user, avatar }) => {
  const [name, setName] = useState<string>(user.name!);
  const { refetch } = useLoadUserQuery({}, { refetchOnMountOrArgChange: true });
  const [
    updateAvatar,
    {
      isSuccess: isSuccessForAvatar,
      isError: isErrorForAvatar,
      error: errorForAvatar,
    },
  ] = useUpdateAvatarMutation();
  const [
    editProfile,
    {
      isSuccess: isSuccessForProfile,
      isError: isErrorForProfile,
      error: errorForProfile,
    },
  ] = useEditProfileMutation();

  const imageHandler = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async () => {
      if (reader.readyState === 2)
        await updateAvatar({ avatar: reader.result as string });
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (name === "") return toast.error("Name is required!");

    await editProfile({ name, email: user.email! });
  };

  useEffect(() => {
    if (isSuccessForAvatar || isSuccessForProfile) {
      toast.success("Profile updated successfully!");
      refetch();
    }

    if (isErrorForAvatar || isErrorForProfile)
      if (("data" in errorForAvatar! || "data" in errorForProfile!) as any) {
        const errorData =
          ((errorForAvatar as FetchBaseQueryError).data as any) ||
          ((errorForProfile as FetchBaseQueryError).data as any);
        toast.error(errorData.message);
      } else toast.error("Some Error Occured");
  }, [isSuccessForAvatar, isSuccessForProfile]);

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            alt="avatar"
            src={
              user?.avatar || avatar!
                ? user!.avatar?.url || avatar!
                : avatarDefault
            }
            width={120}
            height={120}
            className="w-[120px] h-[120px] rounded-full cursor-pointer border-[3px] border-[#5775bf] dark:border-[#5775bf]"
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />

          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
      </div>

      <br />
      <br />

      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <label className="block pb-2">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              />
            </div>

            <div className="w-[100%]">
              <label className="block pb-2">Email Address</label>
              <input
                type="email"
                readOnly
                value={user.email!}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              />
            </div>

            <input
              required
              type="submit"
              value={"Update"}
              className={`w-full 800px:w-[250px] h-[40px] border border-[#5775bf] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
