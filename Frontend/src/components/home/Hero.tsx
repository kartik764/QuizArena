import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Clock3,
  Play,
  Users,
} from "lucide-react";

function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-10 lg:px-8 lg:pb-32 lg:pt-24"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 -top-48 h-125 w-125 -translate-x-1/2 rounded-full bg-violet-600/15 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1fr_0.9fr]">
        {/* Left */}
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3.5 py-1.5 text-xs font-semibold text-violet-200">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
            REALTIME • MULTIPLAYER • COMPETE
          </div>

          {/* Heading */}
          <h1 className="text-balance text-5xl font-black leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            Think fast.
            <br />
            <span className="bg-linear-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
              Play harder.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-lg text-pretty text-lg leading-8 text-slate-400">
            The competitive quiz platform where knowledge meets adrenaline.
            Battle your friends, master new topics, and climb the leaderboard.
          </p>

          {/* Actions */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.28)] transition-all hover:-translate-y-0.5 hover:bg-violet-400"
            >
              Start Playing
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/3 px-6 py-3.5 text-sm font-semibold text-slate-300 transition-colors hover:bg-white/6 hover:text-white"
            >
              <Play className="h-4 w-4 fill-current" />
              Explore Arena
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-10 flex items-center gap-4 text-sm text-slate-400">
            <div className="flex -space-x-2">
              {["M", "J", "R", "S"].map((letter, index) => (
                <span
                  key={letter}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#00020c] text-[10px] font-bold text-slate-950 ${
                    [
                      "bg-cyan-300",
                      "bg-violet-300",
                      "bg-fuchsia-300",
                      "bg-amber-300",
                    ][index]
                  }`}
                >
                  {letter}
                </span>
              ))}
            </div>

            <span>
              <strong className="text-white">10K+</strong> players competing
            </span>
          </div>
        </div>

        {/* Right — Game Preview */}
        <div
          className="relative mx-auto w-full max-w-xl"
          aria-label="QuizArena game preview"
        >
          {/* Glow */}
          <div className="absolute -inset-6 rounded-4xl bg-violet-500/15 blur-3xl" />

          {/* Preview container */}
          <div className="relative rounded-[1.75rem] border border-white/10 bg-white/4 p-3 shadow-2xl backdrop-blur-xl sm:p-4">
            <div className="rounded-2xl border border-white/10 bg-[#070a16]/95 p-5 sm:p-7">
              {/* Match header */}
              <div className="mb-7 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  LIVE MATCH
                </span>

                <span className="flex items-center gap-1">
                  <Clock3 className="h-3.5 w-3.5" />
                  00:18
                </span>
              </div>

              {/* Players */}
              <div className="mb-7 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-400/20 text-xs font-bold text-violet-200">
                    AK
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Player
                    </p>
                    <p className="text-xs text-slate-500">
                      2,840 pts
                    </p>
                  </div>
                </div>

                <span className="text-sm font-bold text-slate-600">
                  VS
                </span>

                <div className="flex items-center gap-3 text-right">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      You
                    </p>
                    <p className="text-xs text-cyan-300">
                      2,795 pts
                    </p>
                  </div>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/20 text-xs font-bold text-cyan-200">
                    YO
                  </span>
                </div>
              </div>

              {/* Question progress */}
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  Question 7 of 10
                </span>

                <span className="text-xs font-medium text-violet-300">
                  +250 pts
                </span>
              </div>

              <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[70%] rounded-full bg-linear-to-r from-violet-400 to-cyan-300" />
              </div>

              {/* Question */}
              <h2 className="text-balance text-xl font-semibold leading-8 text-white sm:text-2xl">
                Which planet has the fastest rotation in our solar system?
              </h2>

              {/* Answers */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {["Jupiter", "Mars", "Venus", "Saturn"].map(
                  (answer, index) => {
                    const selected = index === 0;

                    return (
                      <button
                        key={answer}
                        type="button"
                        className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm transition-colors ${
                          selected
                            ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-100"
                            : "border-white/10 bg-white/3 text-slate-400 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-xs text-slate-600">
                            {String.fromCharCode(65 + index)}
                          </span>

                          {answer}
                        </span>

                        {selected && (
                          <Check className="h-4 w-4 text-cyan-300" />
                        )}
                      </button>
                    );
                  },
                )}
              </div>
            </div>
          </div>

          {/* Floating status */}
          <div className="absolute -left-5 top-12 hidden -translate-x-1/2 rounded-xl border border-white/10 bg-[#101426]/95 p-3 shadow-xl backdrop-blur-md sm:block">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-400/15">
                <Users className="h-4 w-4 text-violet-300" />
              </span>

              <div>
                <p className="text-[10px] text-slate-500">
                  Players online
                </p>
                <p className="text-sm font-bold text-white">
                  1,284
                </p>
              </div>
            </div>
          </div>

          {/* Floating status */}
          <div className="absolute -right-5 bottom-12 hidden translate-x-1/2 rounded-xl border border-white/10 bg-[#101426]/95 p-3 shadow-xl backdrop-blur-md sm:block">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />

              <div>
                <p className="text-[10px] text-slate-500">
                  Arena status
                </p>
                <p className="text-sm font-bold text-white">
                  Live
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;