import { Crown, Users } from "lucide-react";

interface Player {
  userId: string;
  username: string;
  socketId: string;
}

interface PlayersPanelProps {
  players: Player[];
  hostInfo: {
    userId: string;
  } | null;
  currentUserId: string;
  scores: Record<string, number>;
}

const avatarGradients = [
  "from-violet-600 to-purple-400",
  "from-cyan-500 to-violet-500",
  "from-green-500 to-cyan-400",
  "from-amber-400 to-red-400",
];

function PlayersPanel({
  players,
  hostInfo,
  currentUserId,
  scores,
}: PlayersPanelProps) {
  return (
    <section className="flex min-h-55 flex-col rounded-2xl border border-white/[0.07] bg-[#0d1224] lg:min-h-0">
      <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
        <h3 className="inline-flex items-center gap-2 text-sm font-bold tracking-tight text-white">
          <Users className="size-4 text-violet-400" />
          Players
        </h3>

        <span className="rounded-md bg-[#111827] px-2 py-0.5 text-xs font-semibold text-slate-400">
          {players.length}
        </span>
      </div>

      <div className="min-h-0 flex-1 space-y-1 overflow-y-auto p-2">
        {players.map((player, index) => {
          const isYou = player.userId === currentUserId;
          const isHost = player.userId === hostInfo?.userId;
          const score = scores[player.userId] ?? 0;

          return (
            <div
              key={player.userId}
              className={`flex items-center gap-3 rounded-lg border px-3 py-2 transition-colors ${
                isYou
                  ? "border-violet-500/40 bg-violet-500/10"
                  : "border-transparent hover:bg-[#111827]"
              }`}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <div
                  className={`flex size-9 items-center justify-center rounded-full bg-linear-to-br ${
                    avatarGradients[index % avatarGradients.length]
                  } text-sm font-bold text-white`}
                >
                  {player.username.charAt(0).toUpperCase()}
                </div>

                {/* Online indicator */}
                <span
                  className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-green-400 ring-2 ring-[#0d1224]"
                  aria-label="Online"
                />
              </div>

              {/* Username + badges */}
              <div className="flex min-w-0 flex-1 items-center gap-1.5">
                <span
                  className={`truncate text-sm font-semibold ${
                    isYou ? "text-violet-400" : "text-white"
                  }`}
                >
                  {player.username}
                </span>

                {isHost && (
                  <Crown className="size-3.5 shrink-0 text-amber-400" />
                )}

                {isYou && (
                  <span className="shrink-0 rounded bg-violet-600 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    You
                  </span>
                )}
              </div>

              {/* Score */}
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

export default PlayersPanel;