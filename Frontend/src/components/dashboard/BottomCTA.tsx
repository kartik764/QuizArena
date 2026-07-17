import { Link } from "react-router-dom";

function BottomCTA() {
  return (
    <div className="mt-8 bg-linear-to-r from-purple-700 via-purple-800 to-purple-950 rounded-3xl p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold mb-3">
            Ready to dominate the leaderboard?
          </h2>

          <p className="text-purple-100 text-lg">
            Create your own room and challenge players worldwide.
          </p>
        </div>

        <Link
          to="/create-room"
          className="bg-purple-600 text-black px-8 py-4 rounded-2xl font-semibold hover:bg-gray-200 transition"
        >
          + Create Room
        </Link>
      </div>
    </div>
  );
}

export default BottomCTA;
