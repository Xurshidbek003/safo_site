"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, Sparkles } from "lucide-react";

export default function AssistantFloatingButton() {
  const pathname = usePathname();

  if (pathname === "/assistant") return null;

  return (
    <div className="fixed bottom-10 right-10 z-[90]">
      <Link
        href="/assistant"
        aria-label="Safo AI yordamchini ochish"
        className="group relative flex h-16 w-16 items-center overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#0a1a28]/95 text-white shadow-[0_18px_40px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-all duration-500 ease-out hover:w-[170px] hover:border-cyan-300/35"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_38%)] opacity-80" />

        <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_12px_30px_rgba(37,99,235,0.32)]">
            <Bot size={20} />
          </div>
        </div>

        <div className="relative z-10 min-w-0 pr-4 opacity-0 transition-all duration-300 ease-out group-hover:opacity-100">
          <p className="flex items-center gap-1 whitespace-nowrap text-[14px] font-semibold leading-none text-white">
            Safo AI
            <Sparkles size={13} className="text-cyan-300" />
          </p>
          <p className="mt-1 whitespace-nowrap text-[12px] text-white/55">
            Chatni ochish
          </p>
        </div>
      </Link>
    </div>
  );
}