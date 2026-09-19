import React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Avatar({ name, color }: { name: string; color: string }) {
  return (
    <div
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white shadow-sm ring-1 ring-black/10"
      style={{ backgroundColor: color }}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

export function ProgressRing({
  value,
  size = 64,
  stroke = 6,
  color = "#6366f1",
  label,
}: {
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  label?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          className="text-muted opacity-50"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (Math.min(100, Math.max(0, value)) / 100) * c}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-sm font-bold">{value}%</div>
        {label && <div className="text-[10px] text-faint">{label}</div>}
      </div>
    </div>
  );
}

export function Sparkline({
  data,
  color = "#6366f1",
  w = 120,
  h = 36,
}: {
  data: number[];
  color?: string;
  w?: number;
  h?: number;
}) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data, 1);
  const len = Math.max(data.length - 1, 1);
  const pts = data
    .map(
      (v, i) => `${(i / len) * w},${h - (v / max) * (h - 8) - 4}`
    )
    .join(" ");

  const lastY = h - (data[data.length - 1] / max) * (h - 8) - 4;

  return (
    <svg
      width={w}
      height={h}
      className="overflow-visible"
      viewBox={`0 0 ${w} ${h}`}
    >
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill="url(#spark)" />
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={w} cy={lastY} r="3" fill={color} />
    </svg>
  );
}

export function EmptyState({
  icon = "🗂️",
  title,
  hint,
  action,
}: {
  icon?: string;
  title: string;
  hint?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
      <div className="text-4xl opacity-50">{icon}</div>
      <div className="text-base font-semibold">{title}</div>
      {hint && <div className="max-w-sm text-sm text-faint">{hint}</div>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}) {
  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary/90 shadow-sm border border-transparent",
    secondary:
      "bg-muted text-foreground hover:bg-muted/80 border border-border",
    outline:
      "bg-transparent text-foreground hover:bg-muted border border-border",
    danger:
      "bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900",
    ghost: "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
  };

  const sizes = {
    sm: "px-2.5 py-1 text-xs rounded-md",
    md: "px-3.5 py-1.5 text-sm rounded-lg font-medium",
    lg: "px-4 py-2 text-base rounded-xl font-medium",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
