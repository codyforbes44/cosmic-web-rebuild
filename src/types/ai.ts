/**
 * AI Integration Type Definitions
 * Provides type safety for all AI-related operations
 */

// OpenAI Response Types
export interface OpenAIChoice {
  message: {
    role: 'system' | 'user' | 'assistant';
    content: string;
  };
  finish_reason: string;
  index: number;
}

export interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: OpenAIChoice[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Chat Message Types
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// OpenAI Request Payload
export interface OpenAIRequestPayload {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

// Hugging Face Types
export interface HuggingFaceParameters {
  max_length?: number;
  temperature?: number;
  top_p?: number;
  top_k?: number;
  repetition_penalty?: number;
  do_sample?: boolean;
}

export interface HuggingFaceOptions {
  wait_for_model?: boolean;
  use_cache?: boolean;
}

export interface HuggingFaceResponse {
  generated_text?: string;
  translation_text?: string;
  summary_text?: string;
  label?: string;
  score?: number;
  [key: string]: unknown;
}

// Generic AI Response
export interface AIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// AI Invoke Options
export interface AIInvokeOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
  stream?: boolean;
}

// Callback Types
export type AISuccessCallback<T = unknown> = (data: T) => void;
export type AIErrorCallback = (error: Error) => void;
