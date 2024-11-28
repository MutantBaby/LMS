import { apiSlice } from "../api/apiSlice";
import { IUpdateAvatarReq, IUpdateAvatarRes } from "../../types";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation<IUpdateAvatarRes, IUpdateAvatarReq>({
      query: (arg) => ({
        body: arg,
        method: "PATCH",
        url: "user/update-avatar",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useUpdateAvatarMutation } = userApi;
