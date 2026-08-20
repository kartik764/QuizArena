import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  Sparkles,
  Trophy,
} from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#030609] text-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-500/15 blur-[120px] rounded-full" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-500/15 blur-[120px] rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Multiplayer badge */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase">
            <div className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-800 bg-[#080d12]">
              <Trophy size={14} className="text-sky-400" />
            </div>
            Live Multiplayer
          </div>
        </div>

        {/* Card */}
        <div className="bg-[#05080c]/95 border border-gray-800/80 rounded-3xl p-8 shadow-2xl">
          {/* Small heading */}
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={15} className="text-sky-400" />

            <span className="text-xs font-semibold tracking-[0.18em] text-sky-400 uppercase">
              The fastest mind wins
            </span>
          </div>

          {/* Logo */}
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Quiz
            <span className="bg-linear-to-r from-sky-400 via-blue-500 to-orange-400 bg-clip-text text-transparent">
              Arena
            </span>
          </h1>

          <p className="text-gray-400 text-sm leading-6 mb-8">
            Challenge your friends, climb the leaderboard, and prove you know
            your stuff.
          </p>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs text-gray-400 mb-2">
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-12 bg-black/60 border border-gray-800 rounded-xl pl-11 pr-4 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs text-gray-400">Password</label>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-12 bg-black/60 border border-gray-800 rounded-xl pl-11 pr-12 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="group w-full h-12 rounded-xl font-semibold text-sm bg-linear-to-r from-sky-500 via-blue-500 to-orange-500 hover:opacity-90 transition-all duration-200 shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2"
            >
              Enter the Arena
              <ArrowRight
                size={17}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </form>

          {/* Register */}
          <div className="mt-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-gray-800" />

              <span className="text-xs text-gray-500 whitespace-nowrap">
                New to the arena?
              </span>

              <div className="h-px flex-1 bg-gray-800" />
            </div>

            <Link
              to="/register"
              className="w-full h-12 rounded-full border border-gray-800 bg-[#080c10] hover:bg-[#0d1218] hover:border-gray-700 transition-all duration-200 flex items-center justify-center text-sm font-semibold text-gray-200"
            >
              Create your account
            </Link>
          </div>
        </div>

        {/* Bottom text */}
        <p className="text-center text-[11px] text-gray-700 mt-5">
          By entering, you agree to play fair and have fun.
        </p>
      </div>
    </div>
  );
}

export default Login;
