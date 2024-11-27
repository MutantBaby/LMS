"use client";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { FC, memo, useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";

import Login from "../Login";
import Signup from "../Signup";
import { IUser } from "@/app/types";
import avatar from "@/assets/avatar.png";
import Verification from "../Verification";
import { isObjectEmpty } from "@/utils";
import { useAppSelector } from "@/app/_redux";
import NavbarItems from "@/utils/NavbarItems";
import CustomModel from "@/utils/CustomModel";
import ThemeSwitcher from "@/utils/ThemeSwitcher";
import { useSocialAuthMutation } from "@/app/_redux/features/auth/authApi";

const Header: FC<TProps> = memo(
  ({ open, route, setOpen, setRoute, activeItems }) => {
    const { data } = useSession();
    const { theme, setTheme } = useTheme();
    const [active, setActive] = useState(false);
    const [openSideBar, setOpenSideBar] = useState(false);
    const [socialAuth, { isError, isSuccess, error }] = useSocialAuthMutation();
    const { user }: { user: IUser } = useAppSelector((state) => state.auth);

    // if (typeof window !== "undefined") {
    //   window.addEventListener("scroll", function () {
    //     if (window.scrollY > 100) setActive(true);
    //     else setActive(false);
    //   });
    // }

    const handleClose = (e: any) => {
      if (e.target.id === "screen") setOpenSideBar(false);
    };

    // useEffect(() => setActive(!active), [theme]);

    useEffect(() => {
      async function socialLogin(user: any, data: any) {
        if (isObjectEmpty(user) && data)
          try {
            const { name, email, image } = data.user!;

            console.log("IM IN 0", name, email, image);
            await socialAuth({ name: name, email: email, avatar: image });
            console.log("IM IN 1", name, email, image);
          } catch (err) {
            console.log("Error 1 Header: ", err);
          }
      }

      socialLogin(user, data);
    }, [user, data]);

    // useEffect(
    //   function () {
    //     if (isSuccess) toast.success("Login Successfully");

    //     if (isError)
    //       if (("data" in error) as any) {
    //         const errorData = (error as FetchBaseQueryError).data as any;
    //         toast.error(errorData.message);
    //       } else toast.error("Some Error Occured");
    //   },
    //   [isSuccess, isError, error]
    // );

    console.log("user: ", user);
    console.log("data: ", data);

    return (
      <div className="w-full relative">
        <div
          className={`${
            active
              ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
              : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
          }`}>
          <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
            <div className="w-full h-[80px] flex items-center justify-between p-3">
              <div>
                <Link
                  href={"/"}
                  className="text-[25px] font-Poppins font-[500] text-black dark:text-white">
                  LE-Course
                </Link>
              </div>

              <div className="flex items-center">
                <NavbarItems activeItems={activeItems} isMobile={false} />
                <ThemeSwitcher theme={theme} setTheme={setTheme} />

                {/* Only for Mobile */}
                <div className={`800px:hidden`}>
                  <HiOutlineMenuAlt3
                    size={25}
                    onClick={() => setOpenSideBar(true)}
                    className="cursor-pointer dark:text-white text-black"
                  />
                </div>

                {isObjectEmpty(user) ? (
                  <HiOutlineUserCircle
                    size={25}
                    onClick={() => setOpen(true)}
                    className="hidden 800px:block cursor-pointer dark:text-white text-black"
                  />
                ) : (
                  <Link href={"/profile"}>
                    <Image
                      width={30}
                      height={30}
                      alt="avatar"
                      style={{ borderRadius: "100%" }}
                      src={user?.avatar ? user.avatar : avatar}
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* mobile sidebar */}
          {openSideBar && (
            <div
              id="screen"
              onClick={handleClose}
              className="fixed w-full h-screen top-0 left-0 z-[999] dark:bg-[unset] bg-[#00000024]">
              <div className="w-[70%] fixed z-[99999] dark:bg-slate-900 h-screen bg-white dark:bg-opacity-90 top-0 right-0">
                <NavbarItems activeItems={activeItems} isMobile={true} />
                <HiOutlineUserCircle
                  size={25}
                  onClick={() => setOpen(true)}
                  className="cursor-pointer ml-2 my-2 dark:text-white text-black"
                />
                <br />
                <br />
                <p>Copy Right By LE-Course</p>
              </div>
            </div>
          )}
        </div>

        {route === "login" && (
          <>
            {open && (
              <CustomModel
                open={open}
                setOpen={setOpen}
                Component={Login}
                setRoute={setRoute}
                activeItems={activeItems}
              />
            )}
          </>
        )}

        {route === "signup" && (
          <>
            {open && (
              <CustomModel
                open={open}
                setOpen={setOpen}
                Component={Signup}
                setRoute={setRoute}
                activeItems={activeItems}
              />
            )}
          </>
        )}

        {route === "verification" && (
          <>
            {open && (
              <CustomModel
                open={open}
                setOpen={setOpen}
                Component={Verification}
                setRoute={setRoute}
                activeItems={activeItems}
              />
            )}
          </>
        )}
      </div>
    );
  }
);

export default Header;
