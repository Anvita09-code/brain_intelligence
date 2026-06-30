"use client";

import { useEffect, useState } from "react";
import { userService } from "@/services/user.service";
import { UserProfile } from "@/types";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { UserCheck, Shield, Clock, Key, LogOut } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    userService.getCurrentUser().then(setUser).catch(console.error);
  }, []);

  if (!user) return null;

  return (
    <div className="flex flex-col flex-grow py-md pb-xl">
      <Container fluid className="flex flex-col gap-md max-w-4xl">
        <div className="border-b border-industrial-border-dark pb-sm">
          <h1 className="font-mono text-lg font-bold uppercase tracking-wider text-industrial-bg-light flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-industrial-status-ok" />
            <span>Operator Identity & Access Board</span>
          </h1>
          <p className="font-mono text-xs text-industrial-status-offline mt-1">
            Control Room Personnel Dossier // Authentication Clearance Level 4
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Identity Card */}
          <Card className="md:col-span-1 text-center flex flex-col items-center justify-center p-6 bg-industrial-bg-dark/40">
            <div className="w-20 h-20 rounded-full bg-industrial-panel-dark border-2 border-industrial-status-warning flex items-center justify-center text-2xl font-mono font-bold text-industrial-status-warning mb-4 shadow-lg glow-warning">
              {user.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <h2 className="font-mono text-base font-bold uppercase text-industrial-bg-light">{user.name}</h2>
            <span className="font-mono text-xs text-industrial-status-warning font-bold mt-1">{user.role}</span>
            <p className="font-mono text-[10px] text-industrial-status-offline mt-2">{user.email}</p>

            <Button variant="danger" size="sm" className="mt-6 w-full" leftIcon={<LogOut className="w-3.5 h-3.5" />}>
              TERMINATE SESSION
            </Button>
          </Card>

          {/* Schedule & Permissions */}
          <Card className="md:col-span-2" title="OPERATIONAL SHIFT & CLEARANCE">
            <div className="flex flex-col gap-6 font-mono text-xs">
              <div className="bg-industrial-bg-dark p-4 rounded border border-industrial-border-dark flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-industrial-status-ok" />
                  <div>
                    <span className="text-[10px] uppercase text-industrial-status-offline block font-bold">Assigned Watch Schedule</span>
                    <span className="text-sm font-bold text-industrial-bg-light mt-0.5 block">{user.shift}</span>
                  </div>
                </div>
                <span className="bg-industrial-status-ok/20 text-industrial-status-ok text-[10px] px-2 py-1 rounded font-bold uppercase">
                  Active Shift
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-industrial-status-offline flex items-center gap-1.5 mb-3">
                  <Key className="w-3.5 h-3.5 text-industrial-status-warning" />
                  <span>Authorized Subsystem Clearance Flags</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {user.permissions.map((perm) => (
                    <div
                      key={perm}
                      className="bg-industrial-panel-dark px-3 py-2 rounded border border-industrial-border-dark flex items-center gap-2 text-industrial-bg-light font-bold text-[11px]"
                    >
                      <Shield className="w-3.5 h-3.5 text-industrial-status-warning shrink-0" />
                      <span>{perm}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
