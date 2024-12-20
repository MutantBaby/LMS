import { useCoursesAnalyticsQuery } from "@/app/_redux/features/analytics/analyticsApi";
import React, { FC } from "react";
import {
  Bar,
  XAxis,
  Label,
  YAxis,
  BarChart,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import Loading from "../../Loading";
import { styles } from "@/styles";

type Props = {};

const CourseAnalytics: FC<Props> = () => {
  const { data, isLoading } = useCoursesAnalyticsQuery({});

  const analyticsData: any[] = [];

  data &&
    data?.course?.forEach((item: any) => {
      analyticsData.push({ name: item.month, uv: item.count });
    });

  const minValue = 0;

  return isLoading ? (
    <Loading />
  ) : (
    <div className="h-screen">
      <div className="mt-[50px]">
        <h1 className={`${styles.title} px-5 !text-start`}>Course Analytics</h1>
        <p className={`${styles.label} px-5`}>Last 12 months analytics data</p>
      </div>

      <div className="w-full h-[90%] flex items-center justify-center">
        <ResponsiveContainer width="95%" height="95%">
          <BarChart width={150} height={300} data={analyticsData}>
            <XAxis dataKey={"name"}>
              <Label offset={0} position="insideBottom" />
            </XAxis>
            <YAxis domain={[minValue, "auto"]} />

            <Bar dataKey={"uv"} fill="#3faf82">
              <LabelList dataKey="uv" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CourseAnalytics;
