export const formatNumber = (val: number, decimals: number = 1): string => {
  return Number(val).toFixed(decimals);
};

export const formatCurrency = (val: number): string => {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);
};

export const formatPercent = (val: number): string => {
  return `${Number(val).toFixed(1)}%`;
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "ok":
      return "text-industrial-status-ok bg-industrial-status-ok/10 border-industrial-status-ok/30";
    case "warning":
      return "text-industrial-status-warning bg-industrial-status-warning/10 border-industrial-status-warning/30";
    case "critical":
      return "text-industrial-status-critical bg-industrial-status-critical/15 border-industrial-status-critical/40 animate-pulse";
    default:
      return "text-industrial-status-offline bg-industrial-status-offline/10 border-industrial-status-offline/30";
  }
};
