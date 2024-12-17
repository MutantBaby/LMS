import { use } from "react";
import {
  ICreateCourseReq,
  ICreateCourseRes,
  IDeleteCourseReq,
  IDeleteCourseRes,
  IEditCourseReq,
  IEditCourseRes,
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
      query: (data) => ({
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
    editCourse: builder.mutation<IEditCourseRes, IEditCourseReq>({
      query: (arg) => ({
        body: arg.course,
        method: "DELETE",
        url: `course/delete/${arg.id}`,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useEditCourseMutation,
  useGetAllCoursesQuery,
  useCreateCourseMutation,
  useDeleteCourseMutation,
} = courseApi;
