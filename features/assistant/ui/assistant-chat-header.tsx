"use client";

import { Globe, Sparkles } from "lucide-react";

export default function AssistantChatHeader() {
  return (
    <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-3 py-3 sm:px-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.05] text-cyan-200">
          <Sparkles size={18} />
        </div>

        <div>
          <p className="text-[17px] font-semibold text-white">Safo AI Chat</p>
          <p className="mt-1 text-[12px] text-white/46">
            Savolingizni yozing yoki tez savollardan foydalaning
          </p>
        </div>
      </div>

      <button
        type="button"
        className="inline-flex h-11 items-center gap-2 rounded-[14px] border border-white/10 bg-white/[0.03] px-4 text-[13px] font-medium text-white/80 transition hover:bg-white/[0.06]"
      >
        <Globe size={16} />
        O‘zbekcha
      </button>
    </div>
  );
}