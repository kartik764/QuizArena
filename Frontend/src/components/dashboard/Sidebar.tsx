import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout= () => {
    sessionStorage.removeItem("token");
    navigate("/");
  }

  return (
    <aside className="w-64 border-r border-gray-800 bg-[#050816] p-6 flex flex-col">
      {/* Logo */}
      <h1 className="text-3xl font-bold text-purple-400 mb-12">QuizArena</h1>

      {/* Navigation */}
      <nav className="flex flex-col gap-4">
        <Link
          to="/dashboard"
          className="text-left px-4 py-3 rounded-xl bg-purple-600"
        >
          Dashboard
        </Link>

        <Link
          to="/"
          className="text-left px-4 py-3 rounded-xl hover:bg-gray-800"
        >
          Home(Browse Rooms)
        </Link>

        <Link
          to="/profile"
          className="text-left px-4 py-3 rounded-xl hover:bg-gray-800"
        >
          Profile
        </Link>

        <Link
          to="/leaderboard"
          className="text-left px-4 py-3 rounded-xl hover:bg-gray-800"
        >
          LeaderBoard
        </Link>
      </nav>

      {/* Push Logout To Bottom */}
      <div className="mt-auto">
        <button
         onClick={handleLogout}
         className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-900">
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
