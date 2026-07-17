function Leaderboard() {
  const players = [
    { rank: 1, name: "QuizMaster", score: 25430 },
    { rank: 2, name: "Brainiac", score: 21670 },
    { rank: 3, name: "Smartypants", score: 18920 },
    { rank: 4, name: "TriviaKing", score: 15230 },
    { rank: 5, name: "AceQuizzer", score: 12890 },
    { rank: 6, name: "Kartik", score: 11450 },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white p-8">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold mb-8">
          Global Leaderboard
        </h1>

        <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-6">

          {players.map((player) => (
            <div
              key={player.rank}
              className="flex justify-between items-center p-5 border-b border-gray-800"
            >

              <div className="flex gap-4">
                <span className="font-bold">
                  #{player.rank}
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

    </div>
  );
}

export default Leaderboard;