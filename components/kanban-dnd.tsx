"use client";
import { createContext, useContext, useState } from "react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { Status } from "@/lib/types";

const DragCtx = createContext<{
  id: string | null;
  set: (id: string | null) => void;
}>({ id: null, set: () => {} });

export function DndProvider({ children }: { children: React.ReactNode }) {
  const [id, set] = useState<string | null>(null);

  return (
    <DragCtx.Provider value={{ id, set }}>
      <div onDragOver={(e) => e.preventDefault()} onDrop={() => set(null)}>
        {children}
      </div>
    </DragCtx.Provider>
  );
}

export function Draggable({
  id,
  children,
}: {
  id: string;
  children: (dragging: boolean) => React.ReactNode;
}) {
  const { id: active, set } = useContext(DragCtx);
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        set(id);
      }}
      onDragEnd={() => set(null)}
      className={active === id ? "opacity-60" : undefined}
    >
      {children(active === id)}
    </div>
  );
}

export function DropZone({
  status,
  children,
}: {
  status: string;
  children: React.ReactNode;
}) {
  const { id, set } = useContext(DragCtx);
  const setStatus = useStore((s) => s.setStatus);
  const [over, setOver] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        if (id) {
          setStatus(id, status as Status);
          set(null);
        }
        setOver(false);
      }}
      className={cn(
        "min-h-full rounded-2xl transition-colors",
        over && id && "bg-primary/5 ring-2 ring-inset ring-primary/40"
      )}
    >
      {children}
    </div>
  );
}
