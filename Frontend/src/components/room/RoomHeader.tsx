import { useState } from "react";
import {
  Swords,
  Copy,
  Check,
  LogOut,
  Users,
} from "lucide-react";

interface RoomHeaderProps {
  room: any;
  handleLeaveRoom: () => void;
  playerCount: number;
}

const difficultyStyles: Record<string, string> = {
  Easy: "border-[#22C55E]/20 bg-[#22C55E]/10 text-[#22C55E]",
  Medium: "border-[#FBBF24]/20 bg-[#FBBF24]/10 text-[#FBBF24]",
  Hard: "border-[#F43F5E]/20 bg-[#F43F5E]/10 text-[#F43F5E]",
};

function RoomHeader({
  room,
  handleLeaveRoom,
  playerCount,
}: RoomHeaderProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard?.writeText(room.roomCode).catch(() => {});

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1600);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#0d1224]/90 backdrop-blur-xl">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 md:px-6">

        {/* Room identity */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-violet-600 shadow-[0_0_20px_-4px] shadow-violet-500/60">
            <Swords className="size-5 text-white" />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-base font-bold leading-tight tracking-tight text-white">
              {room.roomName}
            </h1>

            <button
              onClick={copyCode}
              className="group mt-0.5 inline-flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-cyan-400"
              aria-label="Copy room code"
            >
              <span className="font-mono uppercase tracking-wider">
                {room.roomCode}
              </span>

              {copied ? (
                <Check className="size-3.5 text-green-400" />
              ) : (
                <Copy className="size-3.5 opacity-70 group-hover:opacity-100" />
              )}
            </button>
          </div>
        </div>

        {/* Room information */}
        <div className="flex flex-wrap items-center gap-2">
          {room.category && (
            <span className="rounded-md border border-cyan-400/20 bg-cyan-400/10 px-2 py-0.5 text-xs font-semibold text-cyan-400">
              {room.category}
            </span>
          )}

          {room.difficulty && (
            <span
              className={`rounded-md border px-2 py-0.5 text-xs font-semibold ${
                difficultyStyles[room.difficulty] ||
                "border-slate-500/20 bg-slate-500/10 text-slate-400"
              }`}
            >
              {room.difficulty}
            </span>
          )}

          <span className="inline-flex items-center gap-1.5 rounded-md bg-[#111827] px-2 py-1 text-xs font-medium text-slate-400">
            <Users className="size-3.5" />
            {playerCount} / {room.maxPlayers} Players
          </span>
        </div>

        {/* Leave room */}
        <div className="ml-auto flex items-center">
          <button
            onClick={handleLeaveRoom}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/20"
          >
            <LogOut className="size-4" />

            <span className="hidden sm:inline">
              Leave Room
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default RoomHeader;