import React from "react";

export function StatCard({
  icon,
  label,
  value,
  trend,
  color,
  ring,
}: {
  icon: string;
  label: string;
  value: string | number;
  trend?: string;
  color?: string;
  ring?: { value: number; color: string };
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${
          color || "bg-primary/10 text-primary"
        }`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-2xl font-bold leading-none">{value}</div>
        <div className="mt-1 truncate text-xs text-faint">{label}</div>
        {trend && (
          <div className="mt-0.5 truncate text-[11px] text-muted-foreground">
            {trend}
          </div>
        )}
      </div>
      {ring && <ProgressRingInline value={ring.value} color={ring.color} />}
    </div>
  );
}

function ProgressRingInline({
  value,
  color,
}: {
  value: number;
  color: string;
}) {
  const size = 44;
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <svg width={size} height={size} className="-rotate-90 shrink-0">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        strokeWidth={stroke}
        className="text-muted stroke-current opacity-40"
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
        strokeDashoffset={c - (clamped / 100) * c}
        className="transition-all duration-700"
      />
    </svg>
  );
}
