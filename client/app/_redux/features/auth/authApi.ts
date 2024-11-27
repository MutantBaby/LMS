import { apiSlice } from "../api/apiSlice";
import { userloggedIn, userRegisteration } from "./authSlice";
import {
  ILoginReq,
  ILoginRes,
  IActivationReq,
  IActivationRes,
  ISocialAuthRes,
  ISocialAuthReq,
  IRegistrationReq,
  IRegistrationRes,
} from "../../types";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IRegistrationRes, IRegistrationReq>({
      query: (arg) => ({
        body: arg,
        method: "POST",
        url: "user/register",
        credentials: "include" as const,
      }),
      async onQueryStarted(
        arg,
        { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry }
      ) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userRegisteration({
              token: result.data.token,
            })
          );
        } catch (err) {
          console.log("Error 1 authApi: ", err);
        }
      },
    }),
    activation: builder.mutation<IActivationRes, IActivationReq>({
      query: (arg) => ({
        method: "POST",
        url: "user/activate",
        body: arg,
      }),
    }),
    login: builder.mutation<ILoginRes, ILoginReq>({
      query: (arg) => ({
        body: arg,
        method: "POST",
        url: "user/login",
        credentials: "include" as const,
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
          console.log("Error 2 authApi: ", err);
        }
      },
    }),
    socialAuth: builder.mutation<ISocialAuthRes, ISocialAuthReq>({
      query: (arg) => ({
        credentials: "include" as const,
        url: "user/social-auth",
        method: "POST",
        body: arg,
      }),
      async onQueryStarted(
        arg,
        { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry }
      ) {
        try {
          console.log("IM IN 2");
          const result = await queryFulfilled;

          console.log("IM IN 3");

          dispatch(
            userloggedIn({
              user: result.data.user,
              token: result.data.accessToken, // from server
            })
          );
        } catch (err) {
          console.log("Error 3 authApi: ", err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useActivationMutation,
  useSocialAuthMutation,
} = authApi;
