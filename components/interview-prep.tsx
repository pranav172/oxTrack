"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { fmtDate } from "@/lib/utils";
import { Badge } from "./ui";

const QUESTION_BANK: Record<string, string[]> = {
  Behavioral: [
    "Tell me about a time you disagreed with a teammate. How did you resolve it?",
    "Describe your most significant professional failure and what you learned.",
    "How do you prioritize when everything feels urgent?",
    "Tell me about a project you're most proud of. What was your specific contribution?",
  ],
  Technical: [
    "Walk me through your approach to debugging a hard production issue.",
    "How would you design a scalable distributed system for this role?",
    "Explain a technical tradeoff you made recently and why.",
    "What's a piece of technology you learned recently, and how did you evaluate it?",
  ],
  "Culture fit": [
    "What does your ideal team dynamic look like?",
    "Why this company specifically, and why now?",
    "How do you prefer to give and receive constructive feedback?",
    "What kind of work environment drains or energizes you?",
  ],
  "Salary / negotiation": [
    "What are your compensation expectations for this level?",
    "What's your current total compensation structure (base, equity, bonus)?",
    "Do you have competing offers or active interview timelines?",
    "What factors would make you accept an offer immediately?",
  ],
};

export function InterviewPrep() {
  const apps = useStore((s) => s.applications);
  const upcoming = apps
    .flatMap((a) =>
      (a.interviews || [])
        .filter((i) => !i.completed)
        .map((i) => ({
          ...i,
          company: a.company,
          role: a.role,
        }))
    )
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));

  const [selected, setSelected] = useState(0);
  const active = upcoming[selected] || upcoming[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <div className="flex flex-col gap-2">
        <h2 className="mb-1 px-1 text-sm font-semibold text-faint">
          Upcoming interviews ({upcoming.length})
        </h2>
        {upcoming.map((iv, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`rounded-xl border p-4 text-left transition-colors ${
              i === selected
                ? "border-primary/50 bg-primary/5 ring-1 ring-primary/30"
                : "border-border bg-card hover:bg-muted/40"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm font-semibold truncate">{iv.company}</div>
              <Badge className="bg-primary/10 text-primary shrink-0">{iv.type}</Badge>
            </div>
            <div className="text-xs text-faint truncate">{iv.role}</div>
            <div className="mt-2 text-xs font-medium">{fmtDate(iv.date)}</div>
          </button>
        ))}
        {upcoming.length === 0 && (
          <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-faint">
            No interviews scheduled. Mark an application with an interview to see prep questions here.
          </div>
        )}
      </div>

      {active ? (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
            <div>
              <h2 className="text-xl font-bold">
                Prep: {active.type} · {active.company}
              </h2>
              <p className="mt-1 text-sm text-faint">
                {fmtDate(active.date)} with {active.withWhom || "interviewer"}
                {active.focus ? ` · Focus: ${active.focus}` : ""}
              </p>
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-600 font-semibold px-3 py-1">
              Active Round
            </Badge>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
              Core Practice Questions
            </h3>
            {(QUESTION_BANK[active.type] ?? QUESTION_BANK.Behavioral).map(
              (q, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-background p-4 text-sm leading-relaxed"
                >
                  <span className="mr-2 font-bold text-primary">{i + 1}.</span>
                  {q}
                </div>
              )
            )}
          </div>

          <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm">
            <div className="font-semibold text-primary flex items-center gap-1.5">
              <span>💡</span> STAR Method Reminder
            </div>
            <p className="mt-1.5 text-muted-foreground leading-relaxed">
              <strong>Situation:</strong> Set the context and challenge. <br />
              <strong>Task:</strong> Explain what was required of you. <br />
              <strong>Action:</strong> Detail the specific steps and decisions you made. <br />
              <strong>Result:</strong> Quantify the outcome and what you learned.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center text-sm text-faint">
          Select an interview on the left to view customized questions and practice guidelines.
        </div>
      )}
    </div>
  );
}
