"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";

const PROMPTS = [
  {
    title: "⚡ Momentum Check",
    message:
      "Sent applications earlier this week? Check your pipeline and drop friendly follow-up emails to recruiters.",
  },
  {
    title: "🎯 Story Crafting",
    message:
      "Practice your STAR story for technical tradeoffs: Situation, Task, Action, and Measurable Business Result.",
  },
  {
    title: "💼 Compensation Intel",
    message:
      "Research market rates on levels.fyi and comprehensive bands before entering final round negotiations.",
  },
  {
    title: "🤝 Warm Introductions",
    message:
      "Applications with 1st or 2nd-degree referrals have a 4x higher response rate. Check your alumni networks today.",
  },
];

export function PromptOfDay() {
  const [dismissed, setDismissed] = useState(false);
  const apps = useStore((s) => s.applications);
  const nextActions = apps.filter((a) => a.nextAction);

  if (dismissed) return null;

  const todayPrompt = PROMPTS[new Date().getDate() % PROMPTS.length];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-pink-500/10 p-4 sm:p-5 shadow-xs">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-lg">
            ✨
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground">
                {todayPrompt.title}
              </span>
              {nextActions.length > 0 && (
                <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  {nextActions.length} pending action{nextActions.length > 1 ? "s" : ""}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed max-w-2xl">
              {todayPrompt.message}
            </p>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="rounded-lg p-1 text-xs text-faint hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
          aria-label="Dismiss prompt"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
