"use client";
import { motion } from "framer-motion";
import { Badge } from "./ui";
import { STATUS_COLORS } from "@/lib/types";

export function StatusPill({ status }: { status: string }) {
  return (
    <motion.span layout layoutId={`status-${status}`} transition={{ duration: 0.2 }}>
      <Badge className={STATUS_COLORS[status] ?? "bg-muted text-muted-foreground"}>
        {status}
      </Badge>
    </motion.span>
  );
}
