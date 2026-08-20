import { useEffect, useState } from "react";
import { Check, X, Clock3 } from "lucide-react";

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
  difficulty: string;
  currentQuestionNumber: number;
  totalQuestions: number;
  timeLeft: number;
}

function QuestionPanel({
  question,
  onSubmit,
  answerSubmitted,
  questionResult,
  category,
  difficulty,
  currentQuestionNumber,
  totalQuestions,
  timeLeft,
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
      <div className="flex h-full min-h-135 items-center justify-center rounded-2xl border border-white/[0.07] bg-[#0d1224] p-8">
        <h2 className="text-lg text-slate-400">Waiting for question...</h2>
      </div>
    );
  }

  const progress =
    totalQuestions > 0 ? (currentQuestionNumber / totalQuestions) * 100 : 0;

  const getOptionState = (option: string) => {
    if (!questionResult) {
      return selectedOption === option ? "selected" : "default";
    }

    if (option === questionResult.correctAnswer) {
      return "correct";
    }

    if (option === questionResult.yourAnswer) {
      return "incorrect";
    }

    return "disabled";
  };

  const getOptionClass = (option: string) => {
    const state = getOptionState(option);

    if (state === "selected") {
      return "border-violet-500 bg-violet-500/15 shadow-[0_0_24px_-10px] shadow-violet-500/60";
    }

    if (state === "correct") {
      return "border-green-500 bg-green-500/15";
    }

    if (state === "incorrect") {
      return "border-red-500 bg-red-500/15";
    }

    if (state === "disabled") {
      return "border-white/[0.07] bg-[#111827] opacity-50";
    }

    return "border-white/[0.07] bg-[#111827] hover:border-violet-500/50 hover:shadow-[0_0_24px_-10px] hover:shadow-violet-500/50";
  };

  const getLetterClass = (option: string) => {
    const state = getOptionState(option);

    if (state === "selected") {
      return "border-violet-500 bg-violet-600 text-white";
    }

    if (state === "correct") {
      return "border-green-500 bg-green-500 text-[#050816]";
    }

    if (state === "incorrect") {
      return "border-red-500 bg-red-500 text-[#050816]";
    }

    return "border-white/[0.07] bg-[#0d1224] text-slate-400";
  };

  return (
    <div className="flex h-full min-h-135 flex-col rounded-2xl border border-white/[0.07] bg-[#0d1224] p-5 md:p-6">
      {/* Meta row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-violet-500/10 px-2.5 py-1 text-sm font-bold text-violet-400">
            Question {currentQuestionNumber}{" "}
            <span className="text-slate-500">of {totalQuestions}</span>
          </span>

          <span className="rounded-md border border-cyan-400/20 bg-cyan-400/10 px-2 py-0.5 text-xs font-semibold text-cyan-400">
            {category}
          </span>

          {difficulty && (
            <span
              className={`rounded-md border px-2 py-0.5 text-xs font-semibold ${
                difficulty === "Easy"
                  ? "border-green-500/20 bg-green-500/10 text-green-400"
                  : difficulty === "Medium"
                    ? "border-amber-400/20 bg-amber-400/10 text-amber-400"
                    : "border-red-500/20 bg-red-500/10 text-red-400"
              }`}
            >
              {difficulty}
            </span>
          )}
        </div>

        {/* Timer */}
        <div
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-bold ${
            timeLeft <= 5
              ? "bg-red-500/10 text-red-400"
              : "bg-[#111827] text-slate-300"
          }`}
        >
          <Clock3 className="size-4" />

          <span>
            {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
            {String(timeLeft % 60).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[#111827]">
        <div
          className="h-full rounded-full bg-linear-to-r from-violet-600 to-violet-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <h2 className="mt-6 text-xl font-bold leading-snug tracking-tight text-white md:text-2xl">
        {question.question}
      </h2>

      {/* Options */}
      <div className="mt-6 grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
        {question.options.map((option, index) => {
          const state = getOptionState(option);

          return (
            <button
              key={option}
              onClick={() => {
                if (!answerSubmitted) {
                  setSelectedOption(option);
                }
              }}
              disabled={answerSubmitted}
              className={`group flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200 ${getOptionClass(
                option,
              )} ${answerSubmitted ? "cursor-default" : "cursor-pointer"}`}
            >
              {/* Option letter */}
              <span
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg border text-sm font-bold ${getLetterClass(
                  option,
                )}`}
              >
                {state === "correct" ? (
                  <Check className="size-4" />
                ) : state === "incorrect" ? (
                  <X className="size-4" />
                ) : (
                  String.fromCharCode(65 + index)
                )}
              </span>

              {/* Option text */}
              <span
                className={`text-sm font-medium leading-snug ${
                  state === "correct"
                    ? "text-green-400"
                    : state === "incorrect"
                      ? "text-red-400"
                      : "text-slate-200"
                }`}
              >
                {option}
              </span>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-400">
          {questionResult ? (
            questionResult.isCorrect ? (
              <span className="font-semibold text-green-400">
                Correct! +{questionResult.pointsEarned} points
              </span>
            ) : (
              <span className="font-semibold text-red-400">
                Not quite — the correct answer was{" "}
                {questionResult.correctAnswer}.
              </span>
            )
          ) : selectedOption ? (
            "Locked in? Submit your answer."
          ) : (
            "Select an answer before the timer runs out."
          )}
        </p>

        <button
          onClick={() => {
            if (selectedOption) {
              onSubmit(selectedOption);
            }
          }}
          disabled={!selectedOption || answerSubmitted}
          className={`shrink-0 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
            !selectedOption || answerSubmitted
              ? "cursor-not-allowed bg-[#111827] text-slate-500"
              : "bg-violet-600 text-white hover:bg-violet-500"
          }`}
        >
          {answerSubmitted ? "Submitted" : "Submit Answer"}
        </button>
      </div>

      {/* Next question countdown */}
      {questionResult && (
        <p className="mt-3 text-center text-xs text-slate-500">
          Next question in{" "}
          <span className="font-semibold text-violet-400">
            {nextQuestionIn}
          </span>
        </p>
      )}
    </div>
  );
}

export default QuestionPanel;
