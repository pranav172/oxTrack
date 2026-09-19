"use client";
import { useMemo } from "react";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";
import { STATUSES, STATUS_ICONS } from "@/lib/types";
import { AppCard } from "./app-card";
import { DndProvider, DropZone } from "./kanban-dnd";
import { EmptyState } from "./ui";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function KanbanBoard() {
  const apps = useStore((s) => s.applications);
  const query = useStore((s) => s.query);
  const openForm = useStore((s) => s.openForm);

  const filteredApps = useMemo(() => {
    if (!query.trim()) return apps;
    const q = query.toLowerCase();
    return apps.filter(
      (a) =>
        a.company.toLowerCase().includes(q) ||
        a.role.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q) ||
        a.notes.toLowerCase().includes(q)
    );
  }, [apps, query]);

  const columns = useMemo(
    () =>
      STATUSES.map((status) => ({
        status,
        items: filteredApps.filter((a) => a.status === status),
      })),
    [filteredApps]
  );

  return (
    <DndProvider>
      <LayoutGroup>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex gap-4 overflow-x-auto pb-4 pt-1"
        >
          {columns.map(({ status, items }) => (
            <motion.div
              key={status}
              variants={fadeUp}
              className="flex w-72 shrink-0 flex-col gap-3"
            >
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span>{STATUS_ICONS[status] || "•"}</span>
                  <span>{status}</span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-faint font-medium">
                    {items.length}
                  </span>
                </div>
              </div>
              <DropZone status={status}>
                <div className="flex min-h-[500px] flex-col gap-2.5 rounded-2xl bg-muted/40 p-2.5 border border-border/50">
                  <AnimatePresence mode="popLayout">
                    {items.map((a) => (
                      <AppCard key={a.id} app={a} />
                    ))}
                  </AnimatePresence>
                  {items.length === 0 && (
                    <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-xs text-faint">
                      Drop cards here
                    </div>
                  )}
                </div>
              </DropZone>
            </motion.div>
          ))}
        </motion.div>
      </LayoutGroup>
      {apps.length === 0 && (
        <EmptyState
          icon="🗂️"
          title="No applications yet"
          hint="Add your first job application to start tracking your pipeline."
          action={
            <button
              onClick={() => openForm()}
              className="mt-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 shadow-sm"
            >
              + Add application
            </button>
          }
        />
      )}
    </DndProvider>
  );
}
