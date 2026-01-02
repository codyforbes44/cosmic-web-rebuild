// Lovable AI Gateway Models Configuration
// Migrated from OpenAI-only to unified Lovable AI Gateway

export const OPENAI_CONFIG = {
  models: {
    // Map legacy model names to Lovable AI models
    fast: 'google/gemini-2.5-flash-lite',      // Fastest, most cost-effective
    balanced: 'google/gemini-2.5-flash',       // Default - good balance
    powerful: 'google/gemini-2.5-pro'          // Most capable
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

// Lovable AI Gateway models - comprehensive list
export const LOVABLE_AI_MODELS = {
  // Gemini models
  'gemini-flash': 'google/gemini-2.5-flash',
  'gemini-flash-lite': 'google/gemini-2.5-flash-lite',
  'gemini-pro': 'google/gemini-2.5-pro',
  'gemini-3-pro': 'google/gemini-3-pro-preview',
  // GPT models  
  'gpt-5': 'openai/gpt-5',
  'gpt-5-mini': 'openai/gpt-5-mini',
  'gpt-5-nano': 'openai/gpt-5-nano',
  // Image generation
  'gemini-image': 'google/gemini-2.5-flash-image',
  'gemini-3-image': 'google/gemini-3-pro-image-preview',
} as const;

export type OpenAIModel = keyof typeof OPENAI_CONFIG.models;
export type SystemPromptType = keyof typeof OPENAI_CONFIG.systemPrompts;
export type LovableAIModel = keyof typeof LOVABLE_AI_MODELS;
