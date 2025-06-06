
import { OPENAI_CONFIG, OpenAIModel, SystemPromptType } from '@/config/openai';

export interface AIRequestOptions {
  model?: OpenAIModel;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string | SystemPromptType;
}

export const buildOpenAIRequest = (
  userMessage: string,
  options: AIRequestOptions = {}
) => {
  const {
    model = 'fast',
    temperature = OPENAI_CONFIG.defaultSettings.temperature,
    maxTokens = OPENAI_CONFIG.defaultSettings.max_tokens,
    systemPrompt = 'general'
  } = options;

  const resolvedSystemPrompt = typeof systemPrompt === 'string' && systemPrompt in OPENAI_CONFIG.systemPrompts
    ? OPENAI_CONFIG.systemPrompts[systemPrompt as SystemPromptType]
    : systemPrompt;

  return {
    messages: [
      { role: 'system' as const, content: resolvedSystemPrompt },
      { role: 'user' as const, content: userMessage }
    ],
    model: OPENAI_CONFIG.models[model],
    temperature,
    max_tokens: maxTokens
  };
};

export const sanitizeInput = (input: string): string => {
  return input.trim().slice(0, 4000); // Limit input length
};

export const formatAIResponse = (response: any): string => {
  if (!response?.choices?.[0]?.message?.content) {
    throw new Error('Invalid AI response format');
  }
  return response.choices[0].message.content.trim();
};

export const estimateTokens = (text: string): number => {
  // Rough estimation: 1 token ≈ 4 characters
  return Math.ceil(text.length / 4);
};

export const validateTokenLimit = (text: string, maxTokens: number = 4000): boolean => {
  return estimateTokens(text) <= maxTokens;
};
