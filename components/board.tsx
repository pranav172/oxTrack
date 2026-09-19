"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { KanbanBoard } from "./kanban";
import { ExportButton } from "./export-button";
import { StatusPill } from "./status-pill";
import { Avatar } from "./ui";
import { fmtDateShort, fmtMoney } from "@/lib/utils";

export function Board() {
  const { applications, query, viewMode, setViewMode, select, reset } =
    useStore();
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filtered = applications.filter((a) => {
    const matchesStatus =
      statusFilter === "All" ? true : a.status === statusFilter;
    if (!matchesStatus) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      a.company.toLowerCase().includes(q) ||
      a.role.toLowerCase().includes(q) ||
      a.location.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              viewMode === "grid"
                ? "bg-primary text-white shadow-xs"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>▚</span> Kanban Board
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              viewMode === "table"
                ? "bg-primary text-white shadow-xs"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>☰</span> Table View
          </button>
        </div>

        <div className="flex items-center gap-2">
          <ExportButton />
          <button
            onClick={() => {
              if (confirm("Reset application data to initial demo set?")) {
                reset();
              }
            }}
            title="Reset data"
            className="rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-faint hover:bg-muted hover:text-foreground transition-colors"
          >
            ↺ Reset
          </button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <KanbanBoard />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-xs">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-xs font-semibold text-faint uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Company & Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Salary Range</th>
                <th className="px-4 py-3">Applied</th>
                <th className="px-4 py-3">Next Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((app) => (
                <tr
                  key={app.id}
                  onClick={() => select(app.id)}
                  className="cursor-pointer transition-colors hover:bg-muted/40"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={app.company} color={app.logoColor} />
                      <div>
                        <div className="font-semibold">{app.company}</div>
                        <div className="text-xs text-faint">{app.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill status={app.status} />
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {app.location} {app.remote && "· Remote"}
                  </td>
                  <td className="px-4 py-3 text-xs font-medium">
                    {app.salaryMin
                      ? `${fmtMoney(app.salaryMin)} – ${fmtMoney(app.salaryMax)}`
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-faint">
                    {fmtDateShort(app.appliedDate)}
                  </td>
                  <td className="px-4 py-3 text-xs font-medium text-primary">
                    {app.nextAction || "—"}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-xs text-faint">
                    No applications match the search filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
