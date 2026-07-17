import { Link } from "react-router-dom";

function WelcomeBanner() {
  return (
    <div className="bg-linear-to-r from-purple-900 via-purple-950 to-[#14082d] rounded-3xl p-8 mb-8">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div>
          <h1 className="text-5xl font-bold mb-6">Welcome back, Kartik! 👋</h1>

          <p className="text-2xl text-gray-300 mb-10">
            Ready for your next quiz battle?
          </p>

          <div className="flex items-center gap-12 text-lg">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span>156 Players Online</span>
            </div>

            <div className="w-px h-8 bg-gray-700"></div>

            <div className="flex items-center gap-3">
              <span>🏆</span>
              <span>24 Active Rooms</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-10">
          {/* Trophy */}
          <div className="text-[150px]">🏆</div>

          {/* Button */}
          <Link
            to="/create-room"
            className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-2xl text-lg font-semibold transition"
          >
            + Create Room
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomeBanner;
