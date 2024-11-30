"use client";

import { FC, useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { styles } from "@/styles";
import toast from "react-hot-toast";
import { useChangePasswordMutation } from "@/app/_redux/features/user/userApi";

interface Props {}

const ChangePassword: FC<Props> = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [changePassword, { isSuccess, isError, error }] =
    useChangePasswordMutation();

  const changePasswordHandler = async (e: any) => {
    e.preventDefault();

    if (newPassword !== confirmPassword)
      return toast.error("New Password and Confirm Password does not match!");

    await changePassword({ oldPassword, newPassword });
  };

  useEffect(() => {
    if (isSuccess) toast.success("Password updated successfully!");

    if (isError)
      if (("data" in error!) as any) {
        const errorData = (error as FetchBaseQueryError).data as any;
        toast.error(errorData.message);
      } else toast.error("Some Error Occured");
  }, [isSuccess]);

  return (
    <div className="w-full pl-2 px-2 800px:px-5 800px:pl-0">
      <h1 className="block text-[25px] 800px:text-[30px] font-Poppins text-center font-[50px] text-black dark:text-white pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={changePasswordHandler}
          className="flex flex-col items-center">
          <div className="w-[100%] 800px:w-[60%] mt-5 text-black dark:text-white">
            <label className="block pb-2">Enter Old Password</label>
            <input
              required
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            />
          </div>

          <div className="w-[100%] 800px:w-[60%] mt-2 text-black dark:text-white">
            <label className="block pb-2">Enter New Password</label>
            <input
              required
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            />
          </div>

          <div className="w-[100%] 800px:w-[60%] mt-2 text-black dark:text-white">
            <label className="block pb-2">Enter Confirm Password</label>
            <input
              required
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            />
          </div>

          <input
            required
            type="submit"
            value={"Update"}
            className={`w-full 800px:w-[250px] h-[40px] border border-[#5775bf] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
          />
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
