import {
  ICreateCourseReq,
  ICreateCourseRes,
  IDeleteCourseReq,
  IDeleteCourseRes,
  IGetAllCoursesReq,
  IGetAllCoursesRes,
} from "../../types";
import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation<ICreateCourseRes, ICreateCourseReq>({
      query: (arg) => ({
        body: arg,
        method: "POST",
        url: "course/create",
        credentials: "include" as const,
      }),
    }),
    getAllCourses: builder.query<IGetAllCoursesRes, IGetAllCoursesReq>({
      query: () => ({
        method: "GET",
        url: "course/get-all",
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation<IDeleteCourseRes, IDeleteCourseReq>({
      query: (arg) => ({
        method: "DELETE",
        url: `course/delete/${arg}`,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useCreateCourseMutation,
  useDeleteCourseMutation,
} = courseApi;