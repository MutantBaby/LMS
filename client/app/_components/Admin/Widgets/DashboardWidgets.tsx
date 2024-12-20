import React, { FC } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { RiMapPinUserFill } from "react-icons/ri";
import { Box, CircularProgress } from "@mui/material";
import OrderAnalytics from "../Analytics/OrderAnalytics";
import AllVoices from "../Order/AllVoices";

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        size={"45"}
        value={value}
        thickness={4}
        variant="determinate"
        style={{ zIndex: open ? -1 : 1 }}
        color={value && value > 99 ? "info" : "error"}
      />
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open, value }) => {
  return (
    <div className="mt-[30px] min-h-screen ">
      <div className="grid grid-cols-[75%,25%]">
        <div className="p-8">
          <UserAnalytics isDashboard={true} />
        </div>

        <div className="pt-[80px] pr-8">
          <div className="w-full dark:bg-[#111C43] rounded-sm shadow">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-white text-black text-[20px]">
                  120
                </h5>

                <h5 className="pt-2 font-Poppins dark:text-white text-black text-[20px] font-[400]">
                  Sales Obtained
                </h5>
              </div>

              <div>
                <CircularProgressWithLabel value={100} open={open} />
                <h5 className="pt-4 text-center">+120%</h5>
              </div>
            </div>
          </div>

          <div className="w-full dark:bg-[#111C43] rounded-sm shadow my-8">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <RiMapPinUserFill className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-white text-black text-[20px]">
                  450
                </h5>

                <h5 className="pt-2 font-Poppins dark:text-white text-black text-[20px] font-[400]">
                  New Users
                </h5>
              </div>

              <div>
                <CircularProgressWithLabel value={100} open={open} />
                <h5 className="text-center pt-4">+150%</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[65%,35%]">
        <div className="dark:bg-[#111C43] w-[94%] mt-[30px] h-[40vh] shadow-sm m-auto">
          <OrderAnalytics isDashboard={true} />
        </div>

        <div className="p-5">
          <h5 className="pt-2 font-Poppins dark:text-white text-black text-[20px] font-[400]">
            Recent Transactions
          </h5>

          <AllVoices isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
