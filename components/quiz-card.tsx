import React, { useId } from "react";
import { useState } from "react";
import data from "../StepOutput.json";
import { Dialog } from "./alert-dialog";
import { ScoreBoard } from "./score-board";
import { AnswersPage } from "./answers-page";

export interface DataType {
  data: {
    getStep: {
      id: string;
      stepQuiz: {
        answerOptions: { answerText: string; isCorrect: string }[];
        questionText: string;
        selectedAnswer?: string[] | null;
      };
    };
  };
}

export const QuizCard = () => {
  const [buttonBlur, setButtonBlur] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [viewedConfetti, setViewedConfetti] = useState(false);
  const [mockdata, setMockdata] = useState<DataType>(data);
  const shortedData = mockdata.data.getStep.stepQuiz;
  const id = useId();

  const handleSelectOption = (option: string) => {
    if (shortedData.selectedAnswer?.includes(option)) {
      const index = shortedData.selectedAnswer?.indexOf(option);
      shortedData.selectedAnswer?.splice(index!, 1);
      if (shortedData.selectedAnswer?.length === 0) {
        setButtonBlur(true);
      }
      setMockdata({ ...mockdata });
    } else {
      shortedData.answerOptions.forEach((answerOption) => {
        if (answerOption.answerText === option) {
          if (shortedData.selectedAnswer) {
            shortedData.selectedAnswer.push(option);
          } else {
            shortedData.selectedAnswer = [option];
          }
          if (shortedData.selectedAnswer?.length !== 0) {
            setButtonBlur(false);
          }
          setMockdata({ ...mockdata });
        }
      });
    }
  };

  const handleSubmit = () => {
    setShowModal(false);
    setShowScore(true);
  };

  const showAnAlphabetBasedOnTheIndex = (index: number) => {
    return String.fromCharCode(65 + index);
  };

  if (showScore) {
    return (
      <ScoreBoard
        mockdata={mockdata}
        totalQuestions={1}
        handleShowAnswers={() => {
          setShowAnswers(true);
          setShowScore(false);
        }}
        setViewedConfetti={() => setViewedConfetti(true)}
        viewedConfetti={viewedConfetti}
      />
    );
  }
  if (showAnswers) {
    return (
      <AnswersPage
        mockdata={mockdata}
        handleNavigateBack={() => {
          setShowAnswers(false);
          setShowScore(true);
        }}
      />
    );
  }

  return (
    <div className="mx-auto flex h-screen w-full flex-col justify-start gap-8 px-4 pt-5 sm:justify-center sm:pt-0 md:w-1/2">
      <h1 className="text-center text-5xl font-bold">Quiz questions</h1>
      <div className="h-fit w-full">
        <p className="text-xl">
          <span>1.</span> {shortedData.questionText}
        </p>
        {shortedData.answerOptions.map((answerOption, index) => (
          <div key={`${id}-${index}`} className=" mt-5">
            <div
              onClick={() => handleSelectOption(answerOption.answerText)}
              className={`flex cursor-pointer flex-row items-center rounded-lg border bg-gray-500 py-2 ring-4 ${
                shortedData.selectedAnswer?.includes(answerOption.answerText)
                  ? "ring-blue-500"
                  : "ring-gray-500"
              } space-x-3  pl-4 ring-blue-500  `}
            >
              <p>{showAnAlphabetBasedOnTheIndex(index)}</p>
              <p>{answerOption.answerText}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        disabled={buttonBlur}
        onClick={() => setShowModal(true)}
        className="mx-auto w-24 rounded-md py-2 ring-2  ring-green-500 disabled:cursor-no-drop disabled:bg-slate-400"
      >
        <p className="text-white ">submit</p>
      </button>

      {showModal && (
        <Dialog
          handleSubmit={handleSubmit}
          setShowSubmitModal={() => setShowModal(false)}
          showSubmitModal={showModal}
        />
      )}
    </div>
  );
};
