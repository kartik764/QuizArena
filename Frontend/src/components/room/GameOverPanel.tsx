import { Crown, LayoutDashboard, Trophy } from "lucide-react";

interface Player {
  userId: string;
  username: string;
}

interface GameOverPanelProps {
  players: Player[];
  scores: Record<string, number>;
  currentUserId: string;
  onBackToDashboard: () => void;
}

const rankStyles: Record<number, string> = {
  1: "border-amber-400/30 bg-amber-400/10 text-amber-400",
  2: "border-slate-300/25 bg-slate-300/10 text-slate-300",
  3: "border-amber-600/30 bg-amber-600/10 text-amber-500",
};

function GameOverPanel({
  players,
  scores,
  currentUserId,
  onBackToDashboard,
}: GameOverPanelProps) {
  const rankedPlayers = [...players]
    .sort((a, b) => {
      return (scores[b.userId] || 0) - (scores[a.userId] || 0);
    })
    .slice(0, 5);

  const winner = rankedPlayers[0];

  const yourRank =
    rankedPlayers.findIndex(
      (player) => player.userId === currentUserId,
    ) + 1;

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto rounded-2xl border border-white/[0.07] bg-[#0d1224] p-6 md:p-8">
      {/* Celebration header */}
      <div className="flex flex-col items-center text-center">
        <div className="relative flex size-20 items-center justify-center">
          <span className="absolute inline-flex size-16 rounded-full bg-amber-400/20 blur-md" />

          <span className="relative flex size-16 items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/10">
            <Trophy className="size-8 text-amber-400" />
          </span>
        </div>

        <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Game Over
        </p>

        <h2 className="mt-1 text-3xl font-bold tracking-tight text-white">
          {winner ? `${winner.username} wins!` : "Game Over"}
        </h2>

        {yourRank > 0 && (
          <p className="mt-1 text-sm text-slate-400">
            You finished{" "}
            <span className="font-semibold text-violet-400">
              #{yourRank}
            </span>{" "}
            of {players.length} players
          </p>
        )}
      </div>

      {/* Final ranking */}
      <div className="mx-auto mt-8 w-full max-w-2xl">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-slate-500">
          Final Ranking
        </h3>

        <div className="space-y-2">
          {rankedPlayers.map((player, index) => {
            const rank = index + 1;
            const score = scores[player.userId] || 0;
            const isYou = player.userId === currentUserId;

            return (
              <div
                key={player.userId}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                  isYou
                    ? "border-violet-500/40 bg-violet-500/10"
                    : "border-white/[0.07] bg-[#111827]"
                }`}
              >
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-lg border text-sm font-bold ${
                    rankStyles[rank] ??
                    "border-white/[0.07] bg-[#0d1224] text-slate-500"
                  }`}
                >
                  {rank}
                </span>

                <div className="flex min-w-0 flex-1 items-center gap-1.5">
                  <span
                    className={`truncate text-sm font-semibold ${
                      isYou ? "text-violet-400" : "text-white"
                    }`}
                  >
                    {isYou ? "You" : player.username}
                  </span>

                  {rank === 1 && (
                    <Crown className="size-3.5 shrink-0 text-amber-400" />
                  )}
                </div>

                <span className="text-sm font-bold tabular-nums text-slate-300">
                  {score.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="mx-auto mt-8 w-full max-w-2xl">
        <button
          onClick={onBackToDashboard}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-[#111827] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#172033]"
        >
          <LayoutDashboard className="size-4" />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default GameOverPanel;