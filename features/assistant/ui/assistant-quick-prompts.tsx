"use client";

import { Sparkles, ChevronRight } from "lucide-react";
import { quickPrompts } from "../data/quick-prompts";
import { useAssistantStore } from "../store/assistant-store";


export default function AssistantQuickPrompts() {
  const fillPromptToInput = useAssistantStore((state) => state.fillPromptToInput);

  return (
    <aside className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-[26px] border border-white/10 bg-[#0a1a28]/95 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.08),transparent_30%)]" />

      <div className="relative z-10 border-b border-white/10 px-4 py-4 sm:px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_10px_25px_rgba(37,99,235,0.25)]">
            <Sparkles size={18} />
          </div>

          <div>
            <p className="text-[18px] font-semibold text-white">Tez savollar</p>
            <p className="mt-1 text-[12px] text-white/48">
              Ko‘p so‘raladigan savollar
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 min-h-0 flex-1 space-y-3 overflow-y-auto p-4 sm:p-5">
        {quickPrompts.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => fillPromptToInput(item.title)}
            className="group w-full rounded-[22px] border border-white/10 bg-white/[0.03] p-4 text-left transition duration-300 hover:border-cyan-400/25 hover:bg-white/[0.045]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                {item.badge ? (
                  <span className="inline-flex rounded-full border border-cyan-400/15 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-medium text-cyan-200">
                    {item.badge}
                  </span>
                ) : null}

                <h3 className="mt-3 text-[15px] font-semibold leading-6 text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-[12px] leading-5 text-white/52">
                  {item.description}
                </p>
              </div>

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/40 transition group-hover:border-cyan-400/20 group-hover:text-cyan-200">
                <ChevronRight size={16} />
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}