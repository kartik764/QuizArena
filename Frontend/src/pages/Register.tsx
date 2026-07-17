import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{
    const token = sessionStorage.getItem("token");

    if(token){
      navigate("/dashboard");
    }
  },[navigate]);

  const handleRegister = async (e: React.FormEvent) => {
    //prevent page refresh
    e.preventDefault();

    try{
      //browser send req to backend
      const response = await fetch("http://localhost:5000/register",{ 

        method: "POST",   //browser is sending data
        headers : {       //browser is sending json data
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({    //converting to string or text to send over http
          username,
          email,
          password,
        }),

      });

      //read response (convert text recieve from be to object)
      const data = await response.json();

      if(!response.ok){   //check status 200
        alert(data.message);
        return;
      }

      navigate("/login");

    }catch(error){
      console.error(error);
      alert("Signup failed");
    } 
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-20 right-20 w-72 h-72 bg-orange-500/20 blur-3xl rounded-full"></div>
      </div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md bg-[#0d1117] border border-gray-800 rounded-2xl p-8">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-orange-400 mb-2">
          QuizArena
        </h1>

        <p className="text-gray-400 mb-8">
          Join the multiplayer quiz arena
        </p>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold bg-linear-to-r from-orange-500 to-blue-500 hover:opacity-90 transition"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link
           to="/login"
           className="text-white font-semibold cursor-pointer">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;