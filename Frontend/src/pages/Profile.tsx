function Profile() {
  return (
    <div className="min-h-screen bg-[#050816] text-white p-8">

      <div className="max-w-5xl mx-auto">

        <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-8">

          <div className="flex items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-4xl font-bold">
              K
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                Kartik Jain
              </h1>

              <p className="text-gray-400">
                Rank #42
              </p>
            </div>

          </div>

        </div>

        <div className="grid grid-cols-4 gap-6 mt-8">

          <div className="bg-[#0f172a] rounded-2xl p-6">
            <h3>Games</h3>
            <p className="text-3xl font-bold">120</p>
          </div>

          <div className="bg-[#0f172a] rounded-2xl p-6">
            <h3>Wins</h3>
            <p className="text-3xl font-bold">75</p>
          </div>

          <div className="bg-[#0f172a] rounded-2xl p-6">
            <h3>Accuracy</h3>
            <p className="text-3xl font-bold">82%</p>
          </div>

          <div className="bg-[#0f172a] rounded-2xl p-6">
            <h3>Points</h3>
            <p className="text-3xl font-bold">12.5K</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;