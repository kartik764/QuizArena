import { Bell, Menu, Search } from "lucide-react";

interface TopbarProps {
  onMenuClick: () => void;
}

function Topbar({ onMenuClick }: TopbarProps) {
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  const username = user.username || "User";
  const initial = username.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-white/[0.07] bg-[#0d1224]/80 px-4 backdrop-blur-xl md:px-6">
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="rounded-md p-2 text-slate-400 transition-colors hover:bg-white/6 hover:text-white lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="relative hidden flex-1 sm:block md:max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

        <input
          type="search"
          placeholder="Search rooms, players..."
          className="h-10 w-full rounded-lg border border-white/8 bg-[#070812] pl-9 pr-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20"
        />
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
        {/* Join Room */}
        <div className="hidden items-center gap-2 md:flex">
          <input
            type="text"
            placeholder="Room code"
            className="h-10 w-28 rounded-lg border border-white/8 bg-[#070812] px-3 text-sm uppercase tracking-wider text-white outline-none transition-colors placeholder:normal-case placeholder:tracking-normal placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
          />

          <button className="h-10 rounded-lg bg-cyan-400/15 px-4 text-sm font-semibold text-cyan-300 transition-colors hover:bg-cyan-400/25">
            Join Room
          </button>
        </div>

        {/* Notifications */}
        <button
          className="relative rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/6 hover:text-white"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-[#0d1224]" />
        </button>

        {/* User avatar */}
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-violet-600 to-fuchsia-500 text-sm font-bold text-white ring-2 ring-violet-500/30"
          title={username}
        >
          {initial}
        </div>
      </div>
    </header>
  );
}

export default Topbar;