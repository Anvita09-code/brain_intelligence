import React from "react";

export interface LoaderProps {
  text?: string;
  size?: "sm" | "md" | "lg";
}

export const Loader: React.FC<LoaderProps> = ({ text = "INITIALIZING TELEMETRY STREAM...", size = "md" }) => {
  const spinSize = size === "sm" ? "w-4 h-4 border-2" : size === "lg" ? "w-8 h-8 border-4" : "w-6 h-6 border-2";

  return (
    <div className="flex flex-col items-center justify-center p-md gap-sm font-mono text-xs text-industrial-status-warning">
      <div className={`${spinSize} border-industrial-status-warning border-t-transparent rounded-full animate-spin`} />
      <span className="animate-pulse tracking-widest">{text}</span>
    </div>
  );
};
