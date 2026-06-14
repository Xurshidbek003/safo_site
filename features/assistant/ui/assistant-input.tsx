"use client";

import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { Mic, SendHorizonal, Square } from "lucide-react";
import { useAssistantStore } from "../store/assistant-store";

declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

export default function AssistantInput() {
  const input = useAssistantStore((state) => state.input);
  const setInput = useAssistantStore((state) => state.setInput);
  const sendMessage = useAssistantStore((state) => state.sendMessage);
  const isTyping = useAssistantStore((state) => state.isTyping);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "0px";
    const nextHeight = Math.min(textarea.scrollHeight, 140);
    textarea.style.height = `${nextHeight}px`;
  }, [input]);

  const handleSend = () => {
    if (isTyping) return;
    sendMessage();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleMicClick = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Brauzeringizda ovoz orqali yozish qo‘llab-quvvatlanmaydi.");
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "uz-UZ";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      let transcript = "";

      for (let i = 0; i < event.results.length; i += 1) {
        transcript += event.results[i][0].transcript;
      }

      setInput(transcript.trim());
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <div className="border-t border-white/10 p-3 sm:p-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Savolingizni yozing..."
            className="max-h-[140px] min-h-[56px] w-full resize-none rounded-[18px] border border-white/10 bg-white/[0.05] px-4 py-4 pr-14 text-[15px] text-white outline-none transition placeholder:text-white/28 focus:border-cyan-400/20 focus:bg-white/[0.06]"
          />

          <button
            type="button"
            onClick={handleMicClick}
            className={`absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full border transition ${
              isListening
                ? "border-red-400/30 bg-red-400/10 text-red-300"
                : "border-white/10 bg-white/[0.04] text-white/65 hover:bg-white/[0.07] hover:text-white"
            }`}
          >
            {isListening ? <Square size={16} /> : <Mic size={16} />}
          </button>
        </div>

        <button
          type="button"
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_14px_30px_rgba(37,99,235,0.28)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <SendHorizonal size={18} />
        </button>
      </div>
    </div>
  );
}