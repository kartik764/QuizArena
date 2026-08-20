import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatsSection from "../components/dashboard/StatsSection";
import ActiveRoom from "../components/dashboard/ActiveRooms";
import TopScore from "../components/dashboard/TopScore";
import BottomCTA from "../components/dashboard/BottomCTA";

function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeRooms, setActiveRooms] = useState(0);

  useEffect(() => {
    const existingToken = sessionStorage.getItem("token");

    if (!existingToken) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchActiveRooms = async () => {
      try {
        const token = sessionStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/rooms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }

        const rooms = await response.json();

        setActiveRooms(rooms.length);
      } catch (error) {
        console.error("Active rooms fetch error:", error);
      }
    };

    fetchActiveRooms();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#070812] text-[#F8FAFC]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar open={sidebarOpen} onToggle={toggleSidebar} />

        {/* Main content */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top navigation */}
          <Topbar onMenuClick={toggleSidebar} />

          {/* Dashboard content */}
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-400 space-y-6">
              {/* Welcome / Hero */}
              <WelcomeBanner />

              {/* Stats */}
              <StatsSection activeRooms={activeRooms} />

              {/* Rooms + Leaderboard */}
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                <section className="min-w-0">
                  <ActiveRoom />
                </section>

                <aside className="min-w-0">
                  <TopScore />
                </aside>
              </div>

              {/* Bottom CTA */}
              <BottomCTA />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
