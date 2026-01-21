import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "#1e3a5f",
  iconBgColor = "#f1f5f9",
}: StatCardProps) {
  return (
    <div className="card flex items-center gap-4">
      <div className="flex-1">
        <p
          className="text-sm font-medium mb-1"
          style={{ color: "var(--muted-foreground)" }}
        >
          {title}
        </p>
        <p
          className="text-3xl font-bold mb-1"
          style={{ color: "var(--foreground)" }}
        >
          {value}
        </p>
        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          {subtitle}
        </p>
      </div>
      <div
        className="p-3 rounded-lg"
        style={{ backgroundColor: iconBgColor }}
      >
        <Icon size={28} style={{ color: iconColor }} />
      </div>
    </div>
  );
}
