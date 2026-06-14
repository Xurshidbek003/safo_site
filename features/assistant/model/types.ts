export type AssistantRole = "assistant" | "user";

export type AssistantMessage = {
  id: string;
  role: AssistantRole;
  content: string;
  createdAt: string;
};

export type QuickPrompt = {
  id: string;
  title: string;
  description: string;
  badge?: string;
};

export type AssistantState = {
  messages: AssistantMessage[];
  input: string;
  isTyping: boolean;
  setInput: (value: string) => void;
  sendMessage: (content?: string) => void;
  fillPromptToInput: (content: string) => void;
  clearChat: () => void;
};