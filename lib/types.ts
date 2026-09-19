export type Status =
  | "Saved"
  | "Applied"
  | "Screening"
  | "Interview"
  | "Final Round"
  | "Offer"
  | "Rejected";

export const STATUSES: Status[] = [
  "Saved",
  "Applied",
  "Screening",
  "Interview",
  "Final Round",
  "Offer",
  "Rejected",
];

export const STATUS_COLORS: Record<string, string> = {
  Saved: "bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300 border border-slate-200 dark:border-slate-700",
  Applied: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800",
  Screening: "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800",
  Interview: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800",
  "Final Round": "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800",
  Offer: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800",
  Rejected: "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800",
};

export const STATUS_ICONS: Record<string, string> = {
  Saved: "🔖",
  Applied: "📨",
  Screening: "📞",
  Interview: "💼",
  "Final Round": "🎯",
  Offer: "🎉",
  Rejected: "✕",
};

export interface TimelineEvent {
  date: string;
  label: string;
  done: boolean;
}

export interface Interview {
  id?: string;
  date: string; // ISO string
  type: string; // "Recruiter Screen", "Technical", etc.
  withWhom: string;
  completed: boolean;
  focus?: string;
}

export interface ApplicationEvent {
  id: string;
  date: string;
  text: string;
  type: string;
}

export interface Application {
  id: string;
  company: string;
  logoColor: string; // hex color
  role: string;
  location: string;
  remote: boolean;
  salaryMin: number;
  salaryMax: number;
  appliedDate: string; // ISO string
  status: Status;
  jobUrl?: string;
  link?: string;
  source?: string;
  priority?: boolean;
  recruiter?: {
    name: string;
    email: string;
  };
  notes: string;
  nextAction?: string;
  description?: string;
  timeline: TimelineEvent[];
  interviews: Interview[];
  events?: ApplicationEvent[];
}

export type ViewMode = "grid" | "table";
