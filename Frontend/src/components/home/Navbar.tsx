import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Menu,
  Trophy,
  X,
} from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="relative z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5"
          aria-label="QuizArena home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white shadow-[0_0_28px_rgba(124,58,237,0.35)]">
            <Trophy className="h-5 w-5" />
          </span>

          <span className="text-lg font-bold tracking-tight text-white">
            Quiz<span className="text-violet-300">Arena</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
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

          <a
            href="#stats"
            className="transition-colors hover:text-white"
          >
            Community
          </a>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="group inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-violet-500"
          >
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="rounded-lg border border-white/10 bg-white/3 p-2 text-slate-300 transition-colors hover:bg-white/6 hover:text-white md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="mx-5 rounded-2xl border border-white/10 bg-[#0d1224]/95 p-5 shadow-2xl backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4 text-sm">
            <a
              href="#features"
              onClick={closeMenu}
              className="text-slate-300 transition-colors hover:text-white"
            >
              Features
            </a>

            <a
              href="#about"
              onClick={closeMenu}
              className="text-slate-300 transition-colors hover:text-white"
            >
              About
            </a>

            <a
              href="#stats"
              onClick={closeMenu}
              className="text-slate-300 transition-colors hover:text-white"
            >
              Community
            </a>

            <div className="my-1 h-px bg-white/[0.07]" />

            <Link
              to="/login"
              onClick={closeMenu}
              className="text-slate-300 transition-colors hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={closeMenu}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-violet-500"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;