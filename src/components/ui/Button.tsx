"use client";

import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "warning" | "ghost" | "ok" | "success";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles = "font-mono inline-flex items-center justify-center font-bold uppercase transition select-none focus:outline-none rounded border cursor-pointer";
  
  const variantStyles = {
    primary: "bg-industrial-panel-dark border-industrial-border-dark text-industrial-bg-light hover:border-industrial-status-ok hover:text-industrial-status-ok",
    secondary: "bg-transparent border-industrial-border-dark text-industrial-status-offline hover:text-industrial-bg-light hover:border-industrial-status-offline",
    danger: "bg-industrial-status-critical/20 border-industrial-status-critical text-industrial-status-critical hover:bg-industrial-status-critical/30",
    warning: "bg-industrial-status-warning/20 border-industrial-status-warning text-industrial-status-warning hover:bg-industrial-status-warning/30",
    ghost: "bg-transparent border-transparent text-industrial-status-offline hover:text-industrial-bg-light hover:bg-industrial-panel-dark/50",
    ok: "bg-industrial-status-ok/20 border-industrial-status-ok text-industrial-status-ok hover:bg-industrial-status-ok/30",
    success: "bg-industrial-status-ok text-industrial-bg-highContrast hover:bg-industrial-status-ok/90"
  };

  const sizeStyles = {
    sm: "text-[10px] px-2 py-1 gap-1",
    md: "text-xs px-4 py-2 gap-2",
    lg: "text-sm px-6 py-3 gap-2.5"
  };

  const disabledStyles = disabled || isLoading ? "opacity-50 cursor-not-allowed pointer-events-none" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}
      <span>{children}</span>
      {!isLoading && rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
    </button>
  );
};
