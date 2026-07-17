import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-6 border-b border-gray-800">
      <h1 className="text-3xl font-bold text-purple-400">
        QuizArena
      </h1>

      <div className="flex gap-8">
        <a href="#">Home</a>
        <a href="#features">Features</a>
        <a href="#about">About</a>
      </div>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-5 py-2 border border-gray-700 rounded-lg"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-5 py-2 bg-purple-600 rounded-lg"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;