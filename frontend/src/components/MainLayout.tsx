import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  headerActions?: ReactNode;
}

export default function MainLayout({
  children,
  title,
  headerActions,
}: MainLayoutProps) {
  return (
    <div className="flex h-screen" style={{ backgroundColor: "var(--background)" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header
          className="flex items-center justify-between px-8 py-6 border-b"
          style={{ backgroundColor: "#ffffff", borderColor: "var(--border)" }}
        >
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
            {title}
          </h1>
          {headerActions && <div className="flex items-center gap-4">{headerActions}</div>}
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
