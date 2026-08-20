import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section id="about" className="px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-4xl border border-violet-500/20 bg-violet-500/[0.07]">
        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-125 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[100px]" />

        <div className="relative px-6 py-16 text-center sm:px-12 sm:py-20 lg:px-20">
          {/* Eyebrow */}
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3.5 py-1.5 text-xs font-semibold text-violet-200">
            <Sparkles className="h-3.5 w-3.5" />
            ENTER THE ARENA
          </div>

          {/* Heading */}
          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ready to test your
            <span className="bg-linear-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
              {" "}
              knowledge?
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Create a room, invite your friends, and compete in realtime quiz
            battles. Your next challenge is just one game away.
          </p>

          {/* CTA */}
          <div className="mt-9">
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 rounded-xl bg-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-400"
            >
              Start Playing Now
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <p className="mt-5 text-xs text-slate-600">
            Free to join • Create your first room in seconds
          </p>
        </div>
      </div>
    </section>
  );
}

export default CTA;