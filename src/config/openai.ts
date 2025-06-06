
export const OPENAI_CONFIG = {
  models: {
    fast: 'gpt-4o-mini',
    balanced: 'gpt-4o',
    powerful: 'gpt-4o'
  },
  defaultSettings: {
    temperature: 0.7,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  },
  rateLimits: {
    requestsPerMinute: 60,
    tokensPerMinute: 150000
  },
  systemPrompts: {
    general: "You are a helpful AI assistant.",
    medical: "You are a medical AI assistant. Always recommend consulting healthcare professionals for proper diagnosis.",
    weather: "You are a weather assistant. Provide accurate and helpful weather-related information.",
    technical: "You are a technical assistant. Provide clear, accurate technical information and code examples."
  }
} as const;

export type OpenAIModel = keyof typeof OPENAI_CONFIG.models;
export type SystemPromptType = keyof typeof OPENAI_CONFIG.systemPrompts;
