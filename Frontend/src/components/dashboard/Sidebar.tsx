import {
  LayoutDashboard,
  User,
  Trophy,
  LogOut,
  Swords,
  Menu,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  open?: boolean;
  onToggle?: () => void;
}

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: User,
  },
  {
    label: "Leaderboard",
    path: "/leaderboard",
    icon: Trophy,
  },
];

function Sidebar({ open = true, onToggle = () => {} }: SidebarProps) {
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex flex-col
          border-r border-white/[0.07]
          bg-[#0d1224]
          transition-all duration-300 ease-in-out

          w-64
          ${open ? "translate-x-0" : "-translate-x-full"}

          lg:static
          lg:translate-x-0
          ${open ? "lg:w-64" : "lg:w-20"}
        `}
      >
        {/* Logo / Toggle */}
        <div
          className={`
            flex h-16 items-center border-b border-white/[0.07]
            ${open ? "justify-between px-5" : "justify-center px-3"}
          `}
        >
          <div
            className={`
              flex items-center gap-2.5
              ${open ? "" : "hidden lg:flex"}
            `}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-600 shadow-[0_0_20px_-4px] shadow-violet-500/60">
              <Swords className="h-5 w-5 text-white" />
            </div>

            {open && (
              <span className="text-lg font-bold tracking-tight text-white">
                Quiz<span className="text-violet-400">Arena</span>
              </span>
            )}
          </div>

          <button
            onClick={onToggle}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
            aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5">
          {open && (
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Menu
            </p>
          )}

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    // Close mobile sidebar after navigation
                    if (window.innerWidth < 1024) {
                      onToggle();
                    }
                  }}
                  title={!open ? item.label : undefined}
                  className={({ isActive }) =>
                    `
                    group flex items-center rounded-lg
                    py-2.5 text-sm font-medium
                    transition-all duration-200

                    ${open ? "gap-3 px-3" : "justify-center px-2"}

                    ${
                      isActive
                        ? "bg-violet-600 text-white shadow-[0_0_24px_-6px] shadow-violet-500/70"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }
                    `
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`
                          h-5 w-5 shrink-0
                          transition-transform duration-200
                          group-hover:scale-110
                          ${isActive ? "text-white" : ""}
                        `}
                      />

                      {open && <span>{item.label}</span>}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="border-t border-white/[0.07] p-3">
          <button
            onClick={handleLogout}
            title={!open ? "Logout" : undefined}
            className={`
              group flex w-full items-center rounded-lg
              py-2.5 text-sm font-medium
              text-slate-400
              transition-colors duration-200
              hover:bg-red-500/10 hover:text-red-400

              ${open ? "gap-3 px-3" : "justify-center px-2"}
            `}
          >
            <LogOut className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" />

            {open && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;