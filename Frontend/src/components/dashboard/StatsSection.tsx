import { Brain, DoorOpen, Trophy, Users, TrendingUp } from "lucide-react";

type Accent = "violet" | "green" | "cyan" | "gold";

interface StatsSectionProps {
  activeRooms?: number;
}

function StatsSection({ activeRooms = 0 }: StatsSectionProps) {
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  const stats: {
    label: string;
    value: number | string;
    icon: typeof DoorOpen;
    accent: Accent;
  }[] = [
    {
      label: "Active Rooms",
      value: activeRooms,
      icon: DoorOpen,
      accent: "violet",
    },
    {
      label: "Games Played",
      value: user.gamesPlayed || 0,
      icon: Users,
      accent: "green",
    },
    {
      label: "Total Score",
      value: user.totalScore || 0,
      icon: Brain,
      accent: "cyan",
    },
    {
      label: "Current Rank",
      value: "—",
      icon: Trophy,
      accent: "gold",
    },
  ];

  const accentStyles = {
    violet: {
      icon: "text-violet-400",
      iconBg: "bg-violet-500/10",
      glow: "hover:border-violet-500/40 hover:shadow-violet-500/20",
    },
    green: {
      icon: "text-green-400",
      iconBg: "bg-green-500/10",
      glow: "hover:border-green-500/40 hover:shadow-green-500/20",
    },
    cyan: {
      icon: "text-cyan-400",
      iconBg: "bg-cyan-400/10",
      glow: "hover:border-cyan-400/40 hover:shadow-cyan-400/20",
    },
    gold: {
      icon: "text-amber-400",
      iconBg: "bg-amber-400/10",
      glow: "hover:border-amber-400/40 hover:shadow-amber-400/20",
    },
  } as const;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const accent = accentStyles[stat.accent];

        return (
          <div
            key={stat.label}
            className={`group rounded-xl border border-white/[0.07] bg-[#0d1224] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${accent.glow}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-400">
                {stat.label}
              </span>

              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${accent.iconBg}`}
              >
                <Icon className={`h-4.5 w-4.5 ${accent.icon}`} />
              </div>
            </div>

            <p className="mt-4 text-3xl font-bold tracking-tight text-white">
              {stat.value}
            </p>

            <div className="mt-2 flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-green-400" />
              <span className="text-xs font-medium text-green-400">
                Your stats
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatsSection;
