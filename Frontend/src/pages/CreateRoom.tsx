import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateRoom() {
  const [roomName, setRoomName] = useState("");
  const [category, setCategory] = useState("Science");
  const [difficulty, setDifficulty] = useState("Easy");
  const [maxPlayers, setMaxPlayers] = useState(1);
  const [questionCount, setquestionCount] = useState(1);
  const [isPrivate, setIsPrivate] = useState(false);

  const navigate = useNavigate();

  const handleCreateRoom = async (e: React.FormEvent) => {
    //prevent refresh
    e.preventDefault();

    try {
      //get token
      const token = sessionStorage.getItem("token");

      if (!token) {
        alert("Please Login First");
        return;
      }

      //send request to backend
      const response = await fetch("http://localhost:5000/room/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          //converting to string or text to send over http
          roomName,
          category,
          difficulty,
          isPrivate,
          maxPlayers,
          questionCount,
        }),
      });

      //read response
      const data = await response.json();

      //check success
      if (!response.ok) {
        alert(data.message);
        return;
      }

      //success
      navigate(`/room/${data.roomCode}`);
    } catch (error) {
      console.error("Create Room Error:", error);
      alert("Failed to create room");
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center p-8">
      <div className="w-full max-w-2xl bg-[#0f172a] border border-gray-800 rounded-3xl p-8">
        <h1 className="text-4xl font-bold mb-2">Create Room</h1>

        <p className="text-gray-400 mb-8">
          Configure your quiz room and challenge players.
        </p>

        <form onSubmit={handleCreateRoom} className="space-y-6">
          
          {/* Room Name */}
          <div>
            <label className="block mb-2">Room Name</label>

            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Science Masters"
              className="w-full bg-[#111827] border border-gray-700 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2">Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#111827] border border-gray-700 rounded-xl px-4 py-3"
            >
              <option>Science</option>
              <option>History</option>
              <option>Sports</option>
              <option>Technology</option>
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block mb-2">Difficulty</label>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-[#111827] border border-gray-700 rounded-xl px-4 py-3"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          {/* Max Players */}
          <div>
            <label className="block mb-2">Max Players</label>

            <input
              type="number"
              min="1"
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(Number(e.target.value))}
              className="w-full bg-[#111827] border border-gray-700 rounded-xl px-4 py-3"
            />
          </div>

          {/* questions count */}
          <div>
            <label className="block mb-2">Questions Count</label>

            <input
              type="number"
              min={1}
              value={questionCount}
              onChange={(e) => setquestionCount(Number(e.target.value))}
              className="w-full bg-[#111827] border border-gray-700 rounded-xl px-4 py-3"
            />
          </div>

          {/* visibility */}
          <div>
            <label className="block mb-2">Visibility</label>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  checked={!isPrivate}
                  onChange={() => setIsPrivate(false)}
                />
                Public
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  checked={isPrivate}
                  onChange={() => setIsPrivate(true)}
                />
                Private
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 py-4 rounded-xl font-semibold"
          >
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateRoom;
