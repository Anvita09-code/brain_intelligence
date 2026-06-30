import React from "react";

export interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = "md", showText = true }) => {
  const badgeSize = 
    size === "sm" ? "p-0.5 text-[10px]" :
    size === "lg" ? "p-1.5 text-base" :
    "p-1 text-xs";

  const textSize = 
    size === "sm" ? "text-xs" :
    size === "lg" ? "text-lg" :
    "text-sm";

  return (
    <div className="flex items-center gap-2 select-none">
      <div className={`bg-industrial-status-critical text-industrial-bg-highContrast rounded font-bold font-mono tracking-tighter ${badgeSize}`}>
        IOB
      </div>
      {showText && (
        <span className={`font-bold font-mono uppercase tracking-wider text-industrial-bg-light ${textSize}`}>
          Industrial Operations Board
        </span>
      )}
    </div>
  );
};
