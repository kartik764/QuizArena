function QuestionPanel() {
  const options = ["H2O", "O2", "CO2", "HO2"];

  return (
    <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-8">
      {/* Progress */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl">Question 4 of 10</h2>

        <span className="bg-purple-600 px-4 py-2 rounded-xl">Science</span>
      </div>

      <div className="w-full h-2 bg-gray-800 rounded-full mb-8">
        <div className="w-[40%] h-full bg-purple-600 rounded-full"></div>
      </div>

      {/* Question */}
      <h1 className="text-4xl font-bold mb-10">
        What is the chemical symbol for water?
      </h1>

      {/* Options */}
      <div className="space-y-4">
        {options.map((option, index) => (
          <button
            key={option}
            className="w-full text-left border border-gray-700 rounded-2xl p-6 hover:border-purple-500 transition"
          >
            <span className="font-bold mr-4">
              {String.fromCharCode(65 + index)}
            </span>

            {option}
          </button>
        ))}
      </div>

      {/* Submit */}
      <button className="w-full mt-8 bg-purple-600 hover:bg-purple-700 py-4 rounded-2xl text-xl font-semibold">
        Submit Answer
      </button>

      {/* Hint */}
      <p className="mt-8 text-gray-400">
        💡 Hint: It's made up of Hydrogen and Oxygen.
      </p>
    </div>
  );
}

export default QuestionPanel;
