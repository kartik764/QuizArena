import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ActiveRoom() {
  const [rooms, setRooms] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) return;

        const response = await fetch(`http://localhost:5000/rooms`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

  const handleJoinRoom = async (roomCode: string) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`http://localhost:5000/room/join`, {
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

      if(!response.ok){
        alert(data.message);
        return;
      }

      navigate(`/room/${data.roomCode}`);
      
    } catch (error) {
      console.error("Join Room Error:", error);
    }
  };

  return (
    <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Active Rooms</h2>

        <button className="text-purple-400">View All</button>
      </div>

      <div className="space-y-4">
        {rooms.map((room) => (
          <div
            key={room.roomCode}
            className="flex items-center justify-between bg-[#111827] border border-gray-700 rounded-2xl p-5"
          >
            <div>
              <h3 className="text-xl font-semibold">{room.roomName}</h3>

              <p className="text-gray-400">
                {room.category} • {room.questionCount} Questions
              </p>
            </div>

            <div className="text-center">
              <p className="font-semibold">
                {room.players.length} / {room.maxPlayers}
              </p>

              <p className="text-gray-400 text-sm">Players</p>
            </div>

            <button
              onClick={() => handleJoinRoom(room.roomCode)}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl"
            >
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActiveRoom;
