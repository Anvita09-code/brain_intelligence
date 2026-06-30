"use client";

import { useLocalStorage } from "./useLocalStorage";
import { useEffect } from "react";

export type Theme = "dark" | "light" | "high-contrast";

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage<Theme>("iob_theme", "dark");

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, setTheme, toggleTheme };
};
