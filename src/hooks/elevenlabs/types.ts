
export interface ConversationConfig {
  agentId?: string;
  voiceId?: string;
  prompt?: string;
  firstMessage?: string;
}

export interface ConversationMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ConversationState {
  isConnected: boolean;
  isLoading: boolean;
  currentAgentId: string | null;
  signedUrl: string | null;
  messages: ConversationMessage[];
  conversationId: string | null;
}
