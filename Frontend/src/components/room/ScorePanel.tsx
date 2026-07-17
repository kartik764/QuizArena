function ScorePanel() {
  const scores = [
    {
      name: "QuizMaster",
      score: 2450,
    },
    {
      name: "Brainiac",
      score: 1980,
    },
    {
      name: "Smartypants",
      score: 1820,
    },
  ];

  return (
    <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Top Scores
      </h2>

      <div className="space-y-4">

        {scores.map((player) => (
          <div
            key={player.name}
            className="flex justify-between"
          >
            <span>
              {player.name}
            </span>

            <span className="font-semibold">
              {player.score}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ScorePanel;