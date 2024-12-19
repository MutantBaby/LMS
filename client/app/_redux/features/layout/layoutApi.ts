import { IHeroDataReq, IHeroDataRes } from "../../types";
import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    heroData: builder.query<IHeroDataRes, IHeroDataReq>({
      query: (arg) => ({
        method: "GET",
        url: `layout/get/${arg.type}`,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useHeroDataQuery } = layoutApi;
