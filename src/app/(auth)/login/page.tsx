"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { storage } from "@/utils/storage";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Lock, User, KeyRound, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("a.mercer@iob.enterprise.internal");
  const [password, setPassword] = useState("••••••••••••");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      if (email && password) {
        storage.set("auth_token", `tok_${Date.now()}_enterprise`);
        storage.set("usr_role", "Lead Diagnostic Engineer");
        router.push("/dashboard");
      } else {
        setError("Invalid Operator Credentials. Verification rejected.");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <Card className="w-full max-w-md shadow-2xl border-industrial-border-dark/80" title="OPERATOR AUTHENTICATION GATEWAY">
      <form onSubmit={handleLogin} className="flex flex-col gap-md">
        <div className="text-center pb-sm border-b border-industrial-border-dark">
          <div className="w-12 h-12 bg-industrial-status-warning/10 border border-industrial-status-warning/30 rounded-full flex items-center justify-center mx-auto mb-2 text-industrial-status-warning animate-pulse">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="font-mono text-sm font-bold uppercase text-industrial-bg-light">Restricted Access // Level 4</h2>
          <p className="font-mono text-[10px] text-industrial-status-offline mt-1">Authorized Control Room Personnel Only</p>
        </div>

        {error && (
          <div className="bg-industrial-status-critical/15 border border-industrial-status-critical p-sm rounded font-mono text-xs text-industrial-status-critical text-center">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-xs">
          <label className="font-mono text-[10px] uppercase font-bold text-industrial-status-offline flex items-center gap-1.5">
            <User className="w-3 h-3 text-industrial-status-warning" />
            <span>Operator Identity (Email)</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-industrial-bg-dark border border-industrial-border-dark rounded px-3 py-2 font-mono text-xs text-industrial-bg-light focus:border-industrial-status-warning focus:outline-none transition"
            placeholder="operator@iob.enterprise.internal"
          />
        </div>

        <div className="flex flex-col gap-xs">
          <label className="font-mono text-[10px] uppercase font-bold text-industrial-status-offline flex items-center gap-1.5">
            <KeyRound className="w-3 h-3 text-industrial-status-warning" />
            <span>Security Passcode</span>
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-industrial-bg-dark border border-industrial-border-dark rounded px-3 py-2 font-mono text-xs text-industrial-bg-light focus:border-industrial-status-warning focus:outline-none transition"
            placeholder="••••••••••••"
          />
        </div>

        <div className="flex items-center justify-between font-mono text-[10px] text-industrial-status-offline pt-1">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded bg-industrial-bg-dark border-industrial-border-dark text-industrial-status-warning focus:ring-0" />
            <span>Maintain Session</span>
          </label>
          <span className="text-industrial-status-warning opacity-80">CSP Node Verified</span>
        </div>

        <Button
          type="submit"
          variant="warning"
          size="lg"
          isLoading={isLoading}
          className="w-full mt-2"
          leftIcon={<ShieldCheck className="w-4 h-4" />}
        >
          AUTHENTICATE & ENTER
        </Button>
      </form>
    </Card>
  );
}
