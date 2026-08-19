import { useEffect, useState } from "react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuestionResult {
  yourAnswer: string | null;
  correctAnswer: string;
  isCorrect: boolean;
  pointsEarned: number;
}

interface QuestionPanelProps {
  question: Question | null;
  onSubmit: (answer: string) => void;
  answerSubmitted: boolean;
  questionResult: QuestionResult | null;
  category: string;
  currentQuestionNumber: number;
  totalQuestions: number;
}

function QuestionPanel({
  question,
  onSubmit,
  answerSubmitted,
  questionResult,
  category,
  currentQuestionNumber,
  totalQuestions,
}: QuestionPanelProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const [nextQuestionIn, setNextQuestionIn] = useState(3);

  useEffect(() => {
    setSelectedOption(null);
  }, [question]);

  useEffect(() => {
    if (!questionResult) return;

    setNextQuestionIn(3);

    const interval = setInterval(() => {
      setNextQuestionIn((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [questionResult]);

  if (!question) {
    return (
      <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-8 flex items-center justify-center h-125">
        <h2 className="text-2xl text-gray-400">Waiting for question...</h2>
      </div>
    );
  }

  const progress =
    totalQuestions > 0 ? (currentQuestionNumber / totalQuestions) * 100 : 0;

  return (
    <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-8 w-full h-full flex flex-col">
      {/* Progress */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl">
          Question {currentQuestionNumber} of {totalQuestions}
        </h2>

        <span className="bg-purple-600 px-4 py-2 rounded-xl">{category}</span>
      </div>

      <div className="w-full h-2 bg-gray-800 rounded-full mb-8">
        <div
          className="h-full bg-purple-600 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <h1 className="text-4xl font-bold mb-10">{question.question}</h1>

      {/* Options */}
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={option}
            onClick={() => {
              if (!answerSubmitted) {
                setSelectedOption(option);
              }
            }}
            className={`w-full text-left border rounded-2xl p-6 transition ${
              questionResult
                ? option === questionResult.correctAnswer
                  ? "border-green-500 bg-green-500/20"
                  : option === questionResult.yourAnswer
                    ? "border-red-500 bg-red-500/20"
                    : "border-gray-700"
                : selectedOption === option
                  ? "border-purple-500 bg-purple-500/20"
                  : "border-gray-700 hover:border-purple-500"
            }`}
          >
            <span className="font-bold mr-4">
              {String.fromCharCode(65 + index)}
            </span>

            {option}
          </button>
        ))}
      </div>

      {/* Submit */}
      <button
        disabled={!selectedOption || answerSubmitted}
        onClick={() => onSubmit(selectedOption!)}
        className={`w-full mt-8 py-4 rounded-2xl text-xl font-semibold transition ${
          selectedOption && !answerSubmitted
            ? "bg-purple-600 hover:bg-purple-700"
            : "bg-gray-700 cursor-not-allowed"
        }`}
      >
        {answerSubmitted ? "Answer Locked ✓" : "Submit Answer"}
      </button>

      {questionResult && (
        <p className="mt-4 text-center text-gray-400">
          Next question in{" "}
          <span className="font-semibold text-purple-400">
            {nextQuestionIn}
          </span>
        </p>
      )}

      {/* Hint */}
      <p className="mt-8 text-gray-400">💡 Hint: Good luck!</p>
    </div>
  );
}

export default QuestionPanel;
