
import { ChatMessage } from "../types";

export interface ChatState {
  isOpen: boolean;
  messages: ChatMessage[];
  message: string;
  isTyping: boolean;
  isThinking: boolean;
  unreadMessages: number;
  isPinned: boolean;
  isSendingFirstMessage: boolean;
  showZapierManager: boolean;
}

export interface TimingConfig {
  min: number;
  max: number;
}

export const THINKING_DELAY: TimingConfig = { min: 300, max: 800 };
export const TYPING_SPEED: TimingConfig = { min: 30, max: 70 }; // ms per character
