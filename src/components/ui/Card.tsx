import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: "default" | "hazard" | "highlight";
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  headerAction,
  footer,
  variant = "default",
  className = "",
  ...props
}) => {
  const borderStyles = 
    variant === "hazard" ? "border-industrial-status-critical/60 shadow-lg shadow-industrial-status-critical/5" :
    variant === "highlight" ? "border-industrial-status-warning/60 shadow-lg shadow-industrial-status-warning/5" :
    "border-industrial-border-dark";

  return (
    <div
      className={`bg-industrial-panel-dark border ${borderStyles} rounded overflow-hidden flex flex-col ${className}`}
      {...props}
    >
      {(title || headerAction) && (
        <div className="px-md py-sm border-b border-industrial-border-dark flex items-center justify-between gap-sm bg-industrial-panel-dark/80">
          <div>
            {title && <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-industrial-bg-light">{title}</h3>}
            {subtitle && <p className="font-mono text-[10px] text-industrial-status-offline mt-0.5">{subtitle}</p>}
          </div>
          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </div>
      )}
      <div className="p-md flex-grow">{children}</div>
      {footer && (
        <div className="px-md py-xs border-t border-industrial-border-dark bg-industrial-bg-dark/50 font-mono text-[10px] text-industrial-status-offline">
          {footer}
        </div>
      )}
    </div>
  );
};
