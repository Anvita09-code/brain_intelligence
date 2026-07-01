import { apiClient } from '@/api';
import { Knowledge, KnowledgeNode } from '@/types';

const MOCK_GRAPH: KnowledgeNode[] = [
  {
    id: 'node-1',
    label: 'Turbine Bearing Assembly',
    category: 'Component',
    connections: ['node-2', 'node-3'],
    snippet: 'Journal bearing specification ISO-10816 threshold limits.',
  },
  {
    id: 'node-2',
    label: 'Harmonic Vibration Spike',
    category: 'FailureMode',
    connections: ['node-1'],
    snippet: 'Occurs when lubrication film degrades below 12 microns.',
  },
  {
    id: 'node-3',
    label: 'Emergency Shutdown SOP-109',
    category: 'SOP',
    connections: ['node-1'],
    snippet: 'Trip fuel valve solenoid immediately upon casing temp > 90C.',
  },
];

/**
 * Section 8 Service Interface Mapping: KnowledgeService
 * Integrated with existing Section 7 decoupled network layer (apiClient).
 */
export const KnowledgeService = {
  /**
   * TODO: Connect Neo4j and GraphRAG contextual vector indexes in Phase 2.
   */
  async getGraphContext(): Promise<Knowledge[]> {
    try {
      return await apiClient.get<Knowledge[]>('/api/v1/knowledge/context');
    } catch {
      return MOCK_GRAPH;
    }
  },
  async getKnowledgeGraph(): Promise<KnowledgeNode[]> {
    try {
      return await apiClient.get<KnowledgeNode[]>('/api/v1/knowledge/graph');
    } catch {
      return MOCK_GRAPH;
    }
  },
};

// Backwards-compatible alias for existing Section 7 repo wiring
export const knowledgeService = KnowledgeService;
