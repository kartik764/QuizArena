import RoomHeader from "../components/room/RoomHeader";
import QuestionPanel from "../components/room/QuestionPanel";
import PlayersPanel from "../components/room/PlayersPanel";
import ChatPanel from "../components/room/ChatPanel";
import ScorePanel from "../components/room/ScorePanel";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Room() {
  const [room, setRoom] = useState<any>(null);

  const { roomCode } = useParams();

  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await fetch(`http://localhost:5000/room/${roomCode}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setRoom(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoom();
  }, [roomCode, token]);

  if (!room) {
    return (
      <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center">
        Loading Room...
      </div>
    );
  }

  const handleLeaveRoom = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/room/${roomCode}/leave`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Leave Room Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white p-6">
      <RoomHeader room={room} handleLeaveRoom={handleLeaveRoom} />

      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="col-span-2">
          <QuestionPanel />
        </div>

        <div className="space-y-6">
          <PlayersPanel players={room.players} />
          <ChatPanel />
          <ScorePanel />
        </div>
      </div>
    </div>
  );
}

export default Room;
