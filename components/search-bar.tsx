"use client";
import { useStore } from "@/lib/store";
import { useEffect } from "react";

export function SearchBar() {
  const { query, setQuery } = useStore();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        document.getElementById("global-search")?.focus();
      }
      if (e.key === "Escape") setQuery("");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setQuery]);

  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint text-sm">
        🔍
      </span>
      <input
        id="global-search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search companies, roles, locations…"
        className="w-56 sm:w-64 md:w-72 rounded-lg border border-border bg-background py-1.5 pl-9 pr-9 text-sm outline-none transition-all placeholder:text-faint focus:w-80 focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      {query ? (
        <button
          onClick={() => setQuery("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-faint hover:text-foreground"
        >
          ✕
        </button>
      ) : (
        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-faint">
          /
        </kbd>
      )}
    </div>
  );
}
