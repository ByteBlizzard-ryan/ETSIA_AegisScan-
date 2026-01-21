'use client';

import { useState } from "react";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import MainLayout from "../components/MainLayout";

const mockHistory = [
  {
    id: "1",
    url: "https://actualite-info.biz/urgence-secu",
    date: "2023-10-26 14:30",
    riskLevel: "Élevé",
    status: "Bloqué",
    source: "Email",
  },
  {
    id: "2",
    url: "https://ma-banque-en-ligne.fr/login",
    date: "2023-10-26 10:15",
    riskLevel: "Moyen",
    status: "Bloqué",
    source: "Navigation",
  },
  {
    id: "3",
    url: "https://rapport-finance.com/Q3-2023",
    date: "2023-10-25 18:45",
    riskLevel: "Faible",
    status: "Sûr",
    source: "Email",
  },
  {
    id: "4",
    url: "https://e-commerce-promo.store/offres",
    date: "2023-10-25 11:00",
    riskLevel: "Moyen",
    status: "Suspect",
    source: "Navigation",
  },
  {
    id: "5",
    url: "https://support-technique-microsoft.com/aide",
    date: "2023-10-24 09:20",
    riskLevel: "Élevé",
    status: "Bloqué",
    source: "SMS",
  },
];

const riskColors: Record<string, { bg: string; text: string }> = {
  Élevé: { bg: "#fee2e2", text: "#991b1b" },
  Moyen: { bg: "#fef3c7", text: "#92400e" },
  Faible: { bg: "#dcfce7", text: "#166534" },
};

const statusColors: Record<string, { bg: string; text: string }> = {
  Bloqué: { bg: "#fee2e2", text: "#991b1b" },
  Sûr: { bg: "#dcfce7", text: "#166534" },
  Suspect: { bg: "#fef3c7", text: "#92400e" },
};

export default function Historique() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredHistory = mockHistory.filter((item) => {
    const matchesSearch = item.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || item.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <MainLayout title="Historique des analyses">
      {/* Search and Filter */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            className="input pl-10"
            placeholder="Rechercher une URL..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--muted-foreground)" }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} style={{ color: "var(--muted-foreground)" }} />
          <select
            className="input w-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="Bloqué">Bloqué</option>
            <option value="Sûr">Sûr</option>
            <option value="Suspect">Suspect</option>
          </select>
        </div>
      </div>

      {/* History Table */}
      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr
              style={{
                backgroundColor: "#f8fafc",
                color: "var(--muted-foreground)",
              }}
            >
              <th className="text-left p-4 font-medium">URL</th>
              <th className="text-left p-4 font-medium">Date</th>
              <th className="text-left p-4 font-medium">Source</th>
              <th className="text-left p-4 font-medium">Niveau de risque</th>
              <th className="text-left p-4 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50 transition-colors"
                style={{ borderColor: "var(--border)" }}
              >
                <td className="p-4 max-w-[300px] truncate" title={item.url}>
                  {item.url}
                </td>
                <td className="p-4">{item.date}</td>
                <td className="p-4">{item.source}</td>
                <td className="p-4">
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: riskColors[item.riskLevel].bg,
                      color: riskColors[item.riskLevel].text,
                    }}
                  >
                    {item.riskLevel}
                  </span>
                </td>
                <td className="p-4">
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: statusColors[item.status].bg,
                      color: statusColors[item.status].text,
                    }}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          Affichage de 1-5 sur 125 résultats
        </p>
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded border hover:bg-gray-50"
            style={{ borderColor: "var(--border)" }}
          >
            <ChevronLeft size={18} style={{ color: "var(--muted-foreground)" }} />
          </button>
          <button
            className="w-8 h-8 rounded text-sm font-medium"
            style={{ backgroundColor: "var(--primary)", color: "white" }}
          >
            1
          </button>
          <button
            className="w-8 h-8 rounded text-sm hover:bg-gray-100"
            style={{ color: "var(--muted-foreground)" }}
          >
            2
          </button>
          <button
            className="w-8 h-8 rounded text-sm hover:bg-gray-100"
            style={{ color: "var(--muted-foreground)" }}
          >
            3
          </button>
          <button
            className="p-2 rounded border hover:bg-gray-50"
            style={{ borderColor: "var(--border)" }}
          >
            <ChevronRight size={18} style={{ color: "var(--muted-foreground)" }} />
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
