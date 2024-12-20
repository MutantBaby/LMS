"use client";

import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import React, { FC, useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { styles } from "@/styles";
import Loading from "../../Loading";
import {
  useEditHeroMutation,
  useGetHeroQuery,
} from "@/app/_redux/features/layout/layoutApi";
import { title } from "process";

type Props = {};

const EditCategories: FC<Props> = () => {
  const { data, refetch, isLoading } = useGetHeroQuery(
    { type: "Categories" },
    { refetchOnMountOrArgChange: true }
  );
  const [editHero, { isSuccess, isError, error }] = useEditHeroMutation();

  const [categories, setCategories] = useState<any[]>([]);

  const toggleQuestion = (id: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((q) =>
        q._id === id ? { ...q, active: !q.active } : q
      )
    );
  };

  const handleTitleChange = (id: string, value: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((q) => (q._id === id ? { ...q, title: value } : q))
    );
  };

  const newCategoriesHandler = () => {
    setCategories([...categories, { title: "", active: false }]);
  };

  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoriesEmpty = (categories: any[]) => {
    return categories.some((q) => q.categorie === "");
  };

  const handleEdit = async () => {
    try {
      if (
        !areCategoriesUnchanged(
          data?.layout?.categories as any[],
          categories
        ) ||
        !isAnyCategoriesEmpty(categories)
      ) {
        console.log("Im inside");

        const data = {
          type: "Categories",
          categories: categories,
        };

        await editHero(data);
      }
    } catch (err) {
      console.log("Error in EditCategories: ", err);
    }
  };

  useEffect(() => {
    if (data) setCategories(data?.layout.categories || "");

    if (isSuccess) {
      refetch();
      toast.success("Categories Updated successfully!");
    }

    if (isError)
      if (("data" in error!) as any) {
        const errorData = (error as FetchBaseQueryError).data as any;
        toast.error(errorData.message);
      } else toast.error("Some Error Occured");
  }, [data, isSuccess]);

  return (
    <>
      {!isLoading ? (
        <div className="w-[90%] 800px:w-[80%] h-auto m-auto mt-[120px] relative ">
          <div className="mt-12">
            <h1>All Categories</h1>
            <dl className="space-y-8">
              {categories?.map((q: any, index: number) => (
                <div
                  key={index}
                  className={`${
                    q._id !== categories[0]?._id && "border-t"
                  } border-gray-100 pt-6`}>
                  <dt className="text-lg">
                    <button
                      onClick={() => toggleQuestion(q._id)}
                      className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none">
                      <input
                        className={`${styles.input} border-none`}
                        value={q?.title}
                        placeholder="Add Your Categories..."
                        onChange={(e: any) =>
                          handleTitleChange(q._id, e.target.value)
                        }
                      />

                      <span className="ml-6 flex-shrink-0">
                        {q.active ? (
                          <HiMinus className="h-6 w-6" />
                        ) : (
                          <HiPlus className="h-6 w-6" />
                        )}
                      </span>
                    </button>
                  </dt>

                  {q.active && (
                    <dd className="mt-2 pr-12">
                      {/* <input
                        className={`${styles.input} border-none`}
                        value={q.answer}
                        placeholder="Add Your Answer..."
                        onChange={(e: any) =>
                          handleAnswerChange(q._id, e.target.value)
                        }
                      /> */}

                      <span className="ml-6 flex-shrink-0">
                        <AiOutlineDelete
                          onClick={() => {
                            setCategories((prevCategories) =>
                              prevCategories.filter((qq) => qq._id !== q._id)
                            );
                          }}
                          className="dark:text-white text-black text-[18px] cursor-pointer "
                        />
                      </span>
                    </dd>
                  )}
                </div>
              ))}
            </dl>

            <br />
            <br />
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newCategoriesHandler}
            />
          </div>

          <div
            className={`${styles.button} absolute bottom--15 right-4 !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#ccccc34]`}
            onClick={
              areCategoriesUnchanged(data?.layout?.faq as any[], categories) ||
              isAnyCategoriesEmpty(categories)
                ? () => null
                : handleEdit
            }>
            Save
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default EditCategories;
