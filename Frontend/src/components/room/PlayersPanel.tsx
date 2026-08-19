function PlayersPanel({ players }: any) {
  return (
    <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-6">
      <h2 className="text-2xl font-bold mb-6">Players ({players.length})</h2>

      <div className="max-h-40 overflow-y-auto space-y-4 pr-2">
        {players.map((player: any, index: number) => (
          <div
            key={player.userId}
            className="flex justify-between items-center"
          >
            <span>
              {index + 1} {player.username}
            </span>

            <span className="text-green-400">●</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayersPanel;
