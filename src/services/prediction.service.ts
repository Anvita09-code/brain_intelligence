import { apiClient } from "@/api";
import { PredictionModel } from "@/types";

const MOCK_MODELS: PredictionModel[] = [
  {
    id: "mod-shap-01",
    name: "XGBoost Telemetry Classifier v4",
    accuracy: 98.4,
    lastTrained: "2026-06-15 08:30:00",
    status: "active",
    features: ["vibration", "temperature", "pressure", "speed"],
  },
  {
    id: "mod-rag-02",
    name: "Graph Attention Fault Predictor",
    accuracy: 96.1,
    lastTrained: "2026-06-28 14:00:00",
    status: "active",
    features: ["acoustic_emission", "oil_viscosity"],
  },
];

export const predictionService = {
  getModels: async (): Promise<PredictionModel[]> => {
    try {
      return await apiClient.get<PredictionModel[]>("/predictions/models");
    } catch {
      return MOCK_MODELS;
    }
  },
};
