"use client";
import { useStore } from "@/lib/store";

export function AddButton() {
  const openForm = useStore((s) => s.openForm);
  return (
    <button
      onClick={() => openForm()}
      className="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-1.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-95"
    >
      <span className="text-base leading-none font-bold">+</span>
      <span>Add</span>
    </button>
  );
}
