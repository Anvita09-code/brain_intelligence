/**
 * IOB Icons – Re-exported Lucide React icons + custom industrial icons (Phase 2)
 *
 * Centralized icon exports for the IOB design system.
 * Uses lucide-react (already in package.json).
 *
 * Usage:
 *   import { Activity, Gauge, PumpIcon } from '@/components/icons';
 */

import React from 'react';

/* ------------------------------------------------------------------ */
/*  Re-export commonly used Lucide icons                               */
/* ------------------------------------------------------------------ */

export {
  // Requested Centralized Icon Engine exports
  Settings,
  Bell,
  Search,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Menu,
  X,
  User,
  LogOut,
  Sliders,
  Database,
  Activity,
  AlertTriangle,
  Cpu,
  TrendingUp,
  Share2,
  Clock,
  ShieldAlert,
  Loader2,
  FileText,
  Check,
  AlertCircle,
  HelpCircle,
  Info,
  Layers,
  Filter,
  RefreshCw,
  Eye,
  EyeOff,
  Calendar,
  Lock,
  UploadCloud,
  ChevronUp,
  Grid as GridIcon,
  MoreVertical,
  Trash2,

  // Additional Navigation
  Home,
  LayoutDashboard,
  MoreHorizontal,
  ArrowRight,
  ChevronsUpDown,

  // Additional Status & Indicators
  CheckCircle,
  XCircle,
  BellRing,
  Bug,

  // Additional Actions
  Plus,
  Minus,
  Edit,
  Copy,
  Download,
  Upload,
  SearchX,

  // Additional Industrial / Operational
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
  Server,
  HardDrive,
  Network,
  WifiOff,

  // Additional Charts
  TrendingDown,
  BarChart3,
  LineChart,
  PieChart,
  AreaChart,

  // Additional Data
  Table,
  FileSpreadsheet,
  ClipboardList,
  Archive,
  FileX,
  Inbox,

  // Additional Auth / Users / Communication
  Unlock,
  Users,
  LogIn,
  Shield,
  ShieldCheck,
  MessageSquare,

  // Misc
  ExternalLink,
  Timer,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Custom SVG Icons – Industrial                                      */
/* ------------------------------------------------------------------ */

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}

/** Pump / motor icon (custom) */
export function PumpIcon({ className, style, size = 24 }: IconProps) {
  return React.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      className,
      style,
      'aria-hidden': 'true',
    },
    React.createElement('circle', { cx: 12, cy: 12, r: 6 }),
    React.createElement('path', { d: 'M12 6V2' }),
    React.createElement('path', { d: 'M12 22v-4' }),
    React.createElement('path', { d: 'M6 12H2' }),
    React.createElement('path', { d: 'M22 12h-4' }),
    React.createElement('circle', { cx: 12, cy: 12, r: 2 })
  );
}

/** Valve icon (custom) */
export function ValveIcon({ className, style, size = 24 }: IconProps) {
  return React.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      className,
      style,
      'aria-hidden': 'true',
    },
    React.createElement('path', { d: 'M2 12h6' }),
    React.createElement('path', { d: 'M16 12h6' }),
    React.createElement('polygon', { points: '8,6 16,6 16,18 8,18' }),
    React.createElement('line', { x1: 12, y1: 2, x2: 12, y2: 6 }),
    React.createElement('line', { x1: 9, y1: 2, x2: 15, y2: 2 })
  );
}

/** PLC / Controller icon (custom) */
export function PLCIcon({ className, style, size = 24 }: IconProps) {
  return React.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      className,
      style,
      'aria-hidden': 'true',
    },
    React.createElement('rect', { x: 4, y: 2, width: 16, height: 20, rx: 2 }),
    React.createElement('line', { x1: 8, y1: 6, x2: 8, y2: 6.01 }),
    React.createElement('line', { x1: 12, y1: 6, x2: 12, y2: 6.01 }),
    React.createElement('line', { x1: 16, y1: 6, x2: 16, y2: 6.01 }),
    React.createElement('line', { x1: 8, y1: 10, x2: 8, y2: 10.01 }),
    React.createElement('line', { x1: 12, y1: 10, x2: 12, y2: 10.01 }),
    React.createElement('line', { x1: 16, y1: 10, x2: 16, y2: 10.01 }),
    React.createElement('rect', { x: 7, y: 14, width: 10, height: 4, rx: 1 })
  );
}
