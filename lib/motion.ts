import type { Variants, Transition } from "framer-motion";

// ── Reusable easing ──
const smoothEase = [0.22, 1, 0.36, 1] as const;

// ── Page / section entrance ──
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: smoothEase },
  },
};

// ── Modal / palette entrance ──
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 6 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 32 },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 6,
    transition: { duration: 0.15, ease: smoothEase },
  },
};

// ── Backdrop ──
export const backdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

// ── Drawer slide from right ──
export const drawer: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 420, damping: 40 },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.22, ease: smoothEase },
  },
};

// ── Stagger container ──
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045 },
  },
};

// ── Stagger item (generic child) ──
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: smoothEase },
  },
};

// ── Timeline checkpoint pulse ──
export const checkpointPulse: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 500, damping: 25 },
  },
};

// ── Shared spring for physical interactions (drag, tap) ──
export const springTransition: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 35,
};

// ── Card hover / tap presets ──
export const cardHover = { y: -2, transition: { duration: 0.15 } };
export const cardTap = { scale: 0.985 };

// ── Bar chart grow ──
export const barGrow = (delay: number = 0): Variants => ({
  hidden: { width: 0 },
  visible: {
    width: "var(--bar-width)",
    transition: { duration: 0.6, ease: smoothEase, delay },
  },
});
