import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  Trophy,
  User,
} from "lucide-react";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [agreeToRules, setAgreeToRules] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const passwordValid = password.length >= 8;
  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const formValid =
    username.trim() !== "" &&
    email.trim() !== "" &&
    passwordValid &&
    passwordsMatch &&
    agreeToRules;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formValid) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030609] text-white flex items-center justify-center px-4 py-8 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-500/15 blur-[120px] rounded-full" />

        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-500/15 blur-[120px] rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">

        {/* Multiplayer badge */}
        <div className="flex justify-center mb-7">
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
              Your next win starts here
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Join{" "}
            <span className="bg-linear-to-r from-sky-400 via-blue-500 to-orange-400 bg-clip-text text-transparent">
              QuizArena
            </span>
          </h1>

          <p className="text-gray-400 text-sm leading-6 mb-7">
            Create your player profile and start challenging
            the sharpest minds in the arena.
          </p>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-5">

            {/* Display name */}
            <div>
              <label className="block text-xs text-gray-400 mb-2">
                Display name
              </label>

              <div className="relative">
                <User
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="text"
                  placeholder="Choose a player name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full h-12 bg-black/60 border border-gray-800 rounded-xl pl-11 pr-4 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/10"
                />
              </div>
            </div>

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

            {/* Passwords */}
            <div className="grid grid-cols-2 gap-4">

              {/* Password */}
              <div>
                <label className="block text-xs text-gray-400 mb-2">
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="8+ characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-12 bg-black/60 border border-gray-800 rounded-xl pl-10 pr-10 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-1.5 mt-2">
                  <div
                    className={`flex items-center justify-center w-4 h-4 rounded-full border ${
                      passwordValid
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-gray-700"
                    }`}
                  >
                    {passwordValid && (
                      <Check size={10} className="text-emerald-400" />
                    )}
                  </div>

                  <span
                    className={`text-[11px] ${
                      passwordValid
                        ? "text-emerald-400"
                        : "text-gray-500"
                    }`}
                  >
                    8+ characters
                  </span>
                </div>
              </div>

              {/* Confirm password */}
              <div>
                <label className="block text-xs text-gray-400 mb-2">
                  Confirm password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={`w-full h-12 bg-black/60 border rounded-xl pl-10 pr-10 text-sm text-white placeholder:text-gray-600 outline-none transition ${
                      confirmPassword.length > 0
                        ? passwordsMatch
                          ? "border-emerald-500/50 focus:border-emerald-500"
                          : "border-red-500/50 focus:border-red-500"
                        : "border-gray-800 focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/10"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>

                <div className="h-5 mt-2">
                  {confirmPassword.length > 0 && (
                    <span
                      className={`text-[11px] ${
                        passwordsMatch
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {passwordsMatch
                        ? "Passwords match"
                        : "Passwords don't match"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Rules */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={agreeToRules}
                onChange={(e) => setAgreeToRules(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-sky-500 cursor-pointer"
              />

              <span className="text-xs text-gray-500 leading-5">
                I agree to the{" "}
                <span className="text-sky-400 group-hover:text-sky-300 transition">
                  Arena rules
                </span>{" "}
                and fair-play policy.
              </span>
            </label>

            {/* Register button */}
            <button
              type="submit"
              disabled={!formValid || isLoading}
              className={`group w-full h-12 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                formValid && !isLoading
                  ? "bg-linear-to-r from-sky-500 via-blue-500 to-orange-500 hover:opacity-90 shadow-lg shadow-blue-500/10"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                "Creating account..."
              ) : (
                <>
                  Create my account

                  <ArrowRight
                    size={17}
                    className={
                      formValid
                        ? "group-hover:translate-x-1 transition-transform"
                        : ""
                    }
                  />
                </>
              )}
            </button>
          </form>

          {/* Login section */}
          <div className="mt-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-gray-800" />

              <span className="text-xs text-gray-500 whitespace-nowrap">
                Already have an account?
              </span>

              <div className="h-px flex-1 bg-gray-800" />
            </div>

            <Link
              to="/login"
              className="w-full h-12 rounded-full border border-gray-800 bg-[#080c10] hover:bg-[#0d1218] hover:border-gray-700 transition-all duration-200 flex items-center justify-center text-sm font-semibold text-gray-200"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Bottom text */}
        <p className="text-center text-[11px] text-gray-700 mt-5">
          Compete. Climb. Conquer.
        </p>
      </div>
    </div>
  );
}

export default Register;