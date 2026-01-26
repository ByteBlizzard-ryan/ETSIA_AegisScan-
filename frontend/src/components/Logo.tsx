import logoImg from "../assets/logo.png";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function Logo({ size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: "w-6 h-6", text: "text-sm" },
    md: { icon: "w-12 h-16", text: "text-xl" },
    lg: { icon: "w-12 h-12", text: "text-2xl" },
  };

  const { icon, text } = sizes[size];

  return (
    <div className="flex items-center gap-2.5">
      <div className={`${icon} text-[#1a9a7a]`}>
        <img src={logoImg} alt="Logo" className="w-full h-full" />
      </div>

      {showText && (
        <span className={`${text} font-semibold text-[#1a3a4a]`}>
          Aegis<span className="text-[#1a9a7a]">Scan</span>
        </span>
      )}
    </div>
  );
}
