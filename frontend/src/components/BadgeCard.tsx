import type { LucideIcon } from "lucide-react";

interface BadgeCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  isEarned?: boolean;
}

export default function BadgeCard({
  title,
  description,
  icon: Icon,
  isEarned = false,
}: BadgeCardProps) {
  return (
    <div
      className="p-4 rounded-lg border transition-all"
      style={{
        backgroundColor: isEarned ? "#e8f5e9" : "#f8fafc",
        borderColor: isEarned ? "#22c55e" : "var(--border)",
        opacity: isEarned ? 1 : 0.6,
      }}
    >
      <div className="flex flex-col items-center text-center">
        <div
          className="p-3 rounded-full mb-3"
          style={{
            backgroundColor: isEarned ? "#dcfce7" : "#e2e8f0",
          }}
        >
          <Icon
            size={24}
            style={{ color: isEarned ? "#22c55e" : "#94a3b8" }}
          />
        </div>
        <h4
          className="font-semibold text-sm mb-1"
          style={{ color: isEarned ? "#1e3a5f" : "#64748b" }}
        >
          {title}
        </h4>
        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          {description}
        </p>
      </div>
    </div>
  );
}
