function RoomHeader({room, handleLeaveRoom}:any) {
   
  return (
    <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-6">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div>
          <h1 className="text-4xl font-bold">{room.roomName}</h1>

          <div className="flex items-center gap-6 mt-3 text-gray-400">
            <p>Room ID: {room.roomCode}</p>

            <p className="text-green-400">● {room.players.length} / {room.maxPlayers} Players</p>
          </div>
        </div>

        {/* Middle Section */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">Time Left</p>

          <h2 className="text-4xl font-bold text-orange-400">00:18</h2>
        </div>

        {/* Right Section */}
        <button
          onClick={handleLeaveRoom}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl transition"
        >
          Leave Room
        </button>
      </div>
    </div>
  );
}

export default RoomHeader;
