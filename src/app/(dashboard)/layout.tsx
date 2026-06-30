import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { ErrorBoundary } from "@/components/feedback/ErrorBoundary";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-industrial-bg-dark font-sans selection:bg-industrial-status-warning selection:text-industrial-bg-highContrast flex-grow">
      <Navbar />
      <div className="flex-grow flex flex-row overflow-hidden relative">
        <Sidebar />
        <main className="flex-grow flex flex-col overflow-y-auto min-w-0 relative">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
      </div>
      <Footer />
    </div>
  );
}
