"use client";
import { SearchBar } from "./search-bar";
import { AddButton } from "./add-button";
import { useStore } from "@/lib/store";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Topbar() {
  const apps = useStore((s) => s.applications);
  const inPlay = apps.filter(
    (a) => !["Rejected", "Offer"].includes(a.status)
  ).length;
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur md:px-8">
      <div className="flex items-center gap-2 md:hidden">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-black text-white">
          O
        </div>
        <span className="text-sm font-bold tracking-tight">OxTrack</span>
      </div>

      <SearchBar />

      <div className="ml-auto hidden text-xs text-faint sm:block">
        <span className="font-semibold text-foreground">{inPlay}</span> active applications
      </div>

      {mounted && (
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-faint hover:bg-muted hover:text-foreground transition-colors"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      )}

      <AddButton />
    </header>
  );
}
