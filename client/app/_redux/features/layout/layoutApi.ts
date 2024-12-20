import {
  IEditHeroReq,
  IEditHeroRes,
  IGetHeroReq,
  IGetHeroRes,
} from "../../types";
import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHero: builder.query<IGetHeroRes, IGetHeroReq>({
      query: (arg) => ({
        method: "GET",
        url: `layout/get/${arg.type}`,
        credentials: "include" as const,
      }),
    }),
    editHero: builder.mutation<IEditHeroRes, IEditHeroReq>({
      query: (arg) => ({
        body: arg,
        method: "PUT",
        url: `layout/edit`,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetHeroQuery, useEditHeroMutation } = layoutApi;
