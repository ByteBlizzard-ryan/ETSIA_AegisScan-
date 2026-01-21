import logoImg from "../assets/logo.png";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function Logo({ size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: "text-xl" },
    md: { icon: 48, text: "text-2xl" },
    lg: { icon: 62, text: "text-4xl" },
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
