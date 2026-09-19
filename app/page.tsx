"use client";
import { useStore } from "@/lib/store";
import { Board } from "@/components/board";
import { AppDrawer } from "@/components/app-drawer";
import { AppForm } from "@/components/app-form";
import { EmptyState } from "@/components/empty-state";
import { PromptOfDay } from "@/components/prompt-of-day";

export default function PipelinePage() {
  const apps = useStore((s) => s.applications);

  return (
    <div className="flex flex-col gap-5">
      <PromptOfDay />
      {apps.length === 0 ? <EmptyState /> : <Board />}
      <AppDrawer />
      <AppForm />
    </div>
  );
}
