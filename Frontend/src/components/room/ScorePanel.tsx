interface Player{
  socketId : string;
  userId : string;
  username : string;
}

interface ScorePanelProps{
  players : Player[];
  scores : Record<string, number>;
}

function ScorePanel({players, scores} : ScorePanelProps) {

  return (
    <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Top Scores
      </h2>

      <div className="space-y-4">

        {players.map((player) => (
          <div
            key={player.userId}
            className="flex justify-between"
          >
            <span>
              {player.username}
            </span>

            <span className="font-semibold">
              {scores[player.userId] || 0}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ScorePanel;