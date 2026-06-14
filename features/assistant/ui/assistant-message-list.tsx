"use client";

import { useEffect, useRef } from "react";
import AssistantMessageBubble from "./assistant-message-bubble";
import { useAssistantStore } from "../store/assistant-store";

export default function AssistantMessageList() {
  const messages = useAssistantStore((state) => state.messages);
  const isTyping = useAssistantStore((state) => state.isTyping);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  return (
    <div className="h-full min-h-0 overflow-y-auto overscroll-contain">
      <div className="flex min-h-full flex-col justify-end gap-4 px-3 py-3 sm:px-5 sm:py-5">
        {messages.map((message) => (
          <AssistantMessageBubble key={message.id} message={message} />
        ))}

        {isTyping ? (
          <div className="flex justify-start">
            <div className="inline-flex items-center gap-2 rounded-[18px] border border-white/8 bg-white/[0.06] px-4 py-3 text-white/60">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300 [animation-delay:120ms]" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300 [animation-delay:240ms]" />
            </div>
          </div>
        ) : null}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}