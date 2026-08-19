interface WaitingPanelProps {
  isHost: boolean;
  playerCount: number;
  maxPlayers: number;
  onStartGame: () => void;
}

function WaitingPanel({
  isHost,
  playerCount,
  maxPlayers,
  onStartGame,
}: WaitingPanelProps) {
  return (
    <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-8 flex flex-col justify-center items-center w-full h-full">
      <div className="text-center">
        <div className="text-6xl mb-6">🎮</div>

        <h1 className="text-4xl font-bold mb-4">
          QuizArena
        </h1>

        <p className="text-gray-400 text-lg mb-10">
          {isHost
            ? "Everyone is ready. Start the game whenever you want."
            : "Waiting for the host to start the game..."}
        </p>

        <div className="inline-block border border-gray-700 rounded-2xl px-8 py-5 mb-10">
          <p className="text-gray-400 text-sm uppercase tracking-wider">
            Players Joined
          </p>

          <p className="text-3xl font-bold mt-2">
            {playerCount} / {maxPlayers}
          </p>
        </div>

        {isHost ? (
          <button
            onClick={onStartGame}
            className="bg-purple-600 hover:bg-purple-700 transition px-10 py-4 rounded-2xl text-xl font-semibold"
          >
            Start Game
          </button>
        ) : (
          <div className="text-purple-400 font-medium">
            Waiting for host...
          </div>
        )}
      </div>
    </div>
  );
}

export default WaitingPanel;