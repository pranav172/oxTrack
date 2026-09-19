"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { backdrop, scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface Command {
  id: string;
  icon: string;
  label: string;
  shortcut?: string;
  action: () => void;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const openForm = useStore((s) => s.openForm);
  const reset = useStore((s) => s.reset);
  const { theme, setTheme } = useTheme();

  const commands: Command[] = useMemo(
    () => [
      {
        id: "add",
        icon: "+",
        label: "Add application",
        shortcut: "N",
        action: () => {
          openForm();
          setOpen(false);
        },
      },
      {
        id: "pipeline",
        icon: "▚",
        label: "Go to Pipeline",
        action: () => {
          router.push("/");
          setOpen(false);
        },
      },
      {
        id: "analytics",
        icon: "◔",
        label: "Open Analytics",
        action: () => {
          router.push("/analytics");
          setOpen(false);
        },
      },
      {
        id: "interviews",
        icon: "🎤",
        label: "Interview Prep",
        action: () => {
          router.push("/interviews");
          setOpen(false);
        },
      },
      {
        id: "companies",
        icon: "🏢",
        label: "Companies",
        action: () => {
          router.push("/companies");
          setOpen(false);
        },
      },
      {
        id: "theme",
        icon: theme === "dark" ? "☀️" : "🌙",
        label: `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
        action: () => {
          setTheme(theme === "dark" ? "light" : "dark");
          setOpen(false);
        },
      },
      {
        id: "reset",
        icon: "↺",
        label: "Reset to demo data",
        action: () => {
          reset();
          setOpen(false);
        },
      },
    ],
    [openForm, router, theme, setTheme, reset]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter((c) => c.label.toLowerCase().includes(q));
  }, [commands, query]);

  // Reset selection when query changes
  useEffect(() => {
    setSelected(0);
  }, [query]);

  // Global Cmd+K / Ctrl+K toggle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
        setSelected(0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Focus input when opening
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const run = (cmd: Command) => cmd.action();

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => (s + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => (s - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && filtered[selected]) {
      e.preventDefault();
      run(filtered[selected]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]">
          <motion.div
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <span className="text-faint text-sm">⌘</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands…"
                className="flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-faint"
              />
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-faint">
                ESC
              </kbd>
            </div>
            <div className="max-h-72 overflow-y-auto p-1.5">
              {filtered.length === 0 && (
                <div className="py-8 text-center text-sm text-faint">
                  No commands found
                </div>
              )}
              {filtered.map((cmd, i) => (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={() => run(cmd)}
                  onMouseEnter={() => setSelected(i)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                    i === selected
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-xs">
                    {cmd.icon}
                  </span>
                  <span className="flex-1 font-medium">{cmd.label}</span>
                  {cmd.shortcut && (
                    <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-faint">
                      {cmd.shortcut}
                    </kbd>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
