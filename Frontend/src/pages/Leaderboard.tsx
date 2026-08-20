import { useEffect, useState } from "react";

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
          "http://localhost:5000/api/leaderboard",
          {
            cache: "no-store",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
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

  return (
    <div className="min-h-screen bg-[#050816] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-4xl font-bold sm:text-5xl">
          Global Leaderboard
        </h1>

        <div className="rounded-3xl border border-white/[0.07] bg-[#0f172a] p-6">
          {loading ? (
            <div className="py-10 text-center text-slate-400">
              Loading leaderboard...
            </div>
          ) : players.length === 0 ? (
            <div className="py-10 text-center text-slate-400">
              No leaderboard data yet.
            </div>
          ) : (
            players.map((player) => (
              <div
                key={player.rank}
                className="flex items-center justify-between border-b border-gray-800 p-5 last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <span className="font-bold text-slate-400">
                    #{player.rank}
                  </span>

                  <span className="font-medium">
                    {player.username}
                  </span>
                </div>

                <span className="font-semibold">
                  {player.score.toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;