import type { ReactNode } from "react";
import Logo from "./Logo";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div
        className="w-full max-w-[600px] min-h-[550px] p-8"
        style={{ 
          backgroundColor: "#ECF7FF",
          borderRadius: "12px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
        }}
      >
        <div className="flex justify-center mb-10">
          <Logo size="lg" />
        </div>
        {children}
      </div>
    </div>
  );
}
