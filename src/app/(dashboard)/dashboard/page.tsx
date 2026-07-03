import React from 'react';
import { Typography } from '@/components/ui/Typography';
import { SystemHealthPanel } from '@/components/status';
import { Grid, Section, Spacer } from '@/components/layout/Structural';
import { LineChartContainer, GaugeContainer, NetworkGraphContainer } from '@/components/charts';

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

      <Section>
        <Typography variant="h6" style={{ marginBottom: '16px' }}>
          Abstract Data Visualization Overlays
        </Typography>
        <Grid columns={3} gap="lg">
          <LineChartContainer title="Network Throughput (Real-time)" />
          <GaugeContainer title="CPU Load" value="42%" />
          <GaugeContainer title="Memory Usage" value="68%" />
        </Grid>
        <Spacer size="lg" />
        <NetworkGraphContainer title="Digital Twin Topology Mesh" height="400px" />
      </Section>
    </div>
  );
}
