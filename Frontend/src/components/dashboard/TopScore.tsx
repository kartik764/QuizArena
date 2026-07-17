function TopScore() {
  const players = [
    {
      rank: 1,
      name: "QuizMaster",
      score: "25,430",
    },
    {
      rank: 2,
      name: "Brainiac",
      score: "21,670",
    },
    {
      rank: 3,
      name: "Smartypants",
      score: "18,920",
    },
    {
      rank: 4,
      name: "TriviaKing",
      score: "15,230",
    },
    {
      rank: 5,
      name: "AceQuizzer",
      score: "12,890",
    },
    {
      rank: 6,
      name: "Kartik (You)",
      score: "11,450",
    },
  ];

  return (
    <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-6 h-full">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">
          Leaderboard
        </h2>

        <button className="text-purple-400">
          View All
        </button>
      </div>

      <div className="space-y-4">

        {players.map((player) => (
          <div
            key={player.rank}
            className={`flex justify-between items-center p-4 rounded-xl ${
              player.name.includes("You")
                ? "bg-purple-600/20 border border-purple-500"
                : "bg-[#111827]"
            }`}
          >

            <div className="flex items-center gap-4">

              <span className="font-bold text-lg w-6">
                {player.rank}
              </span>

              <span>
                {player.name}
              </span>

            </div>

            <span className="font-semibold">
              {player.score}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}

export default TopScore;