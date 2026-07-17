function Stats() {
  const stats = [
    { value: "10K+", label: "Players" },
    { value: "2K+", label: "Rooms Created" },
    { value: "50K+", label: "Quizzes Played" },
  ];

  return (
    <section className="px-16 py-16">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#0f172a] border border-gray-800 rounded-2xl p-8 text-center"
          >
            <h2 className="text-4xl font-bold text-purple-400">
              {stat.value}
            </h2>

            <p className="text-gray-400 mt-2">
              {stat.label}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}

export default Stats;