import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MOCK_APPLICATIONS } from "./data";
import type { Application, Status, ViewMode } from "./types";
import { uid } from "./utils";

interface AppState {
  applications: Application[];
  selectedId: string | null;
  editingId: string | null;
  formOpen: boolean;
  drawerOpen: boolean;
  query: string;
  viewMode: ViewMode;
  setQuery: (q: string) => void;
  setViewMode: (v: ViewMode) => void;
  add: (
    a: Omit<Application, "id" | "timeline" | "interviews" | "logoColor"> & {
      logoColor?: string;
    }
  ) => void;
  update: (id: string, patch: Partial<Application>) => void;
  remove: (id: string) => void;
  setStatus: (id: string, status: Status) => void;
  select: (id: string | null) => void;
  openForm: (id?: string) => void;
  closeForm: () => void;
  reset: () => void;
}

const initial = MOCK_APPLICATIONS;

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      applications: initial,
      selectedId: null,
      editingId: null,
      formOpen: false,
      drawerOpen: false,
      query: "",
      viewMode: "grid",
      setQuery: (query) => set({ query }),
      setViewMode: (viewMode) => set({ viewMode }),
      add: (a) =>
        set((s) => ({
          applications: [
            {
              ...a,
              id: uid(),
              logoColor:
                a.logoColor ??
                "#" +
                  Math.floor(Math.random() * 0xffffff)
                    .toString(16)
                    .padStart(6, "0"),
              appliedDate: a.appliedDate || new Date().toISOString(),
              timeline: [
                {
                  label: "Saved",
                  date:
                    a.status !== "Saved"
                      ? new Date(Date.now() - 86400000).toISOString()
                      : new Date().toISOString(),
                  done: true,
                },
                {
                  label: "Applied",
                  date: a.status !== "Saved" ? new Date().toISOString() : "",
                  done: a.status !== "Saved",
                },
                { label: "Recruiter Screen", date: "", done: false },
                { label: "Technical Interview", date: "", done: false },
                { label: "Final Interview", date: "", done: false },
                { label: "Offer", date: "", done: false },
              ],
              interviews: [],
            },
            ...s.applications,
          ],
        })),
      update: (id, patch) =>
        set((s) => ({
          applications: s.applications.map((a) =>
            a.id === id ? { ...a, ...patch } : a
          ),
        })),
      remove: (id) =>
        set((s) => ({
          applications: s.applications.filter((a) => a.id !== id),
          selectedId: s.selectedId === id ? null : s.selectedId,
          drawerOpen: s.selectedId === id ? false : s.drawerOpen,
        })),
      setStatus: (id, status) =>
        set((s) => ({
          applications: s.applications.map((a) => {
            if (a.id !== id || a.status === status) return a;
            const timeline = [...a.timeline];
            const stageOrder: Record<Status, number> = {
              Saved: 0,
              Applied: 1,
              Screening: 2,
              Interview: 3,
              "Final Round": 4,
              Offer: 5,
              Rejected: 5,
            };
            const idx = stageOrder[status] ?? 0;
            timeline.forEach((e, i) => {
              if (i <= idx && !e.done) {
                e.done = true;
                e.date = new Date().toISOString();
              }
            });
            return { ...a, status, timeline };
          }),
        })),
      select: (id) => set({ selectedId: id, drawerOpen: id != null }),
      openForm: (id) => set({ formOpen: true, editingId: id ?? null }),
      closeForm: () => set({ formOpen: false, editingId: null }),
      reset: () => set({ applications: initial }),
    }),
    { name: "applyflow-store-v1" }
  )
);
