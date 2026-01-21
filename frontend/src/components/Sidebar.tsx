'use client';

import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  History,
  ShieldOff,
  BarChart3,
  MessageCircle,
  User,
  LogOut,
} from "lucide-react";
import Logo from "./Logo";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/historique", icon: History, label: "Historique" },
  { to: "/liens-bloques", icon: ShieldOff, label: "Liens bloqués" },
  { to: "/statistiques", icon: BarChart3, label: "Statistiques" },
  { to: "/conseils", icon: MessageCircle, label: "Conseils" },
  { to: "/profil", icon: User, label: "Profil" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Implement logout logic with backend
    navigate("/login");
  };

  return (
    <aside
      className="flex flex-col h-screen w-64 border-r"
      style={{ backgroundColor: "#ffffff", borderColor: "var(--border)" }}
    >
      <div className="p-6">
        <Logo size="md" />
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#e8f5e9] text-[#1e3a5f]"
                      : "text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#1e3a5f]"
                  }`
                }
              >
                <item.icon size={20} />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t" style={{ borderColor: "var(--border)" }}>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium w-full text-[#64748b] hover:bg-[#fee2e2] hover:text-[#991b1b] transition-colors"
        >
          <LogOut size={20} />
          Quitter
        </button>
      </div>
    </aside>
  );
}
