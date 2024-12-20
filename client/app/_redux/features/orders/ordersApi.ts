import { IAllOrdersReq, IAllOrdersRes } from "../../types";
import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allOrders: builder.query<IAllOrdersRes, IAllOrdersReq>({
      query: (arg) => ({
        method: "GET",
        url: "order/get-all",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useAllOrdersQuery } = ordersApi;
