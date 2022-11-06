import { CircularProgress } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Confetti from "react-confetti";
import { DataType } from "./quiz-card";

interface ScoreBoardProps {
  totalQuestions: number;
  mockdata: DataType;
  handleShowAnswers: () => void;
  setViewedConfetti: () => void;
  viewedConfetti: boolean;
}

export const ScoreBoard = (props: ScoreBoardProps) => {
  const {
    totalQuestions,
    mockdata,
    handleShowAnswers,
    setViewedConfetti,
    viewedConfetti,
  } = props;
  const [showConfetti, setShowConfetti] = React.useState(true);
  const shortedData = mockdata.data.getStep.stepQuiz;

  useEffect(() => {
    if (viewedConfetti) {
      setShowConfetti(false);
    } else {
      setTimeout(() => {
        setShowConfetti(false);
        setViewedConfetti();
      }, 2000);
    }
  }, []);

  const getTotalScoreFromMockdata = () => {
    let totalScore = 0;
    const selectedOptions = shortedData.selectedAnswer;
    const arr: string[] = [];
    shortedData.answerOptions.forEach((answerOption) => {
      if (answerOption.isCorrect === "true") {
        arr.push(answerOption.answerText);
      }
    });
    const areEqual = (a: string[], b?: string[] | null | undefined) => {
      return (
        a.length === b?.length &&
        a.sort().every((value, index) => value === b.sort()[index])
      );
    };
    areEqual(arr, selectedOptions) && totalScore++;

    return totalScore;
  };

  const percentage = (getTotalScoreFromMockdata() / totalQuestions) * 100;
  const score = getTotalScoreFromMockdata();

  return (
    <div className="flex h-screen flex-col items-center gap-8">
      {score > 0 && showConfetti && !viewedConfetti && (
        <Confetti
          gravity={0.2}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}
      {score > 0 ? (
        <div>
          <h1 className="mt-6 h-16 bg-gradient-to-r from-green-400 to-pink-600 bg-clip-text text-5xl font-extrabold text-transparent">
            Congratulation!
          </h1>
          <p className="text-center text-xl font-extrabold">
            it seems you are on fire!
          </p>
        </div>
      ) : (
        <div>
          <h1 className="mt-6 h-16 bg-gradient-to-r from-green-400 to-pink-600 bg-clip-text text-5xl font-extrabold text-transparent">
            You can do better!
          </h1>
          <p className="text-center text-xl font-extrabold">
            Revise and try again!
          </p>
        </div>
      )}
      <div className="relative">
        <CircularProgress value={percentage} size="200px" color="green.500" />
        <div className="absolute bottom-28 left-16 text-center text-2xl font-bold">
          <p>{percentage}%</p>
          <p>correct</p>
        </div>
        <p className="mt-4 text-center text-lg">
          {score}/{totalQuestions} correct answers
        </p>
      </div>
      <button
        onClick={handleShowAnswers}
        className=" rounded-lg bg-gradient-to-r from-green-400 to-pink-600 p-3"
      >
        Show answers
      </button>
    </div>
  );
};
