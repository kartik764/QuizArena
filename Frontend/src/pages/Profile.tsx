import { useEffect, useState } from "react";
import {
  Gamepad2,
  Mail,
  Trophy,
  Star,
  Users,
  Medal,
  Sparkles,
} from "lucide-react";

interface ProfileData {
  username: string;
  email: string;
  avatar: string;
  totalScore: number;
  gamesPlayed: number;
  activeRooms: number;
  currentRank: number;
}

function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/profile",
          {
            cache: "no-store",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data: ProfileData = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
        <div className="text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-violet-500/10">
            <Sparkles className="size-5 animate-pulse text-violet-400" />
          </div>
          <p className="mt-3 text-sm text-slate-400">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
        <div className="rounded-2xl border border-white/[0.07] bg-[#0d1224] px-8 py-6 text-center">
          <p className="text-sm text-slate-400">
            Unable to load profile.
          </p>
        </div>
      </div>
    );
  }

  const initial = profile.username.charAt(0).toUpperCase();

  const stats = [
    {
      label: "Games Played",
      value: profile.gamesPlayed.toLocaleString(),
      description: "Quizzes completed",
      icon: Gamepad2,
      iconStyle: "bg-violet-500/10 text-violet-400",
    },
    {
      label: "Active Rooms",
      value: profile.activeRooms.toLocaleString(),
      description: "Rooms available now",
      icon: Users,
      iconStyle: "bg-cyan-400/10 text-cyan-400",
    },
    {
      label: "Current Rank",
      value: `#${profile.currentRank}`,
      description: "Based on total points",
      icon: Medal,
      iconStyle: "bg-amber-400/10 text-amber-400",
    },
    {
      label: "Total Points",
      value: profile.totalScore.toLocaleString(),
      description: "Points earned",
      icon: Star,
      iconStyle: "bg-pink-500/10 text-pink-400",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] px-4 py-8 text-white md:px-8">
      <div className="mx-auto w-full max-w-5xl">

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            Player Profile
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Your Profile
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Track your quiz activity and competitive progress.
          </p>
        </div>

        {/* Profile Card */}
        <section className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d1224] p-6 md:p-8">

          {/* Background glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-violet-600/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">

            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-full bg-violet-500/30 blur-xl" />

              <div className="relative flex size-24 items-center justify-center rounded-full border-2 border-violet-400/40 bg-linear-to-br from-violet-600 to-purple-500 text-4xl font-bold shadow-[0_0_35px_-10px] shadow-violet-500/70">
                {profile.avatar || initial}
              </div>

              <span className="absolute bottom-1 right-1 size-4 rounded-full border-2 border-[#0d1224] bg-green-400" />
            </div>

            {/* User Info */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {profile.username}
                </h2>

                <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-400">
                  Player
                </span>
              </div>

              <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                <Mail className="size-4" />
                <span className="truncate">{profile.email}</span>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <Trophy className="size-3.5 text-amber-400" />
                <span>
                  Current leaderboard position:{" "}
                  <span className="font-semibold text-slate-300">
                    #{profile.currentRank}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group rounded-2xl border border-white/[0.07] bg-[#0d1224] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/12 hover:bg-[#10172b]"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex size-10 items-center justify-center rounded-xl ${stat.iconStyle}`}
                  >
                    <Icon className="size-5" />
                  </div>
                </div>

                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {stat.label}
                </p>

                <p className="mt-1 text-3xl font-bold tracking-tight text-white">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Player Overview */}
        <section className="mt-6 rounded-2xl border border-white/[0.07] bg-[#0d1224] p-6 md:p-7">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-400/10">
              <Trophy className="size-5 text-cyan-400" />
            </div>

            <div>
              <h2 className="text-base font-bold text-white">
                Player Overview
              </h2>

              <p className="text-sm text-slate-400">
                Your current QuizArena progress.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

            <div className="rounded-xl border border-white/6 bg-[#111827] p-4">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Gamepad2 className="size-4 text-violet-400" />
                Games Completed
              </div>

              <p className="mt-2 text-xl font-bold text-white">
                {profile.gamesPlayed}
              </p>
            </div>

            <div className="rounded-xl border border-white/6 bg-[#111827] p-4">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Star className="size-4 text-amber-400" />
                Points Earned
              </div>

              <p className="mt-2 text-xl font-bold text-white">
                {profile.totalScore.toLocaleString()}
              </p>
            </div>

            <div className="rounded-xl border border-white/6 bg-[#111827] p-4">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Medal className="size-4 text-cyan-400" />
                Leaderboard Rank
              </div>

              <p className="mt-2 text-xl font-bold text-white">
                #{profile.currentRank}
              </p>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}

export default Profile;