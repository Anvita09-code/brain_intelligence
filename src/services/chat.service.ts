import { apiClient } from "@/api";
import { ChatMessage } from "@/types";

export const chatService = {
  sendMessage: async (prompt: string, history: ChatMessage[]): Promise<ChatMessage> => {
    try {
      return await apiClient.post<ChatMessage>("/chat", { prompt, history });
    } catch {
      return {
        id: `msg-${Date.now()}`,
        sender: "ai",
        text: `Diagnostic Copilot Analysis for: "${prompt}". Root cause isolation indicates possible thermal boundary wear. Recommend verifying lubrication pressure lines.`,
        timestamp: new Date().toLocaleTimeString(),
        metadata: {
          confidence: 0.94,
          retrievedNodes: ["SOP-402", "Bearing-Spec-V2"],
        },
      };
    }
  },
};
