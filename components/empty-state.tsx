"use client";
import { useStore } from "@/lib/store";

export function EmptyState() {
  const openForm = useStore((s) => s.openForm);
  const reset = useStore((s) => s.reset);

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
      <div className="text-5xl mb-3">📋</div>
      <h3 className="text-lg font-bold">Your pipeline is empty</h3>
      <p className="mt-1 max-w-sm text-sm text-faint">
        Start tracking your job search by adding applications or load realistic demo data.
      </p>
      <div className="mt-5 flex gap-3">
        <button
          onClick={() => openForm()}
          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 shadow-sm transition-all"
        >
          + Add Application
        </button>
        <button
          onClick={() => reset()}
          className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-all"
        >
          Load Demo Data
        </button>
      </div>
    </div>
  );
}
