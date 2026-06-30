"use client";

import { useEffect, useState } from "react";
import { GraphRagPanel } from "@/components/GraphRagPanel";
import { knowledgeService } from "@/services/knowledge.service";
import { KnowledgeNode } from "@/types";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Database, Network } from "lucide-react";

export default function KnowledgePage() {
  const [nodes, setNodes] = useState<KnowledgeNode[]>([]);

  useEffect(() => {
    knowledgeService.getKnowledgeGraph().then(setNodes).catch(console.error);
  }, []);

  return (
    <div className="flex flex-col flex-grow py-md pb-xl">
      <Container fluid className="flex flex-col gap-md">
        <div className="border-b border-industrial-border-dark pb-sm">
          <h1 className="font-mono text-lg font-bold uppercase tracking-wider text-industrial-bg-light flex items-center gap-2">
            <Database className="w-5 h-5 text-industrial-status-warning" />
            <span>Semantic Graph RAG Diagnostics Board</span>
          </h1>
          <p className="font-mono text-xs text-industrial-status-offline mt-1">
            Retrieval-Augmented Generation linking live telemetry signatures to Plant SOPs
          </p>
        </div>

        {/* Knowledge Node Index Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {nodes.map((node) => (
            <Card key={node.id} className="!p-3 bg-industrial-bg-dark/50">
              <div className="flex items-center gap-2 font-mono">
                <Network className="w-4 h-4 text-industrial-status-warning shrink-0" />
                <div className="truncate">
                  <div className="text-xs font-bold text-industrial-bg-light truncate">{node.label}</div>
                  <div className="text-[9px] text-industrial-status-offline uppercase mt-0.5">{node.category}</div>
                </div>
              </div>
              <p className="font-sans text-[10px] text-industrial-status-offline mt-2 leading-normal line-clamp-2">
                {node.snippet}
              </p>
            </Card>
          ))}
        </div>

        {/* Graph RAG View */}
        <div className="bg-industrial-panel-dark/40 border border-industrial-border-dark p-md rounded">
          <GraphRagPanel />
        </div>
      </Container>
    </div>
  );
}
