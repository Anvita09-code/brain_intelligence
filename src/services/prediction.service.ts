import { apiClient } from '@/api';
import { Prediction, PredictionModel } from '@/types';

const MOCK_MODELS: PredictionModel[] = [
  {
    id: 'mod-shap-01',
    name: 'XGBoost Telemetry Classifier v4',
    accuracy: 98.4,
    lastTrained: '2026-06-15 08:30:00',
    status: 'active',
    features: ['vibration', 'temperature', 'pressure', 'speed'],
  },
  {
    id: 'mod-rag-02',
    name: 'Graph Attention Fault Predictor',
    accuracy: 96.1,
    lastTrained: '2026-06-28 14:00:00',
    status: 'active',
    features: ['acoustic_emission', 'oil_viscosity'],
  },
];

/**
 * Section 8 Service Interface Mapping: PredictionService
 * Integrated with existing Section 7 decoupled network layer (apiClient).
 */
export const PredictionService = {
  /**
   * TODO: Connect real-time SHAP/RUL model inference arrays in Phase 2.
   */
  async getPredictions(): Promise<Prediction[]> {
    try {
      return await apiClient.get<Prediction[]>('/api/v1/predictions');
    } catch {
      return MOCK_MODELS;
    }
  },
  async getModels(): Promise<PredictionModel[]> {
    try {
      return await apiClient.get<PredictionModel[]>('/api/v1/predictions/models');
    } catch {
      return MOCK_MODELS;
    }
  },
};

// Backwards-compatible alias for existing Section 7 repo wiring
export const predictionService = PredictionService;
