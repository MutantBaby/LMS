import { apiSlice } from "../api/apiSlice";
import { userRegisteration } from "./authSlice";
import { IRegistrationReq, IRegistrationRes } from "./types";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IRegistrationRes, IRegistrationReq>({
      query: (arg) => {
        console.log("Query Running: ", arg, new Date().toLocaleTimeString());

        return {
          body: arg,
          method: "POST",
          url: "user/register",
          credentials: "include" as const,
        };
      },
      async onQueryStarted(
        id,
        { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry }
      ) {
        try {
          console.log("onQuery Running: ", new Date().toLocaleTimeString());

          const result = await queryFulfilled;

          console.log("Result Im 1: ", result);

          dispatch(
            userRegisteration({
              token: result.data.token,
            })
          );
        } catch (err) {
          console.log("Error Im 1: ", err);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ token, activeCode }) => ({
        method: "POST",
        url: "user/activate",
        body: { token, activeCode },
      }),
    }),
  }),
});

export const { useRegisterMutation, useActivationMutation } = authApi;
