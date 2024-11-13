import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FC, useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  AiOutlineEye,
  AiFillGithub,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

import { IProps } from "./types";
import { useLoginMutation } from "@/app/redux/features/auth/authApi";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required(),
  password: Yup.string().required().min(6),
});

const Login: FC<IProps> = ({ setRoute, setOpen }) => {
  const [login, { isError, isSuccess, error }] = useLoginMutation();
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async function ({ email, password }) {
      const data = { email, password };

      try {
        await login(data);
      } catch (err) {
        console.log("Error 1 Login: ", err);
      }
    },
  });

  const { errors, touched, handleSubmit, handleChange, handleBlur, values } =
    formik;

  useEffect(() => {
    if (isSuccess) {
      toast.success("User Login Successfully");
      setOpen(false);
      // setRoute("verification");
    }

    if (isError)
      if (("data" in error) as any) {
        if ("data" in error) {
          const errorData = (error as FetchBaseQueryError).data as any;
          toast.error(errorData.message);
        } else toast.error("Some Error Occured");
      }
  }, [isSuccess, isError, error]);

  return (
    <div className="flex h-full flex-col justify-center gap-4 p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-4">
        <h1 className="mb-4 text-2xl font-bold  dark:text-white">Login</h1>
        <div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-900 dark:text-gray-300">
              Email:
            </label>
          </div>
          <div className="flex w-full rounded-lg pt-1">
            <div className="relative w-full">
              <input
                className={`${
                  errors.email && touched.email && "border-red-600"
                } block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg`}
                id="email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="email@example.com"
                autoComplete="email"
              />
              {errors.email && touched.email && (
                <span className="text-red-500 pt-2 block">{errors.email}</span>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2">
            <label
              className="text-sm font-medium text-gray-900 dark:text-gray-300"
              data-testid="flowbite-label">
              Password:
            </label>
          </div>
          <div className="flex w-full rounded-lg pt-1">
            <div className="relative w-full">
              <input
                className={`${
                  errors.email && touched.email && "border-red-600"
                } block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg`}
                id="password"
                type={!show ? "password" : "text"}
                name="password"
                autoCorrect="on"
                value={values.password}
                onChange={handleChange}
                placeholder="Password!@%"
                autoComplete="current-password"
              />

              {!show ? (
                <AiOutlineEyeInvisible
                  size={20}
                  onClick={() => setShow(true)}
                  className="absolute bottom-3 right-2 z-1 cursor-pointer"
                />
              ) : (
                <AiOutlineEye
                  size={20}
                  onClick={() => setShow(false)}
                  className="absolute bottom-3 right-2 z-1 cursor-pointer"
                />
              )}

              {errors.password && touched.password && (
                <span className="text-red-500 pt-2 block">
                  {errors.password}
                </span>
              )}
            </div>
          </div>
          <p className="mt-2 cursor-pointer text-blue-500 hover:text-blue-600">
            Forgot password?
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="submit"
            className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg ">
            <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
              Login
            </span>
          </button>
          <button
            type="button"
            className="transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 disabled:bg-gray-300 disabled:text-gray-700 rounded-lg ">
            <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
              <FcGoogle size={20} />
              Sign in with Google
            </span>
          </button>

          <button
            type="button"
            className="transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 disabled:bg-gray-300 disabled:text-gray-700 rounded-lg ">
            <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
              <AiFillGithub size={20} />
              Sign in with Github
            </span>
          </button>
        </div>
      </form>

      <div className="min-w-[270px]">
        <div className="mt-4 text-center dark:text-gray-200">
          New user?
          <span
            onClick={() => setRoute("signup")}
            className="text-blue-500 underline hover:text-blue-600">
            Create account here
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
