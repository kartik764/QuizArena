function Features() {
  const features = [
    {
      title: "Realtime Multiplayer",
      description: "Compete with players around the world in live quiz battles",
    },
    {
      title: "Live Leaderboards",
      description: "Track rankings instantly as players answer questions.",
    },
    {
      title: "Multiple Categories",
      description: "Science, History, Sports, Technology and more.",
    },
    {
      title: "Interactive Rooms",
      description: "Create rooms and challenge your friends.",
    },
  ];

  return (
    <section
      id="features"
      className="px-16 py-20"
    >

      <div className="text-center mb-12">

        <h2 className="text-5xl font-bold">
          Features
        </h2>

        <p className="text-gray-400 mt-4">
          Everything you need for an exciting quiz experience.
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-[#0f172a] border border-gray-800 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-semibold text-purple-400">
              {feature.title}
            </h3>

            <p className="text-gray-400 mt-3">
              {feature.description}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}

export default Features;