/**
 * IOB Icons – Re-exported Lucide React icons + custom industrial icons (Phase 2)
 *
 * Centralized icon exports for the IOB design system.
 * Uses lucide-react (already in package.json).
 *
 * Usage:
 *   import { ActivityIcon, GaugeIcon, PumpIcon } from '@/components/icons';
 */

/* ------------------------------------------------------------------ */
/*  Re-export commonly used Lucide icons                               */
/* ------------------------------------------------------------------ */

export {
  // Navigation
  Home,
  LayoutDashboard,
  Settings,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  Menu,
  MoreVertical,
  MoreHorizontal,

  // Status & Indicators
  Activity,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  Bell,
  BellRing,

  // Actions
  Plus,
  Minus,
  Edit,
  Trash2,
  Copy,
  Download,
  Upload,
  RefreshCw,
  Search,
  Filter,
  X,

  // Industrial / Operational
  Gauge,
  Thermometer,
  Zap,
  Droplets,
  Wind,
  Flame,
  Cog,
  Factory,
  Warehouse,
  CircuitBoard,
  Cpu,
  Server,
  HardDrive,
  Database,
  Network,

  // Charts
  TrendingUp,
  TrendingDown,
  BarChart3,
  LineChart,
  PieChart,
  AreaChart,

  // Data
  Table,
  FileText,
  FileSpreadsheet,
  ClipboardList,
  Archive,

  // Auth
  Lock,
  Unlock,
  User,
  Users,
  LogIn,
  LogOut,
  Shield,
  ShieldCheck,

  // Misc
  ExternalLink,
  Eye,
  EyeOff,
  Loader2,
  Calendar,
  Clock,
  Timer,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Custom SVG Icons – Industrial                                      */
/* ------------------------------------------------------------------ */

import React from 'react';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}

/** Pump / motor icon (custom) */
export function PumpIcon({ className, style, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="6" />
      <path d="M12 6V2" />
      <path d="M12 22v-4" />
      <path d="M6 12H2" />
      <path d="M22 12h-4" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

/** Valve icon (custom) */
export function ValveIcon({ className, style, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M2 12h6" />
      <path d="M16 12h6" />
      <polygon points="8,6 16,6 16,18 8,18" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="9" y1="2" x2="15" y2="2" />
    </svg>
  );
}

/** PLC / Controller icon (custom) */
export function PLCIcon({ className, style, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="8" y2="6.01" />
      <line x1="12" y1="6" x2="12" y2="6.01" />
      <line x1="16" y1="6" x2="16" y2="6.01" />
      <line x1="8" y1="10" x2="8" y2="10.01" />
      <line x1="12" y1="10" x2="12" y2="10.01" />
      <line x1="16" y1="10" x2="16" y2="10.01" />
      <rect x="7" y="14" width="10" height="4" rx="1" />
    </svg>
  );
}
