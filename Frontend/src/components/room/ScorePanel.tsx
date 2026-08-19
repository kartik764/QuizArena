interface Player {
  socketId: string;
  userId: string;
  username: string;
}

interface ScorePanelProps {
  players: Player[];
  scores: Record<string, number>;
}

function ScorePanel({ players, scores }: ScorePanelProps) {
  const sortedPlayers = [...players].sort((a, b) => {
    return (scores[b.userId] || 0) - (scores[a.userId] || 0);
  });

  return (
    <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-6">
      <h2 className="text-2xl font-bold mb-6">Top Scores</h2>

      <div className="space-y-4">
        {sortedPlayers.map((player, index) => (
          <div key={player.userId} className="flex justify-between">
            <span className="flex items-center gap-2">
              {index === 0 && "🥇"}
              {index === 1 && "🥈"}
              {index === 2 && "🥉"}

              {index > 2 && `${index + 1}.`}

              {player.username}
            </span>

            <span className="font-semibold">{scores[player.userId] || 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScorePanel;
