"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useStore } from "@/lib/store";
import { STATUSES, type Status } from "@/lib/types";
import { cn } from "@/lib/utils";
import { backdrop, scaleIn } from "@/lib/motion";

const empty = {
  company: "",
  role: "",
  location: "",
  remote: true,
  salaryMin: 0,
  salaryMax: 0,
  status: "Saved" as Status,
  jobUrl: "",
  notes: "",
  nextAction: "",
  description: "",
  recruiterName: "",
  recruiterEmail: "",
};

const inputCls =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10";

export function AppForm() {
  const {
    applications,
    formOpen,
    editingId,
    closeForm,
    add,
    update,
  } = useStore();

  const editing = applications.find((a) => a.id === editingId);

  const [f, setF] = useState(empty);

  useEffect(() => {
    if (editing) {
      setF({
        ...empty,
        company: editing.company,
        role: editing.role,
        location: editing.location,
        remote: editing.remote,
        salaryMin: editing.salaryMin,
        salaryMax: editing.salaryMax,
        status: editing.status,
        jobUrl: editing.jobUrl || "",
        notes: editing.notes,
        nextAction: editing.nextAction || "",
        description: editing.description,
        recruiterName: editing.recruiter?.name ?? "",
        recruiterEmail: editing.recruiter?.email ?? "",
      });
    } else {
      setF(empty);
    }
  }, [editing, formOpen]);

  const set = <K extends keyof typeof empty>(
    key: K,
    value: (typeof empty)[K]
  ) => {
    setF((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!f.company.trim() || !f.role.trim()) return;

    const payload = {
      company: f.company.trim(),
      role: f.role.trim(),
      location: f.location.trim(),
      remote: f.remote,
      salaryMin: Number(f.salaryMin) || 0,
      salaryMax: Number(f.salaryMax) || 0,
      status: f.status,
      jobUrl: f.jobUrl.trim(),
      notes: f.notes.trim(),
      nextAction: f.nextAction.trim(),
      description: f.description.trim(),
      recruiter: f.recruiterName.trim()
        ? {
            name: f.recruiterName.trim(),
            email: f.recruiterEmail.trim(),
          }
        : undefined,
      appliedDate: editing?.appliedDate || new Date().toISOString(),
    };

    if (editing) {
      update(editing.id, payload);
    } else {
      add(payload);
    }

    closeForm();
  };

  return (
    <AnimatePresence>
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={closeForm}
          />

          <motion.form
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={submit}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="text-lg font-bold">
                {editing ? "Edit application" : "New application"}
              </h2>

              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg p-1.5 text-faint hover:bg-muted hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <Field label="Company *" className="col-span-2">
                <input
                  required
                  value={f.company}
                  onChange={(e) => set("company", e.target.value)}
                  placeholder="Vercel"
                  className={inputCls}
                  autoFocus
                />
              </Field>

              <Field label="Role *" className="col-span-2">
                <input
                  required
                  value={f.role}
                  onChange={(e) => set("role", e.target.value)}
                  placeholder="Software Engineer"
                  className={inputCls}
                />
              </Field>

              <Field label="Status" className="col-span-2">
                <div className="flex flex-wrap gap-1.5">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => set("status", s)}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-medium",
                        f.status === s
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground hover:bg-muted/70"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Location">
                <input
                  value={f.location}
                  onChange={(e) => set("location", e.target.value)}
                  placeholder="Bangalore, India"
                  className={inputCls}
                />
              </Field>

              <Field label="Salary range">
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={f.salaryMin || ""}
                    onChange={(e) =>
                      set("salaryMin", Number(e.target.value))
                    }
                    placeholder="Min"
                    className={inputCls}
                  />

                  <input
                    type="number"
                    value={f.salaryMax || ""}
                    onChange={(e) =>
                      set("salaryMax", Number(e.target.value))
                    }
                    placeholder="Max"
                    className={inputCls}
                  />
                </div>
              </Field>

              <label className="col-span-2 flex cursor-pointer select-none items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={f.remote}
                  onChange={(e) => set("remote", e.target.checked)}
                  className="h-4 w-4 rounded border-border accent-indigo-600"
                />
                <span className="font-medium">Remote friendly</span>
              </label>

              <Field label="Recruiter name">
                <input
                  value={f.recruiterName}
                  onChange={(e) =>
                    set("recruiterName", e.target.value)
                  }
                  placeholder="Sarah Kim"
                  className={inputCls}
                />
              </Field>

              <Field label="Recruiter email">
                <input
                  type="email"
                  value={f.recruiterEmail}
                  onChange={(e) =>
                    set("recruiterEmail", e.target.value)
                  }
                  placeholder="sarah@company.com"
                  className={inputCls}
                />
              </Field>

              <Field label="Job URL" className="col-span-2">
                <input
                  value={f.jobUrl}
                  onChange={(e) => set("jobUrl", e.target.value)}
                  placeholder="https://..."
                  className={inputCls}
                />
              </Field>

              <Field label="Notes" className="col-span-2">
                <textarea
                  value={f.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  rows={2}
                  placeholder="Notes about interview rounds, referrals, take-homes..."
                  className={cn(inputCls, "resize-none")}
                />
              </Field>

              <Field label="Next action" className="col-span-2">
                <input
                  value={f.nextAction}
                  onChange={(e) =>
                    set("nextAction", e.target.value)
                  }
                  placeholder="Follow up Thursday"
                  className={inputCls}
                />
              </Field>

              <Field label="Role description" className="col-span-2">
                <textarea
                  value={f.description}
                  onChange={(e) =>
                    set("description", e.target.value)
                  }
                  rows={2}
                  placeholder="Overview of the role and responsibilities..."
                  className={cn(inputCls, "resize-none")}
                />
              </Field>
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t border-border pt-4">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary/90"
              >
                {editing ? "Save changes" : "Add application"}
              </button>
            </div>
          </motion.form>
        </div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-xs font-medium text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}