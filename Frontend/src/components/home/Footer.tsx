import { Trophy } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-white/[0.07] px-6 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2.5"
              aria-label="QuizArena home"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white shadow-[0_0_24px_rgba(124,58,237,0.25)]">
                <Trophy className="h-5 w-5" />
              </span>

              <span className="text-lg font-bold tracking-tight text-white">
                Quiz<span className="text-violet-300">Arena</span>
              </span>
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
              Realtime multiplayer quiz battles for players who love to
              compete.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-500">
            <a
              href="#features"
              className="transition-colors hover:text-white"
            >
              Features
            </a>

            <a
              href="#about"
              className="transition-colors hover:text-white"
            >
              About
            </a>

            <Link
              to="/leaderboard"
              className="transition-colors hover:text-white"
            >
              Leaderboard
            </Link>

            <Link
              to="/login"
              className="transition-colors hover:text-white"
            >
              Login
            </Link>
          </nav>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.07] pt-6 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 QuizArena. All rights reserved.</p>

          <p>Built for competitive minds.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;