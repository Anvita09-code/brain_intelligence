import React from 'react';
import { Typography } from '@/components/ui/Typography';
import { SystemHealthPanel } from '@/components/status';

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <Typography variant="h4">System Telemetry Dashboard</Typography>
      <Typography variant="body1" className="text-industrial-slate">
        Live UI-health and subsystem status tracking for the Industrial
        Operating Brain.
      </Typography>

      {/* Section: Status & Health Tracking Architecture */}
      <SystemHealthPanel />
    </div>
  );
}
