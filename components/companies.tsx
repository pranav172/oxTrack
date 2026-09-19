"use client";
import { useMemo } from "react";
import { useStore } from "@/lib/store";
import { Avatar, Badge } from "./ui";
import { fmtMoney } from "@/lib/utils";
import { STATUS_COLORS } from "@/lib/types";

export function Companies() {
  const apps = useStore((s) => s.applications);
  const select = useStore((s) => s.select);
  const query = useStore((s) => s.query);

  const companies = useMemo(() => {
    const map = new Map<
      string,
      {
        name: string;
        color: string;
        roles: number;
        best: string;
        salaryMax: number;
        locations: Set<string>;
      }
    >();

    apps.forEach((a) => {
      const existing = map.get(a.company) ?? {
        name: a.company,
        color: a.logoColor,
        roles: 0,
        best: a.status,
        salaryMax: a.salaryMax ?? 0,
        locations: new Set<string>(),
      };
      existing.roles++;
      existing.salaryMax = Math.max(existing.salaryMax, a.salaryMax ?? 0);
      if (a.location) existing.locations.add(a.location);
      // Status priority
      if (a.status === "Offer") existing.best = "Offer";
      else if (a.status === "Final Round" && existing.best !== "Offer")
        existing.best = "Final Round";
      else if (
        a.status === "Interview" &&
        !["Offer", "Final Round"].includes(existing.best)
      )
        existing.best = "Interview";

      map.set(a.company, existing);
    });

    let list = Array.from(map.values());
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q));
    }
    return list.sort((a, b) => b.roles - a.roles);
  }, [apps, query]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {companies.map((c) => (
        <button
          key={c.name}
          type="button"
          onClick={() => {
            const app = apps.find((a) => a.company === c.name);
            if (app) select(app.id);
          }}
          className="group rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <Avatar name={c.name} color={c.color} />
            <div className="min-w-0 flex-1">
              <div className="truncate font-semibold group-hover:text-primary transition-colors">
                {c.name}
              </div>
              <div className="text-xs text-faint">
                {c.roles} application{c.roles > 1 ? "s" : ""}
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <Badge
              className={
                STATUS_COLORS[c.best] ?? "bg-muted text-muted-foreground"
              }
            >
              {c.best}
            </Badge>
            {c.salaryMax > 0 && (
              <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                Up to {fmtMoney(c.salaryMax)}
              </Badge>
            )}
          </div>
        </button>
      ))}
      {companies.length === 0 && (
        <div className="col-span-full rounded-2xl border border-dashed border-border p-12 text-center text-sm text-faint">
          No companies found matching your search.
        </div>
      )}
    </div>
  );
}
