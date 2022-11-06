import React, { useId } from "react";
import { DataType } from "./quiz-card";
import { VscClose, VscCheck } from "react-icons/vsc";
import { IoIosArrowBack } from "react-icons/io";

interface AnswersPageProps {
  mockdata: DataType;
  handleNavigateBack: () => void;
}

export const AnswersPage = (props: AnswersPageProps) => {
  const { mockdata, handleNavigateBack } = props;
  const sharedData = mockdata.data.getStep.stepQuiz;
  const id = useId();
  return (
    <div className="mx-auto flex h-screen w-full flex-col  items-center gap-8 px-5 pt-4 sm:justify-center sm:pt-0 md:w-1/2">
      <div
        className="absolute left-7 top-6 rounded-full border-2 border-white p-2  sm:left-24 sm:top-12"
        onClick={handleNavigateBack}
      >
        <IoIosArrowBack className="cursor-pointer text-center text-base text-white sm:text-4xl " />
      </div>
      <h1 className="text-center text-5xl font-bold">Answers</h1>
      <div className="w-full">
        <p className="text-xl">1. {sharedData.questionText}</p>
        {sharedData.answerOptions.map((answerOption, index) => {
          return (
            <div key={`${id}-${index}`} className="mt-5">
              <div className="mt-4 flex flex-col gap-5">
                <div
                  className={`flex items-center justify-between rounded-lg border bg-gray-500 px-3 py-2 ring-4 ${
                    sharedData.selectedAnswer?.includes(answerOption.answerText)
                      ? "ring-blue-500"
                      : "ring-gray-500"
                  } space-x-3  pl-4 ring-blue-500  `}
                >
                  <div className="flex gap-2 ">
                    <p>{String.fromCharCode(65 + index)}</p>
                    <p>{answerOption.answerText}</p>
                  </div>
                  <div>
                    {answerOption.isCorrect === "true" ? (
                      <VscCheck className="text-xl text-green-500" />
                    ) : (
                      <VscClose className="text-xl text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
