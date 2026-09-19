"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Pipeline", icon: "▚" },
  { href: "/analytics", label: "Stats", icon: "◔" },
  { href: "/interviews", label: "Prep", icon: "🎤" },
  { href: "/companies", label: "Cos", icon: "🏢" },
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-border bg-card/95 backdrop-blur md:hidden">
      {NAV.map((n) => {
        const active = pathname === n.href;
        return (
          <Link
            key={n.href}
            href={n.href}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
              active ? "text-primary font-semibold" : "text-faint hover:text-foreground"
            )}
          >
            <span className="text-base leading-none">{n.icon}</span>
            <span>{n.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
