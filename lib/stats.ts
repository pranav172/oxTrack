import type { Application, Status } from "./types";
import { STATUSES } from "./types";

export function computeStats(apps: Application[]) {
  const now = new Date();
  const thisMonth = apps.filter((a) => {
    const d = new Date(a.appliedDate);
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  });

  const interviews = apps.filter((a) =>
    ["Interview", "Final Round", "Offer"].includes(a.status)
  );
  const offers = apps.filter((a) => a.status === "Offer");
  const rejections = apps.filter((a) => a.status === "Rejected");
  const applied = apps.filter((a) => a.status !== "Saved");
  const responses = applied.filter((a) => !["Applied"].includes(a.status));
  const responseRate = applied.length
    ? Math.round((responses.length / applied.length) * 100)
    : 0;
  const interviewRate = applied.length
    ? Math.round((interviews.length / applied.length) * 100)
    : 0;

  const byStatus: Record<string, number> = {};
  STATUSES.forEach((s) => {
    byStatus[s] = apps.filter((a) => a.status === s).length;
  });

  const byStatusList = STATUSES.map((s) => ({
    status: s,
    count: byStatus[s],
  }));

  // activity: last 12 weeks count array
  const activityWeeks: { label: string; count: number }[] = [];
  const activity: number[] = [];

  for (let i = 11; i >= 0; i--) {
    const start = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - i * 7 - 6
    );
    const end = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - i * 7
    );
    const count = apps.filter((a) => {
      const d = new Date(a.appliedDate);
      return d >= start && d <= end;
    }).length;

    activity.push(count);
    activityWeeks.push({
      label: i === 0 ? "Now" : `${Math.round(i)}w`,
      count,
    });
  }

  const byLocation: { name: string; count: number }[] = [];
  for (const a of apps) {
    const key = a.remote
      ? "Remote"
      : a.location.split(",")[1]?.trim() || a.location || "Other";
    const found = byLocation.find((l) => l.name === key);
    if (found) found.count++;
    else byLocation.push({ name: key, count: 1 });
  }
  byLocation.sort((x, y) => y.count - x.count);

  // avg days between Applied -> Interview
  const gaps: number[] = [];
  for (const a of apps) {
    const appliedEv = a.timeline.find((e) => e.label === "Applied" && e.done);
    const interviewEv = a.timeline.find(
      (e) => e.label === "Recruiter Screen" && e.done && e.date
    );
    if (appliedEv?.date && interviewEv?.date) {
      const days = Math.round(
        (new Date(interviewEv.date).getTime() -
          new Date(appliedEv.date).getTime()) /
          86400000
      );
      if (days >= 0) gaps.push(days);
    }
  }
  const avgResponse = gaps.length
    ? Math.round(gaps.reduce((s, g) => s + g, 0) / gaps.length)
    : 0;

  return {
    total: apps.length,
    thisMonth: thisMonth.length,
    active: apps.filter((a) => !["Rejected", "Offer"].includes(a.status)).length,
    interviews: interviews.length,
    offers: offers.length,
    rejected: rejections.length,
    responseRate,
    interviewRate,
    avgResponse,
    byStatus,
    byStatusList,
    activity,
    activityWeeks,
    byLocation: byLocation.slice(0, 6),
  };
}

export const stats = computeStats;
