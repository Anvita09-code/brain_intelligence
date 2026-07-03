"use client";

import React from "react";
import { Button as MuiButton, type ButtonProps as MuiButtonProps } from "@mui/material";
import clsx from "clsx";

/**
 * Small MUI Button adapter used by legacy demo pages.
 *
 * The repo has both MUI-backed `components/ui/Button` and token-backed
 * `components/forms/Button`. Some existing pages use the token aliases
 * `default` / `outline`; normalize them here so TypeScript and MUI both stay
 * happy without touching every caller.
 */
export type ButtonVariant = NonNullable<MuiButtonProps["variant"]> | "default" | "outline";

export type ButtonProps = Omit<MuiButtonProps, "variant"> & {
  variant?: ButtonVariant;
};

function normalizeVariant(variant: ButtonVariant | undefined): MuiButtonProps["variant"] {
  if (variant === "default") return "contained";
  if (variant === "outline") return "outlined";
  return variant;
}

export function Button({ className, children, variant, ...props }: ButtonProps) {
  return (
    <MuiButton
      className={clsx("font-medium shadow-sm", className)}
      variant={normalizeVariant(variant)}
      {...props}
    >
      {children}
    </MuiButton>
  );
}

export default Button;
