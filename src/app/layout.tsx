import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
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
      <body className="min-h-full bg-industrial-bg-dark text-industrial-bg-light font-sans selection:bg-industrial-status-warning selection:text-industrial-bg-highContrast">
        {children}
      </body>
    </html>
  );
}
