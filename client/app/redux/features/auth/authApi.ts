import { apiSlice } from "../api/apiSlice";
import { IRegistrationData, IRegistrationRes } from "./types";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IRegistrationRes, IRegistrationData>({
      query: (arg) => "",
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (val, meta, args) => ({
        message: "",
        activationToken: "",
      }),
      // Pick out error and prevent nested properties in a hook or selector
      transformErrorResponse: (val, meta, args) => new Error(),
      // `result` is the server response
      invalidatesTags: [],
      // trigger side effects or optimistic updates
      onQueryStarted(
        id,
        { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry }
      ) {},
      // handle subscriptions etc
      onCacheEntryAdded(
        id,
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
        }
      ) {},
    }),
  }),
});

// query: (data) => ({
//   body: data,
//   method: "POST",
//   url: "user/register",
//   credentials: "include" as const,
// }),
// async onQueryStarted(data, { dispatch, queryFulfilled }) {
//   const result = await queryFulfilled;
// },
