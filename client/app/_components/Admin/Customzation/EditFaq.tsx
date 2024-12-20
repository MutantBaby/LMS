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

type Props = {};

const EditFaq: FC<Props> = () => {
  const { data, refetch, isLoading } = useGetHeroQuery(
    { type: "Faq" },
    { refetchOnMountOrArgChange: true }
  );
  const [editHero, { isSuccess, isError, error }] = useEditHeroMutation();

  const [questions, setQuestions] = useState<any[]>([]);

  const toggleQuestion = (id: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };

  const handleQuestionChange = (id: string, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };

  const handleAnswerChange = (id: string, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };

  const newFaqHandler = () => {
    setQuestions([...questions, { question: "", answer: "", active: false }]);
  };

  const areQuestionsUnchanged = (
    originalQuestions: any[],
    newQuestions: any[]
  ) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };

  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions.some((q) => q.question === "" || q.answer === "");
  };

  const handleEdit = async () => {
    try {
      if (
        !areQuestionsUnchanged(data?.layout?.faq as any[], questions) ||
        !isAnyQuestionEmpty(questions)
      ) {
        const data = {
          type: "Faq",
          faq: questions.map((q: any) => ({
            question: q.question,
            answer: q.answer,
          })),
        };

        await editHero(data);
      }
    } catch (err) {
      console.log("Error in EditFaq: ", err);
    }
  };

  useEffect(() => {
    if (data) setQuestions(data?.layout.faq || "");

    if (isSuccess) {
      refetch();
      toast.success("Faq Updated successfully!");
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
            <dl className="space-y-8">
              {questions?.map((q: any, index: number) => (
                <div
                  key={index}
                  className={`${
                    q._id !== questions[0]?._id && "border-t"
                  } border-gray-100 pt-6`}>
                  <dt className="text-lg">
                    <button
                      onClick={() => toggleQuestion(q._id)}
                      className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none">
                      <input
                        className={`${styles.input} border-none`}
                        value={q?.question}
                        placeholder="Add Your Questions..."
                        onChange={(e: any) =>
                          handleQuestionChange(q._id, e.target.value)
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
                      <input
                        className={`${styles.input} border-none`}
                        value={q.answer}
                        placeholder="Add Your Answer..."
                        onChange={(e: any) =>
                          handleAnswerChange(q._id, e.target.value)
                        }
                      />

                      <span className="ml-6 flex-shrink-0">
                        <AiOutlineDelete
                          onClick={() => {
                            setQuestions((prevQuestions) =>
                              prevQuestions.filter((qq) => qq._id !== q._id)
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
              onClick={newFaqHandler}
            />
          </div>

          <div
            className={`${styles.button} absolute bottom--15 right-4 !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#ccccc34]`}
            onClick={
              areQuestionsUnchanged(data?.layout?.faq as any[], questions) ||
              isAnyQuestionEmpty(questions)
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

export default EditFaq;
