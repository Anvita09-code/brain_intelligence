import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { GlobalProviders } from "@/providers/GlobalProviders";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IOB Control Room | Enterprise Industrial Operations Board",
  description: "Real-time industrial telemetry, digital twin status monitors, semantic Graph RAG diagnostics, and SHAP machine learning explanation boards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
      data-theme="dark"
    >
      <body id="__next_root" className="min-h-full bg-industrial-bg text-industrial-bg-light font-sans selection:bg-industrial-status-warning selection:text-industrial-bg-highContrast flex flex-col">
        <GlobalProviders>
          {children}
        </GlobalProviders>
      </body>
    </html>
  );
}
