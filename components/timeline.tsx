"use client";
import { motion } from "framer-motion";
import type { Application } from "@/lib/types";
import { cn, fmtDate } from "@/lib/utils";
import { checkpointPulse, staggerContainer, staggerItem } from "@/lib/motion";

export function Timeline({ app }: { app: Application }) {
  return (
    <section>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-faint">
        Pipeline
      </h3>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative ml-1.5 border-l-2 border-border pl-5"
      >
        {app.timeline.map((ev, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            className="relative pb-4 last:pb-0"
          >
            {/* Checkpoint circle */}
            <motion.span
              variants={ev.done ? checkpointPulse : undefined}
              initial={ev.done ? "hidden" : undefined}
              animate={ev.done ? "visible" : undefined}
              className={cn(
                "absolute -left-[27px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors",
                ev.done
                  ? "border-primary bg-primary"
                  : "border-border bg-card"
              )}
            >
              {ev.done && (
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              )}
            </motion.span>
            <div
              className={cn(
                "text-sm font-medium",
                !ev.done && "text-faint"
              )}
            >
              {ev.label}
            </div>
            {ev.date && (
              <div className="text-xs text-faint">{fmtDate(ev.date)}</div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
