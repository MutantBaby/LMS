import React, { FC, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

import { useGetHeroQuery } from "@/app/_redux/features/layout/layoutApi";
import { styles } from "@/styles";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";

type Props = {};

const Faq: FC<Props> = () => {
  const { data, isLoading } = useGetHeroQuery({ type: "Faq" });

  const [activeQuestion, setActiveQuestion] = React.useState<null>(null);
  const [questions, setQuestions] = React.useState<any>([]);

  useEffect(() => {
    if (data) setQuestions(data.layout.faq);
  }, [data]);

  const toogleQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className="w-[90%] 800px:w-[80%] m-auto">
      <h1 className={`${styles.title} 800px:text-[40px]`}>
        Frequesntly Asked Questions
      </h1>

      <div className="mt-12">
        <dl className="space-y-8">
          {questions?.map((q: any, index: number) => (
            <div
              key={index}
              className={`${
                q._id !== questions[0]?._id && "border-t"
              } border-gray-20 pt-6`}>
              <dt className="text-lg">
                <button
                  onClick={() => toogleQuestion(q._id)}
                  className="flex items-start justify-between w-full text-left focus:outline-none">
                  <span className="font-medium text-black dark:text-white">
                    {q.quesion}
                  </span>

                  <span className="ml-6 flex-shrink-0">
                    {activeQuestion === q._id ? (
                      <HiOutlineMinus className="w-5 h-5" />
                    ) : (
                      <HiOutlinePlus className="w-5 h-5" />
                    )}
                  </span>
                </button>
              </dt>

              {activeQuestion === q._id && (
                <dd className="mt-2 pr-12 ">
                  <p className="text-base font-Poppins text-black dark:text-white">
                    {q.answer}
                  </p>
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default Faq;
