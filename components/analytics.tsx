"use client";
import { useStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { computeStats } from "@/lib/stats";
import { ProgressRing, Sparkline } from "./ui";
import { StatCard } from "./stat-card";

export function Analytics() {
  const apps = useStore((s) => s.applications);
  const stats = computeStats(apps);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const funnel = [
    { label: "Applications", value: stats.total },
    {
      label: "Responses",
      value: Math.round((stats.responseRate / 100) * stats.total),
    },
    { label: "Interviews", value: stats.interviews },
    { label: "Offers", value: stats.offers },
  ];
  const max = Math.max(...funnel.map((f) => f.value), 1);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon="📬"
          label="Total applications"
          value={stats.total}
          trend={`${stats.thisMonth} this month`}
          color="bg-indigo-500/10 text-indigo-500"
        />
        <StatCard
          icon="⚡"
          label="Response rate"
          value={`${stats.responseRate}%`}
          trend="companies that replied"
          color="bg-amber-500/10 text-amber-500"
          ring={{ value: stats.responseRate, color: "#f59e0b" }}
        />
        <StatCard
          icon="🎤"
          label="Interview rate"
          value={`${stats.interviewRate}%`}
          trend={`${stats.interviews} interviews booked`}
          color="bg-sky-500/10 text-sky-500"
          ring={{ value: stats.interviewRate, color: "#0ea5e9" }}
        />
        <StatCard
          icon="🎉"
          label="Offers"
          value={stats.offers}
          trend={`${stats.rejected} rejections — keep going`}
          color="bg-emerald-500/10 text-emerald-500"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h3 className="font-semibold">Weekly activity</h3>
          <p className="text-xs text-faint">Applications submitted per week</p>
          <div className="mt-4 flex items-center justify-center p-2">
            <Sparkline data={stats.activity} w={420} h={80} color="#6366f1" />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h3 className="font-semibold">Pipeline Funnel</h3>
          <p className="text-xs text-faint">Conversion through recruiting stages</p>
          <div className="mt-4 flex flex-col gap-3">
            {funnel.map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <div className="w-24 text-xs font-medium text-faint">
                  {f.label}
                </div>
                <div className="h-6 flex-1 overflow-hidden rounded-md bg-muted">
                  <div
                    className="h-full rounded-md bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700"
                    style={{
                      width: `${mounted ? (f.value / max) * 100 : 0}%`,
                    }}
                  />
                </div>
                <div className="w-8 text-right text-sm font-bold">{f.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h3 className="font-semibold">Status breakdown</h3>
          <p className="text-xs text-faint">Active pipeline distribution</p>
          <div className="mt-4 flex items-center gap-6">
            <ProgressRing
              value={
                stats.total
                  ? Math.round(
                      ((stats.byStatus.Offer ?? 0) +
                        (stats.byStatus.Interview ?? 0)) /
                        stats.total *
                        100
                    )
                  : 0
              }
              size={96}
              stroke={8}
              label="in play"
            />
            <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {Object.entries(stats.byStatus).map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-border/40 pb-1">
                  <span className="text-faint">{k}</span>
                  <span className="font-semibold">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h3 className="font-semibold">Top locations & avg response</h3>
          <p className="text-xs text-faint">Geographic distribution and response velocity</p>
          <div className="mt-4 flex flex-col gap-2">
            {stats.byLocation.map((l) => (
              <div
                key={l.name}
                className="flex items-center justify-between text-sm py-0.5"
              >
                <span>{l.name}</span>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold">
                  {l.count}
                </span>
              </div>
            ))}
            {stats.byLocation.length === 0 && (
              <div className="text-xs text-faint py-2">No location data yet</div>
            )}
          </div>
          <div className="mt-4 border-t border-border pt-3 text-sm flex items-center justify-between">
            <span className="text-faint">Avg. applied → interview:</span>
            <span className="font-bold text-primary">
              {stats.avgResponse ? `${stats.avgResponse} days` : "—"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
