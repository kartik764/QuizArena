import { useEffect, useState } from "react";
import { ArrowRight, Crown } from "lucide-react";

interface Player {
  rank: number;
  name: string;
  score: number;
  isYou?: boolean;
}

interface LeaderboardUser {
  rank: number;
  username: string;
  score: number;
}

const rankStyles: Record<number, { badge: string; medal: string }> = {
  1: {
    badge: "bg-[#FBBF24]/15 text-[#FBBF24] border-[#FBBF24]/30",
    medal: "🥇",
  },
  2: {
    badge: "bg-slate-300/10 text-slate-300 border-slate-300/25",
    medal: "🥈",
  },
  3: {
    badge: "bg-amber-600/15 text-amber-500 border-amber-600/30",
    medal: "🥉",
  },
};

function Row({ player }: { player: Player }) {
  const top = rankStyles[player.rank];

  const rowClass = player.isYou
    ? "border-[#8B5CF6]/40 bg-[#8B5CF6]/10"
    : "border-transparent hover:border-white/[0.08] hover:bg-[#151A30]";

  const badgeClass = top
    ? top.badge
    : "border-white/[0.08] bg-[#151A30] text-[#94A3B8]";

  return (
    <div
      className={`group flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-all duration-200 ${rowClass}`}
    >
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-lg border text-sm font-bold ${badgeClass}`}
      >
        {top ? (
          <span className="text-base leading-none">{top.medal}</span>
        ) : (
          player.rank
        )}
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-2">
        <span
          className={`truncate text-sm font-semibold ${
            player.isYou ? "text-[#A855F7]" : "text-[#F8FAFC]"
          }`}
        >
          {player.name}
        </span>

        {player.rank === 1 && (
          <Crown className="size-3.5 shrink-0 text-[#FBBF24]" />
        )}

        {player.isYou && (
          <span className="text-[10px] font-semibold text-[#A855F7]">
            YOU
          </span>
        )}
      </div>

      <span className="text-sm font-bold tabular-nums text-[#F8FAFC]">
        {(player.score ?? 0).toLocaleString()}
      </span>
    </div>
  );
}

function TopScore() {
  const [leaderboard, setLeaderboard] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/leaderboard",
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard");
        }

        const data: LeaderboardUser[] = await response.json();

        const storedUser = sessionStorage.getItem("user");
        const currentUser = storedUser ? JSON.parse(storedUser) : null;

        const players: Player[] = data
          .slice(0, 5)
          .map((user) => ({
            rank: user.rank,
            name: user.username,
            score: user.score,
            isYou: currentUser?.username === user.username,
          }));

        setLeaderboard(players);
      } catch (error) {
        console.error("Leaderboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <section className="rounded-2xl border border-white/[0.07] bg-[#0D1224] p-5">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#FBBF24]">
            Top Players
          </p>

          <h2 className="mt-1 text-xl font-bold tracking-tight text-[#F8FAFC]">
            Leaderboard
          </h2>
        </div>

        <button
          type="button"
          onClick={() => {
            window.location.href = "/leaderboard";
          }}
          className="inline-flex items-center gap-1 text-sm font-medium text-[#94A3B8] transition-colors hover:text-[#FBBF24]"
        >
          View all
          <ArrowRight className="size-4" />
        </button>
      </div>

      <div className="space-y-1">
        {loading ? (
          <p className="py-4 text-center text-sm text-[#94A3B8]">
            Loading leaderboard...
          </p>
        ) : leaderboard.length === 0 ? (
          <p className="py-4 text-center text-sm text-[#94A3B8]">
            No leaderboard data yet.
          </p>
        ) : (
          leaderboard.map((player) => (
            <Row key={player.rank} player={player} />
          ))
        )}
      </div>
    </section>
  );
}

export default TopScore;