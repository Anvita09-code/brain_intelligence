"use client";

import React, { useState } from "react";
import { chatService } from "@/services/chat.service";
import { ChatMessage } from "@/types";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MessageSquareCode, Send, Bot, User, Sparkles, Database } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-init",
      sender: "ai",
      text: "IOB Diagnostic Copilot Online. I am continuously ingesting streaming sensor telemetry and enterprise Graph RAG nodes. Ask me to diagnose current plant vibrations, explain anomaly risk scores, or retrieve emergency shutdown SOPs.",
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);
  const [prompt, setPrompt] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-usr`,
      sender: "user",
      text: prompt.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setPrompt("");
    setIsSending(true);

    try {
      const aiReply = await chatService.sendMessage(userMsg.text, updatedHistory);
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col flex-grow py-md pb-xl">
      <Container fluid className="flex flex-col flex-grow gap-md">
        <div className="border-b border-industrial-border-dark pb-sm flex justify-between items-end">
          <div>
            <h1 className="font-mono text-lg font-bold uppercase tracking-wider text-industrial-bg-light flex items-center gap-2">
              <MessageSquareCode className="w-5 h-5 text-industrial-status-warning" />
              <span>Industrial AI Diagnostic Copilot</span>
            </h1>
            <p className="font-mono text-xs text-industrial-status-offline mt-1">
              Autonomous conversational reasoning agent with real-time Graph RAG retrieval capabilities
            </p>
          </div>
        </div>

        <Card className="flex-grow flex flex-col min-h-[600px] shadow-2xl" title="INTERACTIVE DIAGNOSTIC SHELL // COPILOT v2.4">
          {/* Chat Transcript Window */}
          <div className="flex-grow flex flex-col gap-4 overflow-y-auto pr-2 my-2 font-mono text-xs">
            {messages.map((m) => {
              const isAi = m.sender === "ai";

              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-3 max-w-3xl ${isAi ? "mr-auto" : "ml-auto flex-row-reverse"}`}
                >
                  <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center ${isAi ? "bg-industrial-status-warning/20 text-industrial-status-warning border border-industrial-status-warning/40" : "bg-industrial-bg-dark text-industrial-bg-light border border-industrial-border-dark"}`}>
                    {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div className={`p-4 rounded border ${isAi ? "bg-industrial-bg-dark border-industrial-border-dark text-industrial-bg-light" : "bg-industrial-status-warning/10 border-industrial-status-warning/40 text-industrial-bg-light"}`}>
                    <div className="flex items-center justify-between gap-4 mb-2 pb-1 border-b border-industrial-border-dark/60 text-[10px] text-industrial-status-offline">
                      <span className="font-bold uppercase">{isAi ? "Diagnostic Copilot" : "Operator Shell"}</span>
                      <span>{m.timestamp}</span>
                    </div>

                    <p className="font-sans text-xs leading-relaxed whitespace-pre-wrap">{m.text}</p>

                    {m.metadata && (
                      <div className="mt-3 pt-2 border-t border-industrial-border-dark/60 flex flex-wrap items-center gap-2 text-[10px]">
                        <span className="text-industrial-status-warning font-bold flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Confidence: {m.metadata.confidence ? `${m.metadata.confidence * 100}%` : "98%"}</span>
                        </span>
                        {m.metadata.retrievedNodes && (
                          <span className="bg-industrial-panel-dark px-2 py-0.5 rounded border border-industrial-border-dark text-industrial-status-offline flex items-center gap-1">
                            <Database className="w-3 h-3" />
                            <span>Sources: {m.metadata.retrievedNodes.join(", ")}</span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isSending && (
              <div className="flex items-center gap-3 mr-auto text-industrial-status-warning font-mono text-xs p-4 animate-pulse">
                <Bot className="w-4 h-4 animate-spin" />
                <span>COPILOT IS QUERYING TELEMETRY GRAPH & GENERATING ANALYSIS...</span>
              </div>
            )}
          </div>

          {/* Input Prompt Bar */}
          <form onSubmit={handleSend} className="mt-4 pt-4 border-t border-industrial-border-dark flex gap-3 shrink-0">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Query copilot (e.g., 'Analyze turbine bearing wear risk', 'Retrieve emergency trip SOP')..."
              className="flex-grow bg-industrial-bg-dark border border-industrial-border-dark rounded px-4 py-3 font-mono text-xs text-industrial-bg-light focus:border-industrial-status-warning focus:outline-none transition"
              disabled={isSending}
            />
            <Button
              type="submit"
              variant="warning"
              size="md"
              isLoading={isSending}
              rightIcon={<Send className="w-4 h-4" />}
            >
              EXECUTE
            </Button>
          </form>
        </Card>
      </Container>
    </div>
  );
}
