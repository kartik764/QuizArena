import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const token = sessionStorage.getItem("token");

    if(token){
      navigate("/dashboard");
    }
  },[navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    //prevent page refresh
    e.preventDefault();

    //send response  
    try{
      //browser send req to backend
      const response = await fetch("http://localhost:5000/login",{

        method: "POST",   //browser is sending data
        headers : {       //browser is sending json data
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({    //converting to string or text to send over http
          email,
          password,
        }),

      });

      //response = entire http response

      //read response (convert text recieve from be to object)
      const data = await response.json();

      if(!response.ok){   //check status 200
        alert(data.message);
        return;
      }

      //store token
      sessionStorage.setItem("token", data.token);

      //store user details
      sessionStorage.setItem("user", JSON.stringify(data.user));

      //navigate
      navigate("/dashboard");

    } catch(error){
      console.error(error);
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-20 right-20 w-72 h-72 bg-orange-500/20 blur-3xl rounded-full"></div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md bg-[#0d1117] border border-gray-800 rounded-2xl p-8">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-blue-400 mb-2">QuizArena</h1>

        <p className="text-gray-400 mb-8">Enter the multiplayer quiz arena</p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold bg-linear-to-r from-blue-500 to-orange-500 hover:opacity-90 transition"
          >
            Enter Arena
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don't have an account?{" "}
          <Link
           to="/register"
           className="text-white font-semibold cursor-pointer">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
