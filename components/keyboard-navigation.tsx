"use client";
import { useEffect } from "react";
import { useStore } from "@/lib/store";

function isInputActive() {
  const tag = document.activeElement?.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

export function KeyboardNavigation() {
  const {
    applications,
    selectedId,
    drawerOpen,
    formOpen,
    select,
    openForm,
    closeForm,
  } = useStore();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Don't intercept when typing in inputs
      if (isInputActive()) return;
      // Don't intercept Cmd+K (handled by command palette)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") return;

      switch (e.key) {
        case "n":
        case "N": {
          if (!formOpen && !e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            openForm();
          }
          break;
        }

        case "Escape": {
          if (formOpen) {
            closeForm();
          } else if (drawerOpen) {
            select(null);
          }
          break;
        }

        case "j":
        case "ArrowDown": {
          if (drawerOpen || formOpen) return;
          e.preventDefault();
          const activeApps = applications.filter(
            (a) => !["Rejected"].includes(a.status)
          );
          if (activeApps.length === 0) return;
          const currentIdx = activeApps.findIndex(
            (a) => a.id === selectedId
          );
          const nextIdx =
            currentIdx < 0 ? 0 : (currentIdx + 1) % activeApps.length;
          select(activeApps[nextIdx].id);
          break;
        }

        case "k":
        case "ArrowUp": {
          if (drawerOpen || formOpen) return;
          e.preventDefault();
          const activeApps = applications.filter(
            (a) => !["Rejected"].includes(a.status)
          );
          if (activeApps.length === 0) return;
          const currentIdx = activeApps.findIndex(
            (a) => a.id === selectedId
          );
          const prevIdx =
            currentIdx <= 0
              ? activeApps.length - 1
              : currentIdx - 1;
          select(activeApps[prevIdx].id);
          break;
        }

        case "Enter": {
          if (drawerOpen || formOpen) return;
          if (selectedId) {
            e.preventDefault();
            select(selectedId); // Opens drawer
          }
          break;
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [
    applications,
    selectedId,
    drawerOpen,
    formOpen,
    select,
    openForm,
    closeForm,
  ]);

  return null; // Pure side-effect component
}
