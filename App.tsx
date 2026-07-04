/**
 * IOB Production Integration Matrix & Verification – Section 13
 *
 * Centralized blueprint rendering isolated component topologies.
 * Functions without backend business logic layers, state orchestrations,
 * or side effects.
 *
 * Integration Notes:
 * - This file is the Phase 2 Section 13 verification harness.
 * - All imports resolve through the existing barrel export chain:
 *     src/components/index.ts → re-exports from all subdirectories
 *     src/design-system/theme.ts → themeStyles CSS injector
 * - The DashboardWrapper, Sidebar, Navbar are from src/components/layout/
 * - All form, display, status, chart, table, feedback components from their
 *   respective subdirectories under src/components/
 *
 * @version 2.13.0
 */

'use client';

import React, { useState, useEffect } from 'react';
import { themeStyles } from './src/design-system/theme';
import { Activity, Cpu, Sliders, AlertTriangle } from './src/components/icons';
import {
  DashboardWrapper,
  Sidebar,
  Navbar,
  PageHeader,
  ContentWrapper,
  Grid,
  Card,
  Stack,
  Flex,
  Heading,
  Body,
  Button,
  TextInput,
  Select,
  Switch,
  Badge,
  HealthIndicator,
  ProgressIndicator,
  DataTable,
  LineChartContainer,
  GaugeContainer,
  NetworkGraphContainer,
  Modal,
  AlertBanner,
  ErrorBoundaryUI,
} from './src/components';

export default function App() {
  // Inject the centralized Design System theme engine variables into the DOM lifecycle
  useEffect(() => {
    themeStyles.injectCSS();
  }, []);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(true);

  // Reusable configuration schema for industrial navigation sidebar links
  const sidebarGroups = [
    {
      title: 'Operational Hub',
      items: [
        { id: 'dash', label: 'Telemetry Monitoring', icon: Activity },
        { id: 'assets', label: 'Digital Twins & Assets', icon: Cpu },
      ],
    },
    {
      title: 'Infrastructure Configuration',
      items: [
        { id: 'ctrl', label: 'System Setpoints', icon: Sliders },
      ],
    },
  ];

  // Reusable mock structural array matching DataTable type requirements
  const mockTableData = [
    { id: 'TX-101', designation: 'Cryogenic Tank Temp', reading: '-184.2 °C', status: 'success' },
    { id: 'PR-204', designation: 'Feedwater Flow Pressure', reading: '14.2 MPa', status: 'warning' },
    { id: 'VLV-09', designation: 'Main Isolation Breaker', reading: 'TRIPPED', status: 'danger' },
  ];

  const tableColumns = [
    { header: 'Tag ID', accessor: 'id' as const, width: '120px' },
    { header: 'Loop Designation', accessor: 'designation' as const },
    { header: 'Process Value', accessor: 'reading' as const },
    {
      header: 'Operational State',
      accessor: (row: typeof mockTableData[number]) => (
        <Badge variant={row.status as 'success' | 'warning' | 'danger'}>
          {row.status.toUpperCase()}
        </Badge>
      ),
    },
  ];

  return (
    <ErrorBoundaryUI>
      <DashboardWrapper
        sidebar={
          <Sidebar
            isCollapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            activeItem="dash"
            groups={sidebarGroups}
          />
        }
        navbar={
          <Navbar
            breadcrumbs={[{ label: 'Root Infrastructure' }, { label: 'Scada Monitoring Control' }]}
          />
        }
      >
        <PageHeader
          title="Industrial Operating Brain"
          subtitle="Enterprise Component Library Verification Matrix — Phase 2 Sandbox Deployment Mode"
          actions={
            <>
              <Button variant="outline" size="small" onClick={() => alert('Static Design System Event Injected')}>
                Export Manifest
              </Button>
              <Button variant="primary" size="small" onClick={() => setModalOpen(true)}>
                Initialize Override Sequence
              </Button>
            </>
          }
        />

        <ContentWrapper>
          <Stack gap="xl">
            {/* Context Feedback Layer */}
            <AlertBanner
              variant="warning"
              message="System Warning: Process loops on Isolation Subgrid VLV-09 are experiencing telemetry delay. Verification framework executing cleanly."
            />

            {/* Industrial Analytical Telemetry Widgets Block */}
            <Grid columns="repeat(auto-fit, minmax(280px, 1fr))" gap="lg">
              <Card title="HMI Processor Metrics" subtitle="Node Core Layer Hardware Load Overview" variant="default">
                <Stack gap="md">
                  <Flex justify="space-between" align="center">
                    <Body style={{ margin: 0 }}>Cluster Health Matrix</Body>
                    <HealthIndicator value={94} />
                  </Flex>
                  <ProgressIndicator value={74} />
                </Stack>
              </Card>

              <GaugeContainer title="Turbine Steam Outflow Volumetric Rate" value="1,424 m³/h" />
              <GaugeContainer title="Containment Vessel Pressure Limit" value="8.42 bar" />
            </Grid>

            {/* Core Workspace Grid Layout */}
            <Grid columns="2fr 1fr" gap="lg">
              {/* Telemetry Tables and Realtime Layout Fields */}
              <Stack gap="lg">
                <Card title="SCADA Pipeline Modbus Tag Subscriptions" subtitle="Active telemetry loop streams verified inside core UI components" variant="default">
                  <DataTable columns={tableColumns} data={mockTableData} />
                </Card>

                <LineChartContainer title="Historical Realtime Trend: Subgrid Thermal Load Profile" height="240px" />
              </Stack>

              {/* Form Input Control Validation Module */}
              <Stack gap="lg">
                <Card title="Control Loop Setpoint Overrides" subtitle="Hardware parameter modifications setup forms" variant="outlined">
                  <Stack gap="md">
                    <TextInput
                      id="txt-tag"
                      label="Modbus Registry Memory Target"
                      placeholder="e.g. 40001"
                      helperText="Specify industrial memory address block registry alignment."
                      required
                    />
                    <Select
                      id="sel-priority"
                      label="Command Intercept Priority Level"
                      options={[
                        { value: 'low', label: 'Routine Automated Sequence (Low)' },
                        { value: 'crit', label: 'Emergency Manual Intercept (Critical)' },
                      ]}
                    />
                    <Switch
                      id="sw-interlock"
                      label="Enforce Hardware Safety Interlock Protection"
                      checked={switchChecked}
                      onChange={() => setSwitchChecked(!switchChecked)}
                    />
                    <Button variant="danger" fullWidth style={{ marginTop: '8px' }}>
                      Publish Changes to Registry Block
                    </Button>
                  </Stack>
                </Card>

                <NetworkGraphContainer title="Distributed Asset Component Dependency Mapping" height="200px" />
              </Stack>
            </Grid>
          </Stack>
        </ContentWrapper>

        {/* System Override Validation Trigger Modal Layer */}
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="System Overrides Trigger Authentication Panel">
          <Stack gap="md">
            <Body style={{ margin: 0 }}>
              You are accessing an isolated programmatic component preview configuration. Proceeding simulates an execution context.
            </Body>
            <Flex justify="flex-end" gap="sm">
              <Button variant="ghost" onClick={() => setModalOpen(false)}>Acknowledge and Terminate</Button>
              <Button variant="primary" onClick={() => setModalOpen(false)}>Confirm Simulation Access</Button>
            </Flex>
          </Stack>
        </Modal>
      </DashboardWrapper>
    </ErrorBoundaryUI>
  );
}
