import logoImg from "../assets/logo.png";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function Logo({ size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: "text-[32px]" },
    md: { icon: 48, text: "text-[48px]" },
    lg: { icon: 50, text: "text-[40px]" },
  };

  const { icon, text } = sizes[size];

  return (
    <div className="flex items-center gap-2">
      <img
        src={logoImg}
        alt="Logo AegisScan"
        width={icon}
        height={icon}
      />

      {showText && (
        <span className={`font-bold ${text} flex gap-1`}>
          <span className="font-bold" style={{ color: "#0E4D7A" }}>Aegis</span>
          <span className="font-bold" style={{ color: "#21825B" }}>Scan</span>
        </span>
      )}
    </div>
  );
}
