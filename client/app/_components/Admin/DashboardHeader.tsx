import { useTheme } from "next-themes";
import React, { FC } from "react";

import ThemeSwitcher from "@/utils/ThemeSwitcher";
import { IoMdNotificationsOutline } from "react-icons/io";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0">
        <ThemeSwitcher theme={theme} setTheme={setTheme} />

        <div
          className="relative cursor-pointer m-2"
          onClick={() => setOpen(!open)}>
          <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
          <span className="absolute -top-2 -right-3 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
            3
          </span>
        </div>

        {open && (
          <div className="absolute top-16 shadow-xl bg-white dark:bg-black rounded w-[350px] h-[50vh] z-10">
            <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
              Notification
            </h5>

            <div className="bark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
              <div className="w-full flex items-center justify-between p-2">
                <p className="text-black dark:text-white">
                  New Question Received
                </p>

                <p className="text-black dark:text-white cursor-pointer">
                  Mark as Read
                </p>
              </div>

              <p className="px-2 text-black dark:text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis, doloribus! Cum impedit sint eos quos placeat eveniet
                repellat, ab nobis!
              </p>

              <p className="p-2 text-black dark:text-white text-[14px]">
                5 days ago
              </p>
            </div>

            <div className="bark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
              <div className="w-full flex items-center justify-between p-2">
                <p className="text-black dark:text-white">
                  New Question Received
                </p>

                <p className="text-black dark:text-white cursor-pointer">
                  Mark as Read
                </p>
              </div>

              <p className="px-2 text-black dark:text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis, doloribus! Cum impedit sint eos quos placeat eveniet
                repellat, ab nobis!
              </p>

              <p className="p-2 text-black dark:text-white text-[14px]">
                5 days ago
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
