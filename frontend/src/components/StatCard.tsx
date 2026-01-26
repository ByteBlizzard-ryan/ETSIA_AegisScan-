import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  iconColor?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "#4a8a9a",
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 px-6 shadow-sm border border-[#e8ecef]">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-[13px] font-medium text-[#6a7a8a] mb-2">
            {title}
          </h3>
          <div className="text-[32px] font-bold text-[#1a3a4a] mb-1">
            {value}
          </div>
          <div className="text-xs text-[#8a9aaa]">
            {subtitle}
          </div>
        </div>
        <div className="w-11 h-11 flex items-center justify-center" style={{ color: iconColor }}>
          <Icon size={28} />
        </div>
      </div>
    </div>
  );
}
