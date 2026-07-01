export type AssetStatus = "ok" | "warning" | "critical" | "offline";

export interface TelemetryReading {
  timestamp: string;
  speed: number;       // RPM
  torque: number;      // Nm
  temperature: number; // °C
  vibration: number;   // mm/s
  flowRate: number;    // L/min
  pressure: number;    // bar
  load: number;        // kW
  riskScore: number;   // Anomaly score 0 - 100%
  status: AssetStatus;
}

export interface Asset {
  id: string;
  name: string;
  type: string;
  status: AssetStatus;
  telemetry: TelemetryReading;
  history: TelemetryReading[];
}

export interface AnomalyAlert {
  id: string;
  assetId: string;
  assetName: string;
  type: string;
  severity: "warning" | "critical";
  timestamp: string;
  description: string;
  acknowledged: boolean;
}

export interface PredictionModel {
  id: string;
  name: string;
  accuracy: number;
  lastTrained: string;
  status: "active" | "retraining" | "idle";
  features: string[];
}

export interface KnowledgeNode {
  id: string;
  label: string;
  category: "Component" | "FailureMode" | "Procedure" | "SOP";
  connections: string[];
  snippet: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai" | "system";
  text: string;
  timestamp: string;
  metadata?: {
    retrievedNodes?: string[];
    confidence?: number;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "Plant Superintendent" | "Lead Diagnostic Engineer" | "Operator";
  shift: string;
  permissions: string[];
  avatar?: string;
}

export interface NavItem {
  label: string;
  href: string;
  iconName: string;
  badge?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

// Section 8 Service Interface Mapping Type Aliases
export type Alert = AnomalyAlert;
export type Prediction = PredictionModel;
export type Knowledge = KnowledgeNode;
export type Chat = ChatMessage;
export type User = UserProfile;
