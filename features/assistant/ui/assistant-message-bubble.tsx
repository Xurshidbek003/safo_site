"use client";

import { Copy, Volume2 } from "lucide-react";
import { AssistantMessage } from "../model/types";

type AssistantMessageBubbleProps = {
  message: AssistantMessage;
};

export default function AssistantMessageBubble({
  message,
}: AssistantMessageBubbleProps) {
  const isAssistant = message.role === "assistant";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
    } catch {}
  };

  const handleSpeak = () => {
    if (
      !isAssistant ||
      typeof window === "undefined" ||
      !("speechSynthesis" in window)
    ) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message.content);
    utterance.lang = "uz-UZ";
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className={`flex w-full ${isAssistant ? "justify-start" : "justify-end"}`}>
      <div
        className={`rounded-[22px] border px-4 py-3 sm:px-4 sm:py-3 ${
          isAssistant
            ? "mr-auto max-w-[92%] sm:max-w-[84%] lg:max-w-[76%] border-white/8 bg-white/[0.06] text-white"
            : "ml-auto max-w-[78%] sm:max-w-[70%] lg:max-w-[62%] border-cyan-400/15 bg-gradient-to-br from-cyan-500/18 to-blue-600/18 text-white"
        }`}
      >
        <p className="whitespace-pre-wrap break-words text-[15px] leading-8 text-white/92">
          {message.content}
        </p>

        <div className="mt-3 flex items-center justify-between gap-3">
          {isAssistant ? (
            <div className="flex items-center gap-2 text-white/45">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition hover:bg-white/[0.06] hover:text-white"
              >
                <Copy size={14} />
              </button>

              <button
                type="button"
                onClick={handleSpeak}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition hover:bg-white/[0.06] hover:text-white"
              >
                <Volume2 size={14} />
              </button>
            </div>
          ) : (
            <div />
          )}

          <p className="shrink-0 text-[12px] text-white/38">{message.createdAt}</p>
        </div>
      </div>
    </div>
  );
}