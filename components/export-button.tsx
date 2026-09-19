"use client";
import { useStore } from "@/lib/store";
import { downloadCSV, fmtDate } from "@/lib/utils";
import { Button } from "./ui";

export function ExportButton() {
  const apps = useStore((s) => s.applications);

  return (
    <Button
      variant="secondary"
      onClick={() =>
        downloadCSV(
          "oxtrack-export.csv",
          apps.map((a) => ({
            company: a.company,
            role: a.role,
            status: a.status,
            location: a.location,
            source: a.source ?? "Direct",
            salaryMin: a.salaryMin ?? "",
            salaryMax: a.salaryMax ?? "",
            applied: fmtDate(a.appliedDate),
            notes: a.notes,
            link: a.jobUrl || a.link || "",
          }))
        )
      }
    >
      <span>⬇</span> Export CSV
    </Button>
  );
}
