export type ChatSender = "user" | "bot";

export interface ChatMessage {
  id: string;
  text: string;
  sender: ChatSender;
  timestamp: Date;
}

export interface ExtractedData {
  name?: string;
  date?: string;
  location?: string;
  sport?: string;
  format?: string;
}

export interface DraftEventInput {
  name: string;
  date: string;
  location: string;
  sport: string;
  format: string;
}
