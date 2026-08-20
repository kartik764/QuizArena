import {
  Gamepad2,
  Globe2,
  MessageCircle,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

function Features() {
  const features = [
    {
      title: "Realtime Multiplayer",
      description:
        "Compete with other players in live quiz battles with instant updates.",
      icon: Zap,
    },
    {
      title: "Interactive Rooms",
      description:
        "Create or join quiz rooms and challenge your friends in real time.",
      icon: Gamepad2,
    },
    {
      title: "Live Leaderboards",
      description:
        "See scores update during the game and track your position instantly.",
      icon: Trophy,
    },
    {
      title: "Multiple Categories",
      description:
        "Choose from Science, History, Sports, Technology, Music and more.",
      icon: Globe2,
    },
    {
      title: "Live Player Updates",
      description:
        "See players join, leave and compete inside the room without refreshing.",
      icon: Users,
    },
    {
      title: "Realtime Chat",
      description:
        "Talk with other players while competing inside the quiz room.",
      icon: MessageCircle,
    },
  ];

  return (
    <section id="features" className="px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            Built for competition
          </span>

          <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Everything you need to
            <span className="text-violet-400"> compete.</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
            From realtime multiplayer battles to live rankings, QuizArena
            brings the complete competitive quiz experience together.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/2 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/20 hover:bg-white/[0.035]"
              >
                {/* Glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-violet-500/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon */}
                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/15 bg-violet-500/10">
                  <Icon className="h-5 w-5 text-violet-400" />
                </div>

                {/* Content */}
                <div className="relative mt-6">
                  <h3 className="text-lg font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-7 right-7 h-px bg-linear-to-r from-transparent via-violet-500/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;