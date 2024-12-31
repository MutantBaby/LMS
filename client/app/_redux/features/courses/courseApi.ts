import { use } from "react";
import {
  IAllCoursesDetailsReq,
  IAllCoursesDetailsRes,
  ICreateCourseReq,
  ICreateCourseRes,
  IDeleteCourseReq,
  IDeleteCourseRes,
  IEditCourseReq,
  IEditCourseRes,
  IGetAllCoursesReq,
  IGetAllCoursesRes,
  IHeroAllCoursesReq,
  IHeroAllCoursesRes,
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
        method: "PATCH",
        url: `course/edit/${arg.id}`,
        credentials: "include" as const,
      }),
    }),
    heroAllCourse: builder.query<IHeroAllCoursesRes, IHeroAllCoursesReq>({
      query: (arg) => ({
        method: "GET",
        url: `course/all`,
        credentials: "include" as const,
      }),
    }),
    courseContent: builder.query<IAllCoursesDetailsRes, IAllCoursesDetailsReq>({
      query: (arg) => ({
        method: "GET",
        url: `course/content/${arg.id}`,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCourseContentQuery,
  useGetAllCoursesQuery,
  useHeroAllCourseQuery,
  useEditCourseMutation,
  useCreateCourseMutation,
  useDeleteCourseMutation,
} = courseApi;
