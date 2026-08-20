import { Gamepad2, Users, Trophy } from "lucide-react";

function Stats() {
  const stats = [
    {
      value: "10K+",
      label: "Players",
      description: "Competing in the arena",
      icon: Users,
    },
    {
      value: "2K+",
      label: "Rooms Created",
      description: "Live quiz battles",
      icon: Gamepad2,
    },
    {
      value: "50K+",
      label: "Quizzes Played",
      description: "Questions answered",
      icon: Trophy,
    },
  ];

  return (
    <section id="stats" className="px-6 py-10 sm:px-10 lg:px-16 lg:py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/2 md:grid-cols-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className={`group relative p-7 transition-colors duration-300 hover:bg-white/2.5 sm:p-8 ${
                index !== stats.length - 1
                  ? "border-b border-white/[0.07] md:border-b-0 md:border-r"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/15 bg-violet-500/10">
                  <Icon className="h-5 w-5 text-violet-400" />
                </div>

                <span className="text-xs font-medium uppercase tracking-widest text-slate-600">
                  0{index + 1}
                </span>
              </div>

              <div className="mt-6">
                <h2 className="text-4xl font-black tracking-tight text-white">
                  {stat.value}
                </h2>

                <p className="mt-1 text-sm font-semibold text-slate-300">
                  {stat.label}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {stat.description}
                </p>
              </div>

              <div className="absolute bottom-0 left-7 right-7 h-px bg-linear-to-r from-transparent via-violet-500/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Stats;