import { useState } from "react";
import {
  Crown,
  Copy,
  Check,
  Loader2,
  Play,
  Users,
} from "lucide-react";

interface WaitingPanelProps {
  isHost: boolean;
  playerCount: number;
  maxPlayers: number;
  roomCode: string;
  onStartGame: () => void;
}

function WaitingPanel({
  isHost,
  playerCount,
  maxPlayers,
  roomCode,
  onStartGame,
}: WaitingPanelProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard?.writeText(roomCode).catch(() => {});

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1600);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl border border-white/[0.07] bg-[#0d1224] p-6 text-center md:p-10">
      {/* Animated waiting indicator */}
      <div className="relative flex size-20 items-center justify-center">
        <span className="absolute inline-flex size-16 rounded-full bg-violet-500/20 blur-md" />

        <span className="absolute inline-flex size-full animate-ping rounded-full bg-violet-500/10" />

        <span className="relative flex size-16 items-center justify-center rounded-full border border-violet-500/40 bg-violet-500/15">
          <Loader2 className="size-7 animate-spin text-violet-400" />
        </span>
      </div>

      {/* Heading */}
      <h2 className="mt-6 text-2xl font-bold tracking-tight text-white">
        Waiting for players...
      </h2>

      {/* Player count */}
      <div className="mt-2 inline-flex items-center gap-2 text-sm text-slate-400">
        <Users className="size-4 text-cyan-400" />

        <span>
          <span className="font-semibold text-white">
            {playerCount}
          </span>{" "}
          of {maxPlayers} players joined
        </span>
      </div>

      {/* Player dots */}
      <div className="mt-4 flex items-center gap-1.5">
        {Array.from({ length: maxPlayers }).map((_, index) => (
          <span
            key={index}
            className={`size-2.5 rounded-full transition-colors ${
              index < playerCount
                ? "bg-violet-500"
                : "bg-slate-700"
            }`}
          />
        ))}
      </div>

      {/* Share room code */}
      <div className="mt-8 w-full max-w-xs">
        <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
          Share the room code with your friends
        </p>

        <button
          onClick={copyCode}
          className="group mt-2 flex w-full items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-[#111827] px-4 py-3 transition-colors hover:border-cyan-400/40"
        >
          <span className="text-2xl font-bold tracking-[0.2em] text-white">
            {roomCode}
          </span>

          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors group-hover:text-cyan-400">
            {copied ? (
              <>
                <Check className="size-4 text-green-400" />
                Copied
              </>
            ) : (
              <>
                <Copy className="size-4" />
                Copy
              </>
            )}
          </span>
        </button>
      </div>

      {/* Host / player action */}
      <div className="mt-8 w-full max-w-xs">
        {isHost ? (
          <>
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-400">
              <Crown className="size-3.5" />
              You are the host
            </div>

            <button
              onClick={onStartGame}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3.5 text-base font-bold text-white shadow-[0_0_32px_-8px] shadow-violet-500/70 transition-all duration-200 hover:bg-violet-500 hover:shadow-[0_0_40px_-6px] hover:shadow-violet-500/80"
            >
              <Play className="size-5 fill-current" />
              Start Quiz
            </button>
          </>
        ) : (
          <div className="rounded-xl border border-white/[0.07] bg-[#111827] px-4 py-4">
            <p className="text-sm font-medium text-slate-400">
              Waiting for the host to start the quiz...
            </p>

            <div className="mt-3 flex items-center justify-center gap-1">
              <span className="size-1.5 animate-bounce rounded-full bg-violet-500 [animation-delay:-0.3s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-violet-500 [animation-delay:-0.15s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-violet-500" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WaitingPanel;