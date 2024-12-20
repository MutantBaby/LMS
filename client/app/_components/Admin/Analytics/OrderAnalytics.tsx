import React, { FC } from "react";
import {
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { styles } from "@/styles";
import Loading from "../../Loading";
import { useOrdersAnalyticsQuery } from "@/app/_redux/features/analytics/analyticsApi";

type Props = {
  isDashboard?: boolean;
};

const OrderAnalytics: FC<Props> = ({ isDashboard }) => {
  const { data, isLoading } = useOrdersAnalyticsQuery({});

  const analyticsData: any[] = [];

  data &&
    data?.order?.forEach((item: any) => {
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
          Order Analytics
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
          <LineChart
            margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
            width={150}
            height={300}
            data={analyticsData}>
            <CartesianGrid strokeDasharray={"3 3"} />
            <XAxis dataKey={"name"} />
            <YAxis />
            <Tooltip />
            {!isDashboard && <Legend />}
            <Line dataKey="uv" type="monotone" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrderAnalytics;
