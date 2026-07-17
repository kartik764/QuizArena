function StatsSection() {
  const stats = [
    {
      title: "Active Rooms",
      value: "24",
      icon: "👥",
      growth: "+12% from yesterday",
    },
    {
      title: "Players Online",
      value: "156",
      icon: "🟢",
      growth: "+8% from yesterday",
    },
    {
      title: "Quizzes Played",
      value: "12.5K",
      icon: "🎮",
      growth: "+15% from yesterday",
    },
    {
      title: "Your Rank",
      value: "#42",
      icon: "🏆",
      growth: "+5 spots up",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-[#0f172a] border border-gray-800 rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">{stat.icon}</div>

            <div className="text-right">
              <p className="text-gray-400 text-sm">{stat.title}</p>

              <h2 className="text-4xl font-bold">{stat.value}</h2>
            </div>
          </div>

          <p className="text-green-400 text-sm">{stat.growth}</p>
        </div>
      ))}
    </div>
  );
}

export default StatsSection;
