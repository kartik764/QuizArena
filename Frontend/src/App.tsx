import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Room from "./pages/Room";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import CreateRoom from "./pages/CreateRoom";

function App() {
  return (
    <div>
      <BrowserRouter>

        <Routes>
          
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/room/:roomCode" element={<Room />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/leaderboard" element={<Leaderboard />}></Route>
          <Route path="/create-room" element={<CreateRoom />}></Route>

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
