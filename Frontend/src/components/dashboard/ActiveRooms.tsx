import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  FileQuestion,
  Globe,
  Lock,
  Plus,
  Users,
} from "lucide-react";

interface Room {
  roomCode: string;
  roomName: string;
  category: string;
  difficulty: string;
  isPrivate: boolean;
  maxPlayers: number;
  questionCount: number;
  players: any[];
}

const difficultyStyles: Record<string, string> = {
  easy: "border-green-400/20 bg-green-400/10 text-green-400",
  medium: "border-amber-400/20 bg-amber-400/10 text-amber-400",
  hard: "border-rose-400/20 bg-rose-400/10 text-rose-400",
};

function ActiveRoom() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const navigate = useNavigate();

  // Fetch active rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) return;

        const response = await fetch(
          "http://localhost:5000/api/rooms",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message);
          return;
        }

        setRooms(data);
      } catch (error) {
        console.error("Fetch Rooms Error:", error);
      }
    };

    fetchRooms();
  }, []);

  // Join room
  const handleJoinRoom = async (roomCode: string) => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) return;

      const response = await fetch(
        "http://localhost:5000/api/rooms/join",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            roomCode,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      navigate(`/room/${data.roomCode}`);
    } catch (error) {
      console.error("Join Room Error:", error);
    }
  };

  return (
    <section>
      {/* Header */}
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
            Play Now
          </p>

          <h2 className="mt-1 text-xl font-bold tracking-tight text-white">
            Active Rooms
          </h2>
        </div>

        <button className="inline-flex items-center gap-1 text-sm font-medium text-slate-400 transition-colors hover:text-violet-400">
          View all
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Empty state */}
      {rooms.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-[#0d1224] px-6 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/10">
            <Plus className="h-6 w-6 text-violet-400" />
          </div>

          <h3 className="mt-4 text-base font-bold text-white">
            No active rooms yet
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Be the first to start a quiz.
          </p>

          <button
            onClick={() => navigate("/create-room")}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-500"
          >
            <Plus className="h-4 w-4" />
            Create Room
          </button>
        </div>
      ) : (
        /* Room cards */
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {rooms.map((room) => {
            const playerCount = room.players?.length || 0;

            const isFull =
              playerCount >= room.maxPlayers;

            const fillPct =
              room.maxPlayers > 0
                ? Math.min(
                    Math.round(
                      (playerCount / room.maxPlayers) * 100
                    ),
                    100
                  )
                : 0;

            const difficulty =
              difficultyStyles[
                room.difficulty?.toLowerCase()
              ] ||
              "border-white/10 bg-white/[0.05] text-slate-400";

            return (
              <div
                key={room.roomCode}
                className="group relative flex flex-col rounded-xl border border-white/[0.07] bg-[#0d1224] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-[0_10px_40px_-12px] hover:shadow-violet-500/40"
              >
                {/* Room header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-bold tracking-tight text-white">
                      {room.roomName}
                    </h3>

                    <p className="mt-0.5 text-sm text-slate-400">
                      {room.category}
                    </p>
                  </div>

                  {/* Visibility */}
                  <span
                    className={`inline-flex shrink-0 items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      room.isPrivate
                        ? "border-white/10 bg-white/5 text-slate-400"
                        : "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                    }`}
                  >
                    {room.isPrivate ? (
                      <Lock className="h-3 w-3" />
                    ) : (
                      <Globe className="h-3 w-3" />
                    )}

                    {room.isPrivate ? "PRIVATE" : "PUBLIC"}
                  </span>
                </div>

                {/* Difficulty + questions */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-md border px-2 py-0.5 text-xs font-semibold ${difficulty}`}
                  >
                    {room.difficulty}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-0.5 text-xs text-slate-400">
                    <FileQuestion className="h-3.5 w-3.5" />
                    {room.questionCount} questions
                  </span>
                </div>

                {/* Players */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5 text-slate-400">
                      <Users className="h-3.5 w-3.5" />

                      {playerCount} / {room.maxPlayers} players
                    </span>

                    {isFull && (
                      <span className="font-semibold text-rose-400">
                        Full
                      </span>
                    )}
                  </div>

                  {/* Player progress */}
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/6">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isFull
                          ? "bg-rose-500/70"
                          : "bg-linear-to-r from-violet-600 to-fuchsia-500"
                      }`}
                      style={{
                        width: `${fillPct}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Join */}
                <button
                  disabled={isFull}
                  onClick={() =>
                    handleJoinRoom(room.roomCode)
                  }
                  className={`mt-5 inline-flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all duration-200 ${
                    isFull
                      ? "cursor-not-allowed bg-white/5 text-slate-500"
                      : "bg-violet-500/10 text-violet-400 hover:bg-violet-600 hover:text-white"
                  }`}
                >
                  {isFull ? "Room Full" : "Join Room"}

                  {!isFull && (
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default ActiveRoom;