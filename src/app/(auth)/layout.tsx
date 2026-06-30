import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-grow flex flex-col min-h-screen bg-industrial-bg-dark grid-mesh selection:bg-industrial-status-warning selection:text-industrial-bg-highContrast">
      <header className="p-md md:p-lg flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-xs text-industrial-status-offline hover:text-industrial-bg-light inline-flex items-center gap-2 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing</span>
        </Link>
        <Logo size="sm" />
      </header>
      <main className="flex-grow flex items-center justify-center p-md my-auto">
        {children}
      </main>
    </div>
  );
}
