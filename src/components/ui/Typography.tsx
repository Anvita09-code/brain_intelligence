import React from "react";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "body1" | "caption" | "code";
  color?: "light" | "muted" | "ok" | "warning" | "critical";
  as?: React.ElementType;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = "body",
  color = "light",
  as,
  className = "",
  ...props
}) => {
  const Component = as || (
    variant === "h1" ? "h1" :
    variant === "h2" ? "h2" :
    variant === "h3" ? "h3" :
    variant === "h4" ? "h4" :
    variant === "caption" ? "span" :
    variant === "code" ? "code" :
    "p"
  );

  const variantStyles = {
    h1: "font-mono text-xl md:text-2xl font-bold uppercase tracking-wider",
    h2: "font-mono text-lg font-bold uppercase tracking-wide",
    h3: "font-mono text-sm font-bold uppercase tracking-wide",
    h4: "font-mono text-base font-bold uppercase tracking-wide",
    body: "font-sans text-xs md:text-sm leading-relaxed",
    body1: "font-sans text-sm md:text-base leading-relaxed",
    caption: "font-mono text-[10px] uppercase tracking-wider",
    code: "font-mono text-xs bg-industrial-panel-dark px-1.5 py-0.5 rounded border border-industrial-border-dark"
  };

  const colorStyles = {
    light: "text-industrial-bg-light",
    muted: "text-industrial-status-offline",
    ok: "text-industrial-status-ok",
    warning: "text-industrial-status-warning",
    critical: "text-industrial-status-critical font-bold"
  };

  return (
    <Component
      className={`${variantStyles[variant]} ${colorStyles[color]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;
