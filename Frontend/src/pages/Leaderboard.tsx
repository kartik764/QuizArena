import { useEffect, useState } from "react";
import {
  Crown,
  Medal,
  Trophy,
  Star,
  Sparkles,
} from "lucide-react";

interface LeaderboardUser {
  rank: number;
  username: string;
  score: number;
}

function Leaderboard() {
  const [players, setPlayers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/leaderboard`,
          {
            cache: "no-store",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard");
        }

        const data: LeaderboardUser[] = await response.json();

        setPlayers(data);
      } catch (error) {
        console.error("Leaderboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const topThree = players.slice(0, 3);
  const remainingPlayers = players.slice(3);

  const rankStyles = {
    1: {
      border: "border-amber-400/30",
      background: "bg-amber-400/10",
      text: "text-amber-400",
      glow: "shadow-[0_0_35px_-15px] shadow-amber-400/60",
    },
    2: {
      border: "border-slate-300/25",
      background: "bg-slate-300/10",
      text: "text-slate-300",
      glow: "",
    },
    3: {
      border: "border-amber-600/30",
      background: "bg-amber-600/10",
      text: "text-amber-500",
      glow: "",
    },
  };

  return (
    <div className="min-h-screen bg-[#050816] px-4 py-8 text-white md:px-8">
      <div className="mx-auto w-full max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            Competition
          </p>

          <div className="mt-2 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-violet-500/10">
              <Trophy className="size-5 text-violet-400" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Global Leaderboard
            </h1>
          </div>

          <p className="mt-3 text-sm text-slate-400">
            See who is leading the QuizArena competition.
          </p>
        </div>

        {loading ? (
          /* Loading */
          <div className="rounded-2xl border border-white/[0.07] bg-[#0d1224] p-12 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-violet-500/10">
              <Sparkles className="size-5 animate-pulse text-violet-400" />
            </div>

            <p className="mt-4 text-sm text-slate-400">
              Loading leaderboard...
            </p>
          </div>
        ) : players.length === 0 ? (
          /* Empty */
          <div className="rounded-2xl border border-white/[0.07] bg-[#0d1224] p-12 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-violet-500/10">
              <Trophy className="size-5 text-violet-400" />
            </div>

            <h2 className="mt-4 text-base font-semibold text-white">
              No leaderboard data yet
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Complete a quiz to appear on the leaderboard.
            </p>
          </div>
        ) : (
          <>
            {/* Top 3 */}
            <section>
              <div className="mb-4 flex items-center gap-2">
                <Crown className="size-4 text-amber-400" />

                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">
                  Top Players
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {topThree.map((player) => {
                  const style =
                    rankStyles[
                      player.rank as keyof typeof rankStyles
                    ];

                  return (
                    <div
                      key={player.rank}
                      className={`relative overflow-hidden rounded-2xl border bg-[#0d1224] p-6 ${style.border} ${style.glow}`}
                    >
                      {/* Decorative glow */}
                      <div
                        className={`pointer-events-none absolute -right-10 -top-10 size-28 rounded-full blur-3xl ${style.background}`}
                      />

                      <div className="relative">

                        {/* Rank */}
                        <div className="flex items-center justify-between">
                          <div
                            className={`flex size-10 items-center justify-center rounded-xl border ${style.border} ${style.background}`}
                          >
                            {player.rank === 1 ? (
                              <Crown
                                className={`size-5 ${style.text}`}
                              />
                            ) : (
                              <Medal
                                className={`size-5 ${style.text}`}
                              />
                            )}
                          </div>

                          <span
                            className={`text-2xl font-black ${style.text}`}
                          >
                            #{player.rank}
                          </span>
                        </div>

                        {/* Avatar */}
                        <div className="mt-6 flex items-center gap-3">
                          <div
                            className={`flex size-12 items-center justify-center rounded-full border ${style.border} ${style.background} text-lg font-bold ${style.text}`}
                          >
                            {player.username
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-base font-bold text-white">
                              {player.username}
                            </p>

                            <p className="text-xs text-slate-500">
                              {player.rank === 1
                                ? "Current Champion"
                                : "Top Player"}
                            </p>
                          </div>
                        </div>

                        {/* Score */}
                        <div className="mt-6 border-t border-white/[0.07] pt-4">
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Total Points
                          </p>

                          <div className="mt-1 flex items-center gap-2">
                            <Star
                              className={`size-4 ${style.text}`}
                            />

                            <span className="text-2xl font-bold text-white">
                              {player.score.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Remaining Players */}
            {remainingPlayers.length > 0 && (
              <section className="mt-8">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">
                    All Rankings
                  </h2>

                  <span className="rounded-md bg-[#111827] px-2 py-1 text-xs font-semibold text-slate-500">
                    {players.length} Players
                  </span>
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d1224]">
                  {remainingPlayers.map((player) => (
                    <div
                      key={player.rank}
                      className="flex items-center gap-4 border-b border-white/6 px-4 py-4 transition-colors last:border-b-0 hover:bg-[#111827] md:px-5"
                    >
                      {/* Rank */}
                      <div className="flex w-8 shrink-0 justify-center">
                        <span className="text-sm font-bold tabular-nums text-slate-500">
                          #{player.rank}
                        </span>
                      </div>

                      {/* Avatar */}
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-sm font-bold text-violet-400">
                        {player.username.charAt(0).toUpperCase()}
                      </div>

                      {/* Username */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white">
                          {player.username}
                        </p>
                      </div>

                      {/* Score */}
                      <div className="flex items-center gap-1.5">
                        <Star className="size-3.5 text-amber-400" />

                        <span className="text-sm font-bold tabular-nums text-slate-300">
                          {player.score.toLocaleString()}
                        </span>

                        <span className="hidden text-xs text-slate-600 sm:inline">
                          pts
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;