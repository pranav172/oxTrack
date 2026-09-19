"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";
import { STATUSES, STATUS_COLORS } from "@/lib/types";
import { cn, fmtMoney, timeAgo, fmtDate } from "@/lib/utils";
import { Avatar } from "./ui";
import { StatusPill } from "./status-pill";
import { Timeline } from "./timeline";
import {
  backdrop,
  drawer as drawerVariants,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";

export function AppDrawer() {
  const {
    applications,
    selectedId,
    drawerOpen,
    select,
    setStatus,
    remove,
    openForm,
  } = useStore();
  const app = applications.find((a) => a.id === selectedId);

  const url = app?.jobUrl || app?.link;

  return (
    <AnimatePresence>
      {drawerOpen && app && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={() => select(null)}
          />

          {/* Drawer panel */}
          <motion.aside
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative flex w-full max-w-md flex-col overflow-y-auto border-l border-border bg-card shadow-2xl"
          >
            {/* Sticky header */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-border bg-card/95 p-5 backdrop-blur">
              <div className="flex items-start gap-3">
                <Avatar name={app.company} color={app.logoColor} />
                <div>
                  <div className="text-lg font-bold leading-tight">
                    {app.company}
                  </div>
                  <div className="text-sm text-faint">{app.role}</div>
                  <div className="mt-2">
                    <StatusPill status={app.status} />
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => select(null)}
                className="rounded-lg p-1.5 text-faint hover:bg-muted hover:text-foreground transition-colors"
              >
                ✕
              </motion.button>
            </div>

            {/* Staggered drawer content */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-5 p-5"
            >
              {/* Quick status switch */}
              <motion.section variants={staggerItem}>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-faint">
                  Move to stage
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {STATUSES.map((s) => (
                    <motion.button
                      key={s}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setStatus(app.id, s)}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                        app.status === s
                          ? STATUS_COLORS[s]
                          : "bg-muted text-muted-foreground hover:bg-muted/70"
                      )}
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
              </motion.section>

              <motion.div variants={staggerItem}>
                <Timeline app={app} />
              </motion.div>

              {app.interviews && app.interviews.length > 0 && (
                <motion.section variants={staggerItem}>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-faint">
                    Interviews
                  </h3>
                  <div className="flex flex-col gap-2">
                    {app.interviews.map((iv, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.2 }}
                        className="flex items-center justify-between rounded-lg border border-border bg-background p-3 text-sm"
                      >
                        <div>
                          <div className="font-medium">{iv.type}</div>
                          <div className="text-xs text-faint">
                            with {iv.withWhom || "Interviewer"}
                          </div>
                          {iv.focus && (
                            <div className="mt-1 text-[11px] text-primary/80">
                              Focus: {iv.focus}
                            </div>
                          )}
                        </div>
                        <div className="text-right text-xs">
                          <div
                            className={cn(
                              "font-medium",
                              iv.completed
                                ? "text-emerald-600"
                                : "text-primary"
                            )}
                          >
                            {iv.completed ? "Completed" : "Upcoming"}
                          </div>
                          <div className="text-faint">{fmtDate(iv.date)}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}

              <motion.section
                variants={staggerItem}
                className="grid grid-cols-2 gap-3 text-sm"
              >
                <Info
                  label="Location"
                  value={`${app.location || "Not specified"}${
                    app.remote ? " · Remote" : ""
                  }`}
                />
                <Info
                  label="Salary"
                  value={
                    app.salaryMin
                      ? `${fmtMoney(app.salaryMin)} – ${fmtMoney(
                          app.salaryMax
                        )}`
                      : "—"
                  }
                />
                <Info
                  label="Applied"
                  value={`${timeAgo(app.appliedDate)} · ${fmtDate(
                    app.appliedDate
                  )}`}
                />
                <Info
                  label="Recruiter"
                  value={app.recruiter ? `${app.recruiter.name}` : "—"}
                />
              </motion.section>

              {app.recruiter?.email && (
                <motion.a
                  variants={staggerItem}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  href={`mailto:${app.recruiter.email}`}
                  className="rounded-lg border border-border px-3 py-2 text-center text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
                >
                  ✉️ Email {app.recruiter.name}
                </motion.a>
              )}

              {url && (
                <motion.a
                  variants={staggerItem}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-border px-3 py-2 text-center text-sm font-medium hover:bg-muted transition-colors"
                >
                  🔗 View job posting
                </motion.a>
              )}

              {app.notes && (
                <motion.section variants={staggerItem}>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-faint">
                    Notes
                  </h3>
                  <p className="rounded-lg bg-muted/50 p-3 text-sm leading-relaxed whitespace-pre-wrap">
                    {app.notes}
                  </p>
                </motion.section>
              )}

              {app.nextAction && (
                <motion.section
                  variants={staggerItem}
                  className="rounded-lg border border-primary/30 bg-primary/5 p-3"
                >
                  <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Next action
                  </div>
                  <div className="mt-1 text-sm font-medium">
                    {app.nextAction}
                  </div>
                </motion.section>
              )}

              {app.description && (
                <motion.section variants={staggerItem}>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-faint">
                    Role Description
                  </h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                    {app.description}
                  </p>
                </motion.section>
              )}

              <motion.div
                variants={staggerItem}
                className="mt-2 flex gap-2 border-t border-border pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    openForm(app.id);
                    select(null);
                  }}
                  className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    if (confirm(`Remove ${app.company}?`)) remove(app.id);
                  }}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950 transition-colors"
                >
                  Delete
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-faint">
        {label}
      </div>
      <div className="mt-0.5 text-sm font-medium">{value}</div>
    </div>
  );
}
