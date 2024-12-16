import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (arg) => ({
        body: arg,
        method: "POST",
        url: "course/create",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useCreateCourseMutation } = courseApi;
