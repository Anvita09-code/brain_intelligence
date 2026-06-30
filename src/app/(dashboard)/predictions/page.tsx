"use client";

import { useEffect, useState } from "react";
import { ShapExplainability } from "@/components/ShapExplainability";
import { predictionService } from "@/services/prediction.service";
import { PredictionModel } from "@/types";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Activity, BrainCircuit, CheckCircle2, Clock } from "lucide-react";

export default function PredictionsPage() {
  const [models, setModels] = useState<PredictionModel[]>([]);

  useEffect(() => {
    predictionService.getModels().then(setModels).catch(console.error);
  }, []);

  return (
    <div className="flex flex-col flex-grow py-md pb-xl">
      <Container fluid className="flex flex-col gap-md">
        <div className="border-b border-industrial-border-dark pb-sm">
          <h1 className="font-mono text-lg font-bold uppercase tracking-wider text-industrial-bg-light flex items-center gap-2">
            <Activity className="w-5 h-5 text-industrial-status-critical" />
            <span>Real-Time ML Predictions & SHAP Explainability</span>
          </h1>
          <p className="font-mono text-xs text-industrial-status-offline mt-1">
            XGBoost Classification Engine // Shapley Additive Explanations (SHAP)
          </p>
        </div>

        {/* Models Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {models.map((model) => (
            <Card key={model.id} className="bg-industrial-bg-dark/40">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 font-mono">
                  <BrainCircuit className="w-5 h-5 text-industrial-status-warning" />
                  <div>
                    <h2 className="text-xs font-bold text-industrial-bg-light uppercase">{model.name}</h2>
                    <span className="text-[10px] text-industrial-status-offline block mt-0.5">ID: [{model.id}]</span>
                  </div>
                </div>
                <span className="bg-industrial-status-ok/10 border border-industrial-status-ok/30 text-industrial-status-ok text-[10px] px-2 py-0.5 rounded uppercase font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{model.status}</span>
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-industrial-border-dark flex items-center justify-between font-mono text-xs">
                <span className="text-industrial-status-offline flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[10px]">Trained: {model.lastTrained}</span>
                </span>
                <span className="font-bold text-industrial-status-ok">Accuracy: {model.accuracy}%</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Main SHAP Panel */}
        <div className="bg-industrial-panel-dark/40 border border-industrial-border-dark p-md rounded">
          <ShapExplainability />
        </div>
      </Container>
    </div>
  );
}
