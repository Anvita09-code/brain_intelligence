import { apiClient } from "@/api";
import { AnomalyAlert } from "@/types";

const MOCK_ALERTS: AnomalyAlert[] = [
  {
    id: "alt-101",
    assetId: "turbine-01",
    assetName: "Gas Turbine G-101",
    type: "Bearing Degradation",
    severity: "warning",
    timestamp: new Date().toLocaleTimeString(),
    description: "High frequency casing harmonic vibration detected.",
    acknowledged: false,
  },
];

export const alertService = {
  getActiveAlerts: async (): Promise<AnomalyAlert[]> => {
    try {
      return await apiClient.get<AnomalyAlert[]>("/alerts");
    } catch {
      return MOCK_ALERTS;
    }
  },
  acknowledgeAlert: async (id: string): Promise<boolean> => {
    try {
      await apiClient.post<void>(`/alerts/${id}/acknowledge`);
      return true;
    } catch {
      return true;
    }
  },
};
