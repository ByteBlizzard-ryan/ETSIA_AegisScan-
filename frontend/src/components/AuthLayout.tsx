import type { ReactNode } from "react";
import Logo from "./Logo";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="w-full max-w-[500px] bg-[#ECF7FF] rounded-xl shadow-lg transition-all"
        >
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
