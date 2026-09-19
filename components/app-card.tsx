"use client";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import type { Application } from "@/lib/types";
import { cn, timeAgo, fmtMoney } from "@/lib/utils";
import { Avatar } from "./ui";
import { StatusPill } from "./status-pill";
import { Draggable } from "./kanban-dnd";
import { cardHover, cardTap } from "@/lib/motion";

export function AppCard({ app }: { app: Application }) {
  const select = useStore((s) => s.select);
  const selected = useStore((s) => s.selectedId === app.id);

  return (
    <Draggable id={app.id}>
      {(dragging) => (
        <motion.button
          layout
          layoutId={`card-${app.id}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4, transition: { duration: 0.15 } }}
          whileHover={cardHover}
          whileTap={cardTap}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          type="button"
          onClick={() => select(app.id)}
          className={cn(
            "group w-full rounded-xl border border-border bg-card p-3 text-left shadow-sm transition-shadow hover:border-primary/40 hover:shadow-md active:shadow-sm",
            selected && "border-primary/60 ring-2 ring-primary/20",
            dragging && "rotate-2 opacity-90 shadow-xl scale-[1.02] z-50"
          )}
        >
          <div className="flex items-start gap-3">
            <Avatar name={app.company} color={app.logoColor} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <div className="truncate text-sm font-semibold">{app.company}</div>
                <StatusPill status={app.status} />
              </div>
              <div className="truncate text-xs text-faint">{app.role}</div>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-faint">
            <div className="flex items-center gap-1.5 overflow-hidden">
              {app.remote && (
                <span className="rounded bg-primary/10 px-1.5 py-0.5 font-medium text-primary shrink-0">
                  Remote
                </span>
              )}
              <span className="truncate">{app.location}</span>
            </div>
            <span className="shrink-0">{timeAgo(app.appliedDate)}</span>
          </div>
          {app.salaryMin > 0 && (
            <div className="mt-1.5 text-[11px] font-medium text-muted-foreground">
              {fmtMoney(app.salaryMin)} – {fmtMoney(app.salaryMax)}
            </div>
          )}
        </motion.button>
      )}
    </Draggable>
  );
}
