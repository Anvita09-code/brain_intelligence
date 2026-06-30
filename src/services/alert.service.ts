import { AnomalyAlert } from "@/types";

export const alertService = {
  getActiveAlerts: async (): Promise<AnomalyAlert[]> => {
    return [
      {
        id: "alt-101",
        assetId: "turbine-01",
        assetName: "Gas Turbine G-101",
        type: "Bearing Degradation",
        severity: "warning",
        timestamp: new Date().toLocaleTimeString(),
        description: "High frequency casing harmonic vibration detected.",
        acknowledged: false
      }
    ];
  },
  acknowledgeAlert: async (_id: string): Promise<boolean> => {
    return true;
  }
};
