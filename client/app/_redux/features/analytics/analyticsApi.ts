import { apiSlice } from "../api/apiSlice";
import {
  IUsersAnalyticsRes,
  IUsersAnalyticsReq,
  IOrdersAnalyticsReq,
  IOrdersAnalyticsRes,
  ICoursesAnalyticsRes,
  ICoursesAnalyticsReq,
} from "../../types";

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    coursesAnalytics: builder.query<ICoursesAnalyticsRes, ICoursesAnalyticsReq>(
      {
        query: (arg) => ({
          method: "GET",
          url: "analytics/courses",
          credentials: "include" as const,
        }),
      }
    ),
    ordersAnalytics: builder.query<IOrdersAnalyticsRes, IOrdersAnalyticsReq>({
      query: (arg) => ({
        method: "GET",
        url: "analytics/orders",
        credentials: "include" as const,
      }),
    }),
    usersAnalytics: builder.query<IUsersAnalyticsRes, IUsersAnalyticsReq>({
      query: (arg) => ({
        method: "GET",
        url: "analytics/users",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUsersAnalyticsQuery,
  useOrdersAnalyticsQuery,
  useCoursesAnalyticsQuery,
} = analyticsApi;
