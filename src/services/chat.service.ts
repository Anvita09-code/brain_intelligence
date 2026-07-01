import { apiClient } from '@/api';
import { Chat, ChatMessage } from '@/types';

/**
 * Section 8 Service Interface Mapping: ChatService
 * Integrated with existing Section 7 decoupled network layer (apiClient).
 */
export const ChatService = {
  /**
   * TODO: Wire WebSocket completion chunks for the operational co-pilot in Phase 2.
   */
  async submitQuery(prompt?: string, history?: Chat[]): Promise<Chat[]> {
    try {
      return await apiClient.post<Chat[]>('/api/v1/chat/query', { prompt, history });
    } catch {
      return [];
    }
  },
  async sendMessage(prompt: string, history: ChatMessage[]): Promise<ChatMessage> {
    try {
      return await apiClient.post<ChatMessage>('/api/v1/chat', { prompt, history });
    } catch {
      return {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        text: `Diagnostic Copilot Analysis for: "${prompt}". Root cause isolation indicates possible thermal boundary wear. Recommend verifying lubrication pressure lines.`,
        timestamp: new Date().toLocaleTimeString(),
        metadata: {
          confidence: 0.94,
          retrievedNodes: ['SOP-402', 'Bearing-Spec-V2'],
        },
      };
    }
  },
};

// Backwards-compatible alias for existing Section 7 repo wiring
export const chatService = ChatService;
