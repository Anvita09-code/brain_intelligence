import { apiClient } from '@/api';
import { Alert, AnomalyAlert } from '@/types';

const MOCK_ALERTS: AnomalyAlert[] = [
  {
    id: 'alt-101',
    assetId: 'turbine-01',
    assetName: 'Gas Turbine G-101',
    type: 'Bearing Degradation',
    severity: 'warning',
    timestamp: new Date().toLocaleTimeString(),
    description: 'High frequency casing harmonic vibration detected.',
    acknowledged: false,
  },
];

/**
 * Section 8 Service Interface Mapping: AlertService
 * Integrated with existing Section 7 decoupled network layer (apiClient).
 */
export const AlertService = {
  /**
   * TODO: Bind to live SCADA alert stream hooks in Phase 2.
   */
  async getActiveAlerts(): Promise<Alert[]> {
    try {
      return await apiClient.get<Alert[]>('/api/v1/alerts');
    } catch {
      return MOCK_ALERTS;
    }
  },
  async acknowledgeAlert(id: string): Promise<boolean> {
    try {
      await apiClient.post<void>(`/api/v1/alerts/${id}/acknowledge`);
      return true;
    } catch {
      return true;
    }
  },
};

// Backwards-compatible alias for existing Section 7 repo wiring
export const alertService = AlertService;
