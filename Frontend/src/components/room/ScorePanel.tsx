import { BarChart3 } from "lucide-react";

interface Player {
  socketId: string;
  userId: string;
  username: string;
}

interface ScorePanelProps {
  players: Player[];
  scores: Record<string, number>;
  currentUserId: string;
}

const rankColor: Record<number, string> = {
  1: "text-amber-400",
  2: "text-slate-300",
  3: "text-amber-600",
};

function ScorePanel({
  players,
  scores,
  currentUserId,
}: ScorePanelProps) {
  const sortedPlayers = [...players].sort((a, b) => {
    return (scores[b.userId] || 0) - (scores[a.userId] || 0);
  });

  return (
    <section className="flex min-h-55 flex-col rounded-2xl border border-white/[0.07] bg-[#0d1224] lg:min-h-0">
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
        <BarChart3 className="size-4 text-amber-400" />

        <h3 className="text-sm font-bold tracking-tight text-white">
          Live Scores
        </h3>
      </div>

      <div className="min-h-0 flex-1 space-y-1 overflow-y-auto p-2">
        {sortedPlayers.map((player, index) => {
          const rank = index + 1;
          const score = scores[player.userId] || 0;
          const isYou = player.userId === currentUserId;

          return (
            <div
              key={player.userId}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                isYou
                  ? "bg-violet-500/10"
                  : "hover:bg-[#111827]"
              }`}
            >
              <span
                className={`w-5 shrink-0 text-center text-sm font-bold tabular-nums ${
                  rankColor[rank] ?? "text-slate-500"
                }`}
              >
                {rank}
              </span>

              <span
                className={`min-w-0 flex-1 truncate text-sm font-semibold ${
                  isYou ? "text-violet-400" : "text-white"
                }`}
              >
                {isYou ? "You" : player.username}
              </span>

              <span className="text-sm font-bold tabular-nums text-slate-400">
                {score.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ScorePanel;