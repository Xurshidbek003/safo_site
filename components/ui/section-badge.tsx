import type { ReactNode } from "react";

type SectionBadgeProps = {
  children: ReactNode;
  dark?: boolean;
};

export function SectionBadge({
  children,
  dark = false,
}: SectionBadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] backdrop-blur-md",
        dark
          ? "border border-slate-200 bg-white text-sky-800"
          : "border border-white/20 bg-white/10 text-sky-100",
      ].join(" ")}
    >
      {children}
    </span>
  );
}