import { create } from "zustand";
import type { ChatMessage, ExtractedData, DraftEventInput } from "@/types/chat";

import { extractEventData } from "./extractEventData";
import { generateBotResponse } from "./generateBotResponse";

type AssistantMode = "draft" | "eventManager";

interface AssistantState {
  isOpen: boolean;
  mode: AssistantMode;
  messages: ChatMessage[];
  extractedData: ExtractedData;

  open: () => void;
  close: () => void;

  resetForMode: (formOpen: boolean) => void;

  handleUserMessage: (input: string, isEventManagerOpen: boolean, onCreateDraft: (d: DraftEventInput) => void) => void;
}

export const useAssistantStore = create<AssistantState>((set, get) => {
  const intro = (mode: AssistantMode): ChatMessage => ({
    id: Date.now().toString(),
    sender: "bot",
    timestamp: new Date(),
    text:
      mode === "eventManager"
        ? "Hi! Ask anything about the event form."
        : "Hi! Tell me your event info in natural language.",
  });

  return {
    isOpen: false,
    mode: "draft",
    messages: [intro("draft")],
    extractedData: {},

    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),

    resetForMode: (open) => {
      const m: AssistantMode = open ? "eventManager" : "draft";
      set({
        mode: m,
        extractedData: {},
        messages: [intro(m)],
      });
    },

    /* main message handler */
    handleUserMessage: (input, isMgr, onCreate) => {
      if (!input.trim()) return;

      const { extractedData } = get();

      // append user message
      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        text: input,
        sender: "user",
        timestamp: new Date(),
      };
      set((s) => ({ messages: [...s.messages, userMsg] }));

      // if event manager not implemented
      if (isMgr) {
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          timestamp: new Date(),
          text: "🚧 This feature is coming soon. Please use the form tabs for now.",
        };
        set((s) => ({ messages: [...s.messages, botMsg] }));
        return;
      }

      const lower = input.toLowerCase();

      // confirm create
      const missing = ["name", "date", "location", "sport", "format"].filter(
        (f) => !extractedData[f as keyof ExtractedData]
      );
      if ((lower === "yes" || lower === "confirm" || lower === "create") && missing.length === 0) {
        const okMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          timestamp: new Date(),
          text: "✨ Draft created! You can edit it now.",
        };
        set((s) => ({ messages: [...s.messages, okMsg] }));

        onCreate({
          name: extractedData.name!,
          date: extractedData.date!,
          location: extractedData.location!,
          sport: extractedData.sport!,
          format: extractedData.format!,
        });

        setTimeout(() => {
          set({
            extractedData: {},
            messages: [
              {
                id: Date.now().toString(),
                sender: "bot",
                timestamp: new Date(),
                text: "Draft created! Want to create another?",
              },
            ],
          });
        }, 2000);

        return;
      }

      // cancel
      if (lower === "no" || lower === "cancel") {
        const cancelMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          timestamp: new Date(),
          text: "No problem! Tell me anytime.",
        };
        set((s) => ({
          messages: [...s.messages, cancelMsg],
          extractedData: {},
        }));
        return;
      }

      // extract new data
      const newData = extractEventData(input);
      const merged = { ...extractedData, ...newData };
      set({ extractedData: merged });

      // bot response
      const reply = generateBotResponse(input, merged);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: reply,
        timestamp: new Date(),
      };
      set((s) => ({ messages: [...s.messages, botMsg] }));
    },
  };
});
