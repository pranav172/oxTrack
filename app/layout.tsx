import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { Topbar } from "@/components/topbar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "OxTrack — Job Hunt CRM",
  description: "Track applications, interviews, and offers in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-background text-foreground`}>
        <Providers>
          <div className="min-h-screen pl-0 md:pl-56 flex flex-col">
            <Sidebar />
            <Topbar />
            <main className="mx-auto w-full max-w-7xl flex-1 p-4 pb-24 md:p-8 md:pb-12">
              {children}
            </main>
            <MobileNav />
          </div>
        </Providers>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
