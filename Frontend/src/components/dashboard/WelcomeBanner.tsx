import { DoorOpen, Plus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WelcomeBannerProps {
  activeRooms?: number;
  playersOnline?: number;
}

function WelcomeBanner({
  activeRooms = 0,
  playersOnline = 0,
}: WelcomeBannerProps) {
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const username = user.username || "Player";

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-linear-to-br from-[#151a30] via-[#11162a] to-[#0d1224]">
      {/* Grid decoration */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #8b5cf6 1px, transparent 1px), linear-gradient(to bottom, #8b5cf6 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 20% 0%, black, transparent)",
        }}
        aria-hidden="true"
      />

      {/* Glow */}
      <div
        className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-start gap-8 p-6 md:p-8">
        <div className="max-w-xl">
          {/* Status */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>

            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
              Player Dashboard
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Welcome back,{" "}
            <span className="text-violet-400">{username}!</span>
          </h1>

          <p className="mt-2 text-base text-slate-400">
            Ready for your next quiz battle?
          </p>

          {/* Stats */}
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-400" />

              <span className="text-sm">
                <span className="font-bold text-white">
                  {playersOnline}
                </span>

                <span className="text-slate-400">
                  {" "}
                  players online
                </span>
              </span>
            </div>

            <div className="h-4 w-px bg-white/8" />

            <div className="flex items-center gap-2">
              <DoorOpen className="h-4 w-4 text-cyan-400" />

              <span className="text-sm">
                <span className="font-bold text-white">
                  {activeRooms}
                </span>

                <span className="text-slate-400">
                  {" "}
                  active rooms
                </span>
              </span>
            </div>
          </div>

          {/* Create Room */}
          <button
            onClick={() => navigate("/create-room")}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_-8px] shadow-violet-500/70 transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-[0_12px_36px_-8px] hover:shadow-violet-500/80"
          >
            <Plus className="h-4 w-4" />
            Create Room
          </button>
        </div>
      </div>
    </section>
  );
}

export default WelcomeBanner;