import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function MainLayout({
  children,
  title,
  subtitle,
}: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-[#f8fafb] overflow-hidden">
      {/* Sidebar - Fixed */}
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Main content area - Scrollable */}
        <main className="flex-1 py-8 px-10 overflow-y-auto">
          {title && (
            <div className="mb-8">
              <h1 className="text-[28px] font-bold text-[#1a3a4a] mb-2">
                {title}
              </h1>
              {subtitle && (
                <p className="text-[15px] text-[#6a7a8a]">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {children}
        </main>

        {/* Footer - Fixed at the bottom */}
        <footer className="bg-white border-t border-[#e8ecef] py-4 px-10 flex justify-between items-center flex-shrink-0">
          <p className="text-[13px] text-[#6a7a8a]">
            © 2026 AegisScan. Tous droits réservés
          </p>
          <Link to="/privacy" className="text-[13px] text-[#1a5a6a] underline hover:text-[#1a9a7a]">
            Politique de confidentialité
          </Link>
        </footer>
      </div>
    </div>
  );
}
