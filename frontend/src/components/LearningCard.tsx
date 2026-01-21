'use client';

import { useNavigate } from "react-router-dom";


interface LearningCardProps {
  id: string;
  title: string;
  description: string;
  level: "Débutant" | "Intermédiaire" | "Avancé";
  imageUrl: string;
}

export default function LearningCard({
  id,
  title,
  description,
  level,
  imageUrl,
}: LearningCardProps) {
  const navigate = useNavigate();

  const levelColors = {
    Débutant: { bg: "#dcfce7", text: "#166534" },
    Intermédiaire: { bg: "#e0f2fe", text: "#075985" },
    Avancé: { bg: "#fef3c7", text: "#92400e" },
  };

  const colors = levelColors[level];

  return (
    <div className="card p-0 overflow-hidden flex flex-col">
      <div className="h-32 overflow-hidden">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3
          className="font-semibold text-sm mb-2 line-clamp-2"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </h3>
        <p
          className="text-xs mb-3 line-clamp-3 flex-1"
          style={{ color: "var(--muted-foreground)" }}
        >
          {description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span
            className="text-xs px-2 py-1 rounded-full"
            style={{ backgroundColor: colors.bg, color: colors.text }}
          >
            Niveau: {level}
          </span>
        </div>
        <button
          onClick={() => navigate(`/conseils/article/${id}`)}
          className="btn btn-primary mt-3 w-full text-sm"
        >
          Lire
        </button>
      </div>
    </div>
  );
}
