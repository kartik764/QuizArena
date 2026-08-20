import { useRoomSocket } from "../hooks/useRoomSocket";

import RoomHeader from "../components/room/RoomHeader";
import QuestionPanel from "../components/room/QuestionPanel";
import WaitingPanel from "../components/room/WaitingPanel";
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

  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  const {
    roomUsers,
    hostInfo,
    gameStarted,
    currentQuestion,
    startGame,
    submitAnswer,
    scores,
    answerSubmitted,
    timeLeft,
    questionResult,
    gameOver,
    currentQuestionNumber,
    totalQuestions,
    messages,
    sendMessage,
  } = useRoomSocket({
    roomCode: roomCode!,
    userId: user.id,
    username: user.username,
  });

  const isHost = hostInfo?.userId === user.id;

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/rooms/${roomCode}`, {
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

  const players = roomUsers === null ? room.players : roomUsers;

  const handleLeaveRoom = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/rooms/${roomCode}/leave`,
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
      <RoomHeader
        room={room}
        handleLeaveRoom={handleLeaveRoom}
        timeLeft={timeLeft}
        playerCount={players.length}
      />

      <div className="grid grid-cols-3 gap-6 mt-6">
        {/* LEFT */}
        <div className="col-span-2 flex">
          {gameOver ? (
            <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-8 flex flex-col items-center justify-center">
              <h1 className="text-5xl font-bold mb-4">Game Over 🏆</h1>

              <p className="text-gray-400 text-lg">
                Final scores are shown on the right.
              </p>
            </div>
          ) : gameStarted ? (
            <QuestionPanel
              question={currentQuestion}
              onSubmit={submitAnswer}
              answerSubmitted={answerSubmitted}
              questionResult={questionResult}
              category={room.category}
              currentQuestionNumber={currentQuestionNumber}
              totalQuestions={totalQuestions}
            />
          ) : (
            <WaitingPanel
              isHost={isHost}
              playerCount={players.length}
              maxPlayers={room?.maxPlayers || 0}
              onStartGame={startGame}
            />
          )}
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-6">
          <PlayersPanel players={players} />
          <ChatPanel messages={messages} onSendMessage={sendMessage} />
          <ScorePanel players={players} scores={scores} />
        </div>
      </div>
    </div>
  );
}

export default Room;
