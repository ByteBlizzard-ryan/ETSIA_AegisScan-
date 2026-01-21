'use client';

import { useNavigate } from "react-router-dom";
import { Clock, ListChecks } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface QuizCardProps {
  id: string;
  title: string;
  questionCount: number;
  duration: string;
  icon: LucideIcon;
}

export default function QuizCard({
  id,
  title,
  questionCount,
  duration,
  icon: Icon,
}: QuizCardProps) {
  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="flex items-start gap-3 mb-4">
        <div
          className="p-2 rounded-lg"
          style={{ backgroundColor: "#e0f2fe" }}
        >
          <Icon size={20} style={{ color: "#075985" }} />
        </div>
        <h3
          className="font-semibold text-sm flex-1"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </h3>
      </div>
      <div
        className="flex items-center gap-4 text-xs mb-4"
        style={{ color: "var(--muted-foreground)" }}
      >
        <span className="flex items-center gap-1">
          <ListChecks size={14} />
          {questionCount} questions
        </span>
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {duration}
        </span>
      </div>
      <button
        onClick={() => navigate(`/conseils/quiz/${id}`)}
        className="btn btn-accent w-full text-sm"
      >
        Démarrer le quiz
      </button>
    </div>
  );
}
