'use client';

import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  History,
  ShieldOff,
  BarChart3,
  HelpCircle,
  User,
  LogOut,
} from "lucide-react";
import Logo from "./Logo";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/historique", icon: History, label: "Historique" },
  { to: "/liens-bloques", icon: ShieldOff, label: "Liens bloqués" },
  { to: "/statistiques", icon: BarChart3, label: "Statistiques" },
  { to: "/conseils", icon: HelpCircle, label: "Conseils" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    // TODO: Implement logout logic with backend
    navigate("/login");
  };

  // Custom function to check if a nav item should be active
  const isNavItemActive = (itemPath: string) => {
    // Special case: Historique should be active for both /historique and /signaler-un-faux
    if (itemPath === "/historique") {
      return location.pathname === "/historique" || location.pathname === "/signaler-un-faux";
    }
    // 2. Cas spécial : Conseils et les pages de Quiz
    if (itemPath === "/conseils") {
      // Si l'URL commence par /conseils ou contient /quiz/
      return currentPath.startsWith("/conseils") || currentPath.includes("/quiz/");
    }
    return location.pathname === itemPath;
  };

  return (
    <aside className="w-[220px] bg-white border-r border-[#e8ecef] flex flex-col py-6 px-4">
      {/* Logo */}
      <div className="mb-10 px-2">
        <Logo size="md" showText={true} />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={
              `flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-all ${isNavItemActive(item.to)
                ? "bg-[#e6f5f1] text-[#1a9a7a]"
                : "text-[#5a6a7a] hover:bg-[#f0f7f5] hover:text-[#1a9a7a]"
              }`
            }
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="flex flex-col gap-1 mt-auto">
        <NavLink
          to="/profil"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-all ${isActive
              ? "bg-[#e6f5f1] text-[#1a9a7a]"
              : "text-[#5a6a7a] hover:bg-[#f0f7f5] hover:text-[#1a9a7a]"
            }`
          }
        >
          <User size={20} />
          Profil
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium text-[#5a6a7a] hover:bg-[#f0f7f5] hover:text-[#1a9a7a] transition-all"
        >
          <LogOut size={20} />
          Quitter
        </button>
      </div>
    </aside>
  );
}
