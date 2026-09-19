"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Pipeline", icon: "▚" },
  { href: "/analytics", label: "Analytics", icon: "◔" },
  { href: "/interviews", label: "Interviews", icon: "🎤" },
  { href: "/companies", label: "Companies", icon: "🏢" },
];

export function Sidebar() {
  const pathname = usePathname();
  const apps = useStore((s) => s.applications);

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 flex-col border-r border-border bg-card p-4 md:flex">
      <div className="flex items-center gap-2.5 px-2 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-black text-white shadow-md">
          O
        </div>
        <div>
          <div className="text-sm font-bold tracking-tight leading-none">OxTrack</div>
          <div className="text-[11px] text-faint mt-0.5">job hunt CRM</div>
        </div>
      </div>

      <nav className="mt-6 flex flex-col gap-1">
        {NAV.map((n) => {
          const isActive = pathname === n.href;
          return (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all",
                isActive
                  ? "bg-primary/10 text-primary font-semibold shadow-xs"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span className="w-4 text-center opacity-80">{n.icon}</span>
              <span>{n.label}</span>
              {n.href === "/" && apps.some((a) => a.nextAction) && (
                <span className="ml-auto h-2 w-2 rounded-full bg-primary ring-2 ring-primary/20" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-primary/15 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent p-3.5 text-xs">
        <div className="font-semibold text-foreground flex items-center gap-1.5">
          <span>💡</span> Pro Tip
        </div>
        <p className="mt-1.5 text-muted-foreground leading-relaxed">
          Follow up 5–7 days after applying. Consistent, personalized follow-ups can double interview conversion rates.
        </p>
      </div>
    </aside>
  );
}
