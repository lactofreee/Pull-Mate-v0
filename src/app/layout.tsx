import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";
import RootProvider from "../components/context/RootProvider";
import { SidebarProvider } from "../components/ui/sidebar";


export const metadata: Metadata = {
  title: "Pull-Mate - AI Pull Request Assistant",
  description:
    "AI-powered Pull Request assistant for developers. Streamline your GitHub workflow with intelligent PR creation and code review.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <RootProvider>
            {/* <SidebarProvider> */}
              <div className="min-h-screen w-full">{children}</div>
            {/* </SidebarProvider> */}
          </RootProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
