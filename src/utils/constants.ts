import { NavItem } from "@/types";

export const APP_NAME = "Industrial Operations Board";
export const APP_VERSION = "2.4.0-ENTERPRISE";

export const DEFAULT_WS_URL = process.env.NEXT_PUBLIC_WS_URL || "wss://stream.iob.enterprise.internal/v1";

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", iconName: "LayoutDashboard" },
  { label: "Assets", href: "/assets", iconName: "Cpu", badge: "Live" },
  { label: "Alerts & Hazards", href: "/alerts", iconName: "ShieldAlert" },
  { label: "ML Predictions", href: "/predictions", iconName: "Activity" },
  { label: "Knowledge RAG", href: "/knowledge", iconName: "Database" },
  { label: "AI Copilot Chat", href: "/chat", iconName: "MessageSquareCode" },
  { label: "System Settings", href: "/settings", iconName: "Settings" },
  { label: "Operator Profile", href: "/profile", iconName: "UserCheck" },
];

export const ANOMALY_TYPES = [
  {
    id: "bearing-wear",
    name: "Bearing Degradation",
    severity: "warning",
    description: "Spikes Turbine casing vibration & thermal readings."
  },
  {
    id: "compressor-surge",
    name: "Compressor Aerodynamic Surge",
    severity: "critical",
    description: "Spikes Compressor vibration, drops dynamic pressure."
  },
  {
    id: "leakage",
    name: "Suction Seal Leakage",
    severity: "warning",
    description: "Drops Pump discharge flow capacity and pressure lines."
  },
  {
    id: "electrical-trip",
    name: "Global Emergency Trip",
    severity: "critical",
    description: "Triggers motor braking, halts load grid outputs."
  }
];
