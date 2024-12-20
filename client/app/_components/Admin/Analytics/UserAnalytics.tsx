import React, { FC } from "react";
import {
  Area,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  ResponsiveContainer,
} from "recharts";

import { styles } from "@/styles";
import Loading from "../../Loading";
import { useUsersAnalyticsQuery } from "@/app/_redux/features/analytics/analyticsApi";

type Props = {
  isDashboard?: boolean;
};

const UserAnalytics: FC<Props> = ({ isDashboard }) => {
  const { data, isLoading } = useUsersAnalyticsQuery({});

  const analyticsData: any[] = [];

  data &&
    data?.users?.forEach((item: any) => {
      analyticsData.push({ name: item.month, uv: item.count });
    });

  return isLoading ? (
    <Loading />
  ) : (
    <div
      className={`${
        !isDashboard
          ? "mt-[50px]"
          : "mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"
      } `}>
      <div className={`${isDashboard ? "!ml-8 mb-5" : ""} `}>
        <h1
          className={`${styles.title} ${
            isDashboard && "!text-[20px]"
          } px-5 !text-start`}>
          User Analytics
        </h1>

        {!isDashboard && (
          <p className={`${styles.label} px-5`}>
            Last 12 months analytics data
          </p>
        )}
      </div>

      <div
        className={`w-full ${
          isDashboard ? "h-[30vh]" : "h-screen"
        } flex items-center justify-center`}>
        <ResponsiveContainer
          width={`${isDashboard ? "100%" : "95%"}`}
          height={`${isDashboard ? "50%" : "100%"}`}>
          <AreaChart
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            width={150}
            height={300}
            data={analyticsData}>
            <XAxis dataKey={"name"} />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              fill="#4d62d9"
              stroke="#4d62d9"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserAnalytics;
