import { useEffect, useState } from "react";

interface ProfileData {
  username: string;
  email: string;
  avatar: string;
  totalScore: number;
  gamesPlayed: number;
}

function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/profile",
          {
            cache: "no-store",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data: ProfileData = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center">
        <p className="text-gray-400">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center">
        <p className="text-gray-400">Unable to load profile.</p>
      </div>
    );
  }

  const initial = profile.username.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[#050816] text-white p-8">
      <div className="max-w-5xl mx-auto">

        {/* Profile Header */}
        <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-8">

          <div className="flex items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-4xl font-bold">
              {profile.avatar || initial}
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                {profile.username}
              </h1>

              <p className="text-gray-400 mt-1">
                {profile.email}
              </p>
            </div>

          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

          <div className="bg-[#0f172a] rounded-2xl p-6">
            <h3 className="text-gray-400">Games</h3>
            <p className="text-3xl font-bold mt-2">
              {profile.gamesPlayed}
            </p>
          </div>

          <div className="bg-[#0f172a] rounded-2xl p-6">
            <h3 className="text-gray-400">Wins</h3>
            <p className="text-3xl font-bold mt-2">
              —
            </p>
          </div>

          <div className="bg-[#0f172a] rounded-2xl p-6">
            <h3 className="text-gray-400">Accuracy</h3>
            <p className="text-3xl font-bold mt-2">
              —
            </p>
          </div>

          <div className="bg-[#0f172a] rounded-2xl p-6">
            <h3 className="text-gray-400">Points</h3>
            <p className="text-3xl font-bold mt-2">
              {profile.totalScore.toLocaleString()}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;