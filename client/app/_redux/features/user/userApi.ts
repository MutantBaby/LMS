import { apiSlice } from "../api/apiSlice";
import {
  IEditProfileReq,
  IEditProfileRes,
  IUpdateAvatarReq,
  IUpdateAvatarRes,
  IChangePasswordReq,
  IChangePasswordRes,
  IGetAllUsersRes,
  IGetAllUsersReq,
  IUpdateUserRoleRes,
  IUpdateUserRoleReq,
  IDeleteUserRes,
  IDeleteUserReq,
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
    getAllUsers: builder.query<IGetAllUsersRes, IGetAllUsersReq>({
      query: () => ({
        method: "GET",
        url: "user/get-all",
        credentials: "include" as const,
      }),
    }),
    updateUserRole: builder.mutation<IUpdateUserRoleRes, IUpdateUserRoleReq>({
      query: (arg) => ({
        body: arg,
        method: "PATCH",
        url: "user/update-role",
        credentials: "include" as const,
      }),
    }),
    deleteUser: builder.mutation<IDeleteUserRes, IDeleteUserReq>({
      query: (arg) => ({
        method: "DELETE",
        url: `user/delete/${arg}`,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useEditProfileMutation,
  useUpdateAvatarMutation,
  useChangePasswordMutation,
  useUpdateUserRoleMutation,
} = userApi;
