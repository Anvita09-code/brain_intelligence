"use client";

import React from "react";
import { TelemetryProvider } from "@/contexts/TelemetryContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const industrialTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0B0F19',
      paper: '#111827',
    },
    primary: {
      main: '#007ACC',
    },
    divider: '#1F2937',
  },
  typography: {
    fontFamily: 'var(--font-inter), sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0B0F19',
          color: '#F3F4F6',
          margin: 0,
          padding: 0,
          fontFamily: 'var(--font-inter), sans-serif',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },
  },
});

export const GlobalProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppRouterCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={industrialTheme}>
        <CssBaseline />
        <TelemetryProvider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </TelemetryProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};
