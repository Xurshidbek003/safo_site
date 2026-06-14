"use client";

import { Bot } from "lucide-react";
import AssistantChatHeader from "./assistant-chat-header";
import AssistantInput from "./assistant-input";
import AssistantMessageList from "./assistant-message-list";
import AssistantQuickPrompts from "./assistant-quick-prompts";

export default function AssistantPageShell() {
  return (
    <main className="min-h-[88vh] xl:h-[calc(100svh-88px)]  text-white">
      <section className="relative min-h-screen mt-3 xl:h-full xl:min-h-0 xl:overflow-hidden">
        <div className="pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col px-3 py-3 sm:px-4 sm:py-4 lg:px-6 xl:h-full xl:min-h-0 xl:px-5 xl:py-2">

          <div className="grid gap-4 xl:min-h-0 xl:flex-1 xl:grid-cols-[1.65fr_0.85fr] xl:gap-3">
            <section className="relative flex h-[68svh] min-h-[620px] flex-col overflow-hidden rounded-[26px] border border-white/10 bg-[#0a1a28]/95 shadow-[0_22px_60px_rgba(0,0,0,0.22)] sm:min-h-[680px] xl:h-full xl:min-h-0">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_32%)]" />

              <AssistantChatHeader />

              <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                <div className="min-h-0 flex-1">
                  <AssistantMessageList />
                </div>

                <div className="shrink-0">
                  <AssistantInput />
                </div>
              </div>
            </section>

            <div className="min-h-[380px] xl:h-full xl:min-h-0">
              <AssistantQuickPrompts />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}