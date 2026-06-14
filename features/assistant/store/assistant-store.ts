"use client";

import { create } from "zustand";
import { apiPost } from "@/shared/lib/api";
import { initialAssistantMessages } from "../data/initial-messages";
import { AssistantMessage, AssistantState } from "../model/types";

function getCurrentTime() {
  return new Date().toLocaleTimeString("uz-UZ", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const useAssistantStore = create<AssistantState>((set, get) => ({
  messages: initialAssistantMessages,
  input: "",
  isTyping: false,

  setInput: (value) => set({ input: value }),

  sendMessage: async (content) => {
    const text = (content ?? get().input).trim();
    if (!text) return;

    const userMessage: AssistantMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      createdAt: getCurrentTime(),
    };

    set((state) => ({
      messages: [...state.messages, userMessage],
      input: "",
      isTyping: true,
    }));

    try {
      const data = await apiPost<{ response: string }>("/api/public/chat", {
        message: text,
      });
      const assistantMessage: AssistantMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.response || "Uzr, javob topa olmadim. Boshqacharoq so'rang.",
        createdAt: getCurrentTime(),
      };
      set((state) => ({
        messages: [...state.messages, assistantMessage],
        isTyping: false,
      }));
    } catch {
      const errorMessage: AssistantMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content:
          "Uzr, hozir AI yordamchi bilan bog'lanib bo'lmadi. Iltimos, keyinroq urinib ko'ring.",
        createdAt: getCurrentTime(),
      };
      set((state) => ({
        messages: [...state.messages, errorMessage],
        isTyping: false,
      }));
    }
  },

  fillPromptToInput: (content) => {
    set({ input: content });
  },

  clearChat: () =>
    set({
      messages: initialAssistantMessages,
      input: "",
      isTyping: false,
    }),
}));
