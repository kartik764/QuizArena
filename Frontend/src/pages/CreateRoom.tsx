import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Gamepad2,
  Globe,
  Lock,
  Sparkles,
  Tag,
  Users,
  ListChecks,
} from "lucide-react";

function CreateRoom() {
  const [roomName, setRoomName] = useState("");
  const [category, setCategory] = useState("Science");
  const [difficulty, setDifficulty] = useState("Easy");
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [questionCount, setQuestionCount] = useState(2);
  const [isPrivate, setIsPrivate] = useState(false);
  const [creating, setCreating] = useState(false);

  const navigate = useNavigate();

  const categories = [
    "Science",
    "History",
    "Sports",
    "Technology",
    "Geography",
    "Movies & TV",
    "Music",
    "General Knowledge",
    "Programming",
    "Literature",
  ];

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        alert("Please Login First");
        return;
      }

      setCreating(true);

      const response = await fetch(
        "http://localhost:5000/api/rooms/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            roomName,
            category,
            difficulty,
            isPrivate,
            maxPlayers,
            questionCount,
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
      console.error("Create Room Error:", error);
      alert("Failed to create room");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] px-4 py-8 text-white md:px-8">
      <div className="mx-auto w-full max-w-3xl">

        {/* Page Header */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to lobby
          </button>

          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Create a Room
          </h1>

          <p className="mt-2 text-sm text-slate-400 md:text-base">
            Set up a live multiplayer quiz and invite players to compete in real time.
          </p>
        </div>

        <form onSubmit={handleCreateRoom} className="space-y-6">

          {/* Room Information */}
          <section className="rounded-2xl border border-white/[0.07] bg-[#0d1224] p-6 md:p-7">

            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10">
                <Gamepad2 className="size-5 text-violet-400" />
              </div>

              <div>
                <h2 className="text-base font-bold text-white">
                  Room Information
                </h2>

                <p className="text-sm text-slate-400">
                  Name your room and choose what it covers.
                </p>
              </div>
            </div>

            {/* Room Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Room Name
              </label>

              <div className="relative">
                <Gamepad2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />

                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="e.g. Java Masters"
                  required
                  className="h-11 w-full rounded-xl border border-white/8 bg-[#111827] pl-10 pr-4 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10"
                />
              </div>
            </div>

            {/* Category */}
            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-white">
                Category
              </label>

              <div className="relative">
                <Tag className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-slate-500" />

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-11 w-full appearance-none rounded-xl border border-white/8 bg-[#111827] pl-10 pr-4 text-sm text-white outline-none transition-colors focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Visibility */}
            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-white">
                Room Visibility
              </label>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                {/* Public */}
                <button
                  type="button"
                  onClick={() => setIsPrivate(false)}
                  className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                    !isPrivate
                      ? "border-violet-500 bg-violet-500/10"
                      : "border-white/[0.07] bg-[#111827] hover:border-white/15"
                  }`}
                >
                  <div
                    className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                      !isPrivate
                        ? "bg-violet-500/15"
                        : "bg-slate-700/40"
                    }`}
                  >
                    <Globe
                      className={`size-4 ${
                        !isPrivate
                          ? "text-violet-400"
                          : "text-slate-400"
                      }`}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white">
                      Public
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Anyone can find and join from the lobby.
                    </p>
                  </div>

                  {!isPrivate && (
                    <Check className="size-4 shrink-0 text-violet-400" />
                  )}
                </button>

                {/* Private */}
                <button
                  type="button"
                  onClick={() => setIsPrivate(true)}
                  className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                    isPrivate
                      ? "border-violet-500 bg-violet-500/10"
                      : "border-white/[0.07] bg-[#111827] hover:border-white/15"
                  }`}
                >
                  <div
                    className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                      isPrivate
                        ? "bg-violet-500/15"
                        : "bg-slate-700/40"
                    }`}
                  >
                    <Lock
                      className={`size-4 ${
                        isPrivate
                          ? "text-violet-400"
                          : "text-slate-400"
                      }`}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white">
                      Private
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Only players with the room code can join.
                    </p>
                  </div>

                  {isPrivate && (
                    <Check className="size-4 shrink-0 text-violet-400" />
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* Quiz Settings */}
          <section className="rounded-2xl border border-white/[0.07] bg-[#0d1224] p-6 md:p-7">

            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10">
                <Sparkles className="size-5 text-violet-400" />
              </div>

              <div>
                <h2 className="text-base font-bold text-white">
                  Quiz Settings
                </h2>

                <p className="text-sm text-slate-400">
                  Tune the difficulty and match size.
                </p>
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-white">
                Difficulty
              </label>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  {
                    value: "Easy",
                    description: "Relaxed pace, beginner friendly",
                  },
                  {
                    value: "Medium",
                    description: "Balanced challenge for most players",
                  },
                  {
                    value: "Hard",
                    description: "Fast timers, expert-level questions",
                  },
                ].map((item) => {
                  const selected = difficulty === item.value;

                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setDifficulty(item.value)}
                      className={`rounded-xl border p-3 text-left transition-all ${
                        selected
                          ? "border-violet-500 bg-violet-500/10"
                          : "border-white/[0.07] bg-[#111827] hover:border-white/15"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">
                          {item.value}
                        </span>

                        {selected && (
                          <Check className="size-4 text-violet-400" />
                        )}
                      </div>

                      <p className="mt-1 text-xs leading-relaxed text-slate-400">
                        {item.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Max Players */}
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                  <Users className="size-4 text-slate-400" />
                  Maximum Players
                </label>

                <span className="text-sm font-semibold text-white">
                  {maxPlayers}{" "}
                  <span className="font-normal text-slate-500">
                    players
                  </span>
                </span>
              </div>

              <input
                type="range"
                min={1}
                max={8}
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(Number(e.target.value))}
                className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-violet-500"
              />

              <p className="mt-2 text-xs text-slate-500">
                Up to {maxPlayers} players can compete in this room.
              </p>
            </div>

            {/* Question Count */}
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                  <ListChecks className="size-4 text-slate-400" />
                  Number of Questions
                </label>

                <span className="text-sm font-semibold text-white">
                  {questionCount}{" "}
                  <span className="font-normal text-slate-500">
                    questions
                  </span>
                </span>
              </div>

              <input
                type="range"
                min={2}
                max={20}
                value={questionCount}
                onChange={(e) =>
                  setQuestionCount(Number(e.target.value))
                }
                className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-violet-500"
              />

              <p className="mt-2 text-xs text-slate-500">
                The match ends after {questionCount} questions.
              </p>
            </div>
          </section>

          {/* Bottom Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/8 bg-[#0d1224] px-5 py-3 text-sm font-semibold text-slate-300 transition-colors hover:bg-[#111827] hover:text-white"
            >
              <ArrowLeft className="size-4" />
              Back to lobby
            </button>

            <button
              type="submit"
              disabled={creating}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-7 py-3 text-sm font-bold text-white shadow-[0_0_30px_-8px] shadow-violet-500/70 transition-all hover:bg-violet-500 hover:shadow-[0_0_35px_-6px] hover:shadow-violet-500/80 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {creating ? (
                "Creating..."
              ) : (
                <>
                  <Sparkles className="size-4" />
                  Create Room
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateRoom;