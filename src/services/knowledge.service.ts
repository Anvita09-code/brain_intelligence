import { apiClient } from "@/api";
import { KnowledgeNode } from "@/types";

const MOCK_GRAPH: KnowledgeNode[] = [
  {
    id: "node-1",
    label: "Turbine Bearing Assembly",
    category: "Component",
    connections: ["node-2", "node-3"],
    snippet: "Journal bearing specification ISO-10816 threshold limits.",
  },
  {
    id: "node-2",
    label: "Harmonic Vibration Spike",
    category: "FailureMode",
    connections: ["node-1"],
    snippet: "Occurs when lubrication film degrades below 12 microns.",
  },
  {
    id: "node-3",
    label: "Emergency Shutdown SOP-109",
    category: "SOP",
    connections: ["node-1"],
    snippet: "Trip fuel valve solenoid immediately upon casing temp > 90C.",
  },
];

export const knowledgeService = {
  getKnowledgeGraph: async (): Promise<KnowledgeNode[]> => {
    try {
      return await apiClient.get<KnowledgeNode[]>("/knowledge/graph");
    } catch {
      return MOCK_GRAPH;
    }
  },
};
