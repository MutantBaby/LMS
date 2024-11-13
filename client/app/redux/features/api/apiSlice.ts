import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userloggedIn } from "../auth/authSlice";
import {
  ILoadUserReq,
  ILoadUserRes,
  IRefreshTokenReq,
  IRefreshTokenRes,
} from "../auth/types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URL }),
  endpoints: (builder) => ({
    refreshToken: builder.query<IRefreshTokenRes, IRefreshTokenReq>({
      query: (arg) => ({
        credentials: "include" as const,
        url: "user/update-accToken",
        method: "GET",
      }),
    }),
    loadUser: builder.query<ILoadUserRes, ILoadUserReq>({
      query: (arg) => ({
        credentials: "include" as const,
        url: "user/me",
        method: "GET",
      }),
      async onQueryStarted(
        arg,
        { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry }
      ) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userloggedIn({
              user: result.data.user,
              token: result.data.accessToken, // from server
            })
          );
        } catch (err) {
          console.log("Error 1 ApiSlice: ", err);
        }
      },
    }),
  }),
});

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;
