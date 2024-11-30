import { apiSlice } from "../api/apiSlice";
import {
  IEditProfileReq,
  IEditProfileRes,
  IUpdateAvatarReq,
  IUpdateAvatarRes,
  IChangePasswordReq,
  IChangePasswordRes,
} from "../../types";

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
    editProfile: builder.mutation<IEditProfileRes, IEditProfileReq>({
      query: (arg) => ({
        body: arg,
        method: "PATCH",
        url: "user/update-info",
        credentials: "include" as const,
      }),
    }),
    changePassword: builder.mutation<IChangePasswordRes, IChangePasswordReq>({
      query: (arg) => ({
        body: arg,
        method: "PATCH",
        url: "user/update-password",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useEditProfileMutation,
  useUpdateAvatarMutation,
  useChangePasswordMutation,
} = userApi;
