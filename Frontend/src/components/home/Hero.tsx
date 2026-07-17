import { Link } from "react-router-dom";
import trophy from "../../assets/trophy.png";

function Hero() {
  return (
    <section className="flex items-center justify-between px-16 py-20">

      <div className="max-w-lg">

        <p className="text-white border px-4 py-3 border-purple-500 rounded-lg">
          REALTIME • MULTIPLAYER • COMPETE
        </p>

        <h1 className="text-7xl font-bold">
          Compete in
          <br />
          Realtime Quiz
          <br />
          <span className="text-purple-500">
            Battles
          </span>
        </h1>

        <p className="text-gray-400 mt-6 text-lg">
          Challenge players from around the world in exciting real-time quiz games.
        </p>

        <div className="flex gap-5 mt-10">

          <Link
            to="/register"
            className="px-8 py-4 bg-purple-600 rounded-xl font-semibold"
          >
            Get Started
          </Link>

          <a
            href="#features"
            className="px-8 py-4 border border-gray-700 rounded-xl"
          >
            Watch Demo
          </a>

        </div>

      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full"></div>

        <img
          src={trophy}
          alt="Trophy"
          className="relative z-10 w-125"
        />
      </div>

    </section>
  );
}

export default Hero;