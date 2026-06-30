"use client";

import React from "react";
import { TelemetryProvider } from "@/contexts/TelemetryContext";
import { SidebarProvider } from "@/contexts/SidebarContext";

export const GlobalProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <TelemetryProvider>
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </TelemetryProvider>
  );
};
