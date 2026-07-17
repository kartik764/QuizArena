import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const [roomCode, setRoomCode] = useState("");

  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  const initial = user.username?.charAt(0).toUpperCase() || "?";

  const handleJoinRoom = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        alert("Please Login First");
        return;
      }

      const response = await fetch("http://localhost:5000/room/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          roomCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      //success
      navigate(`/room/${data.roomCode}`);
    } catch (error) {
      console.error("Join Room Error:", error);
      alert("Failed to join room");
    }
  };

  return (
    <div className="flex items-center justify-between mb-8">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search rooms, players..."
          className="w-96 bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-3 outline-none"
        />

        {/* Room Code */}
        <input
          type="text"
          placeholder="Room Code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          className="w-40 bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-3 outline-none"
        />

        {/* Join Room */}
        <button
          onClick={handleJoinRoom}
          className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-xl font-semibold"
        >
          Join Room
        </button>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <button className="w-12 h-12 rounded-full bg-[#0f172a] border border-gray-800">
          🔔
        </button>

        <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center font-bold">
          {initial}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
