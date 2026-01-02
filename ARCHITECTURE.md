# ƷBI Architecture Documentation

This document provides a comprehensive overview of the ƷBI application architecture, patterns, and development guidelines.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Directory Structure](#directory-structure)
3. [AI Integration Architecture](#ai-integration-architecture)
4. [Error Handling System](#error-handling-system)
5. [Type System](#type-system)
6. [Layout System](#layout-system)
7. [Edge Functions Reference](#edge-functions-reference)
8. [Hooks Reference](#hooks-reference)
9. [Component Catalog](#component-catalog)
10. [Security Guidelines](#security-guidelines)
11. [Development Workflow](#development-workflow)

---

## Project Overview

### Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: React Query (TanStack Query)
- **Backend**: Supabase (PostgreSQL, Edge Functions, Auth)
- **AI Gateway**: Lovable AI Gateway (Google Gemini, OpenAI GPT-5)
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber

### Key Features

- Multi-AI chat interface with unified API
- Medical diagnosis assistant
- Weather dashboard with real-time data
- Analytics and visitor tracking
- Admin dashboard with role-based access
- Voice synthesis (ElevenLabs, Edge TTS)
- Component catalog for UI documentation

---

## Directory Structure

```
src/
├── assets/              # Static assets (images, fonts)
├── components/
│   ├── admin/           # Admin dashboard components
│   ├── ai/              # AI-related components
│   ├── analytics/       # Analytics dashboard components
│   ├── auth/            # Authentication components
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   └── weather/         # Weather dashboard components
├── hooks/               # Custom React hooks
├── integrations/
│   └── supabase/        # Supabase client and types
├── layouts/             # Page layout components
├── lib/                 # Utility libraries
├── pages/               # Route page components
├── types/               # TypeScript type definitions
└── utils/
    ├── errorHandling/   # Unified error handling
    └── ...              # Other utilities

supabase/
├── config.toml          # Supabase configuration
├── functions/           # Edge functions
└── migrations/          # Database migrations
```

---

## AI Integration Architecture

### Lovable AI Gateway

All AI interactions are routed through the Lovable AI Gateway for unified access to multiple AI models.

**Gateway URL**: `https://ai.gateway.lovable.dev/v1/chat/completions`

### Available Models

| Model | Use Case | Cost |
|-------|----------|------|
| `google/gemini-2.5-flash` | Default, balanced performance | Low |
| `google/gemini-2.5-pro` | Complex reasoning, multimodal | Medium |
| `google/gemini-2.5-flash-lite` | Fast, simple tasks | Lowest |
| `openai/gpt-5` | Premium quality, complex tasks | High |
| `openai/gpt-5-mini` | Good balance of quality/cost | Medium |
| `openai/gpt-5-nano` | High-volume, simple tasks | Low |

### The `useAI` Hook

The primary hook for AI interactions:

```typescript
import { useAI } from '@/hooks/useAI';

const { sendMessage, isLoading, error, messages, streamingContent } = useAI({
  systemPrompt: 'You are a helpful assistant.',
  model: 'google/gemini-2.5-flash', // Optional, defaults to gemini-2.5-flash
  onError: (error) => console.error(error),
});

// Send a message
await sendMessage('Hello, AI!');
```

### Edge Function Pattern

AI edge functions follow this pattern:

```typescript
// supabase/functions/my-ai-function/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "Your system prompt here" },
          ...messages,
        ],
        stream: true, // For streaming responses
      }),
    });

    // Handle rate limits
    if (response.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
```

---

## Error Handling System

### Unified Error Types

Located in `src/types/errors.ts`:

```typescript
type ErrorCategory = 
  | 'network' | 'auth' | 'validation' | 'api' 
  | 'database' | 'permission' | 'notFound' | 'timeout' | 'unknown';

type ErrorSeverity = 'info' | 'warning' | 'error' | 'critical';

interface AppError {
  id: string;
  code: string;
  message: string;
  userMessage: string;
  category: ErrorCategory;
  severity: ErrorSeverity;
  retryable: boolean;
  timestamp: Date;
  context?: Record<string, unknown>;
  originalError?: Error;
}
```

### QueryErrorBoundary

For React Query operations, wrap components with `QueryErrorBoundary`:

```tsx
import { QueryErrorBoundary } from '@/components/ui/QueryErrorBoundary';

<QueryErrorBoundary
  fallbackTitle="Failed to load data"
  fallbackDescription="There was a problem loading the data. Please try again."
  compact={false}
>
  <MyDataComponent />
</QueryErrorBoundary>
```

### useUnifiedError Hook

For programmatic error handling:

```typescript
import { useUnifiedError } from '@/hooks/useUnifiedError';

const { handleError, clearError, error, isError } = useUnifiedError({
  showToast: true,
  logErrors: true,
});

try {
  await riskyOperation();
} catch (e) {
  handleError(e, { showToast: true });
}
```

### Error Display Components

| Component | Use Case |
|-----------|----------|
| `PageError` | Full-page error display with recovery actions |
| `InlineError` | Compact inline error for forms |
| `EmptyState` | When no data is available |

---

## Type System

### Core Type Files

| File | Purpose |
|------|---------|
| `src/types/ai.ts` | AI models, messages, responses |
| `src/types/services.ts` | Service definitions for AI platforms |
| `src/types/errors.ts` | Error handling types |
| `src/types/zephel.ts` | Zephel chatbot types |

### AI Types Example

```typescript
// src/types/ai.ts
export type AIModel = 
  | 'google/gemini-2.5-flash'
  | 'google/gemini-2.5-pro'
  | 'openai/gpt-5'
  | 'openai/gpt-5-mini';

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  content: string;
  model: AIModel;
  usage?: {
    promptTokens: number;
    completionTokens: number;
  };
}
```

---

## Layout System

### StandardPageLayout

The primary layout component for consistent page structure:

```tsx
import StandardPageLayout from '@/layouts/StandardPageLayout';

<StandardPageLayout
  seo={{
    title: "Page Title | ƷBI",
    description: "Page description for SEO",
    keywords: "keyword1, keyword2"
  }}
  breadcrumb={{ label: "Current Page" }}
  header={{
    title: "Page Title",
    description: "Page subtitle or description",
    icon: SomeIcon
  }}
>
  {/* Page content */}
</StandardPageLayout>
```

### ServicePageLayout

For service-specific pages with custom styling:

```tsx
import ServicePageLayout from '@/layouts/ServicePageLayout';

<ServicePageLayout
  service={serviceConfig}
  isLoading={loading}
  error={error}
>
  {/* Service content */}
</ServicePageLayout>
```

---

## Edge Functions Reference

### AI Functions

| Function | Description | Auth Required |
|----------|-------------|---------------|
| `anthropic-chat` | Anthropic Claude integration via Lovable AI | Yes |
| `janitor-ai` | Janitor.ai chat service | No |
| `fiction-lab` | FictionLab content generation | No |
| `medical-diagnosis` | Medical symptom analysis | No |
| `zephel-chat` | Zephel AI chatbot | Yes |

### Voice Functions

| Function | Description | Auth Required |
|----------|-------------|---------------|
| `fifteen-ai` | ElevenLabs TTS with fallback | No |
| `edge-tts` | Microsoft Edge TTS | No |
| `vosk-transcribe` | Speech-to-text transcription | No |

### Utility Functions

| Function | Description | Auth Required |
|----------|-------------|---------------|
| `huggingface` | Hugging Face model inference | No |
| `openai` | OpenAI completions | No |
| `weather` | Weather data fetching | No |
| `send-contact-email` | Contact form emails | No |

### Configuration

Edge functions are configured in `supabase/config.toml`:

```toml
[functions.my-function]
enabled = true
verify_jwt = false  # Set to true for auth-required functions
```

---

## Hooks Reference

### AI Hooks

| Hook | Purpose |
|------|---------|
| `useAI` | Unified AI chat with streaming |
| `useOpenAI` | Direct OpenAI API calls |
| `useHuggingFace` | Hugging Face model inference |
| `useZephelErrorHandler` | Zephel-specific error handling |

### Data Hooks

| Hook | Purpose |
|------|---------|
| `useAnalytics` | Analytics data fetching |
| `useAuth` | Authentication state |
| `useToast` | Toast notifications |
| `useIsMobile` | Responsive breakpoint detection |

### Error Hooks

| Hook | Purpose |
|------|---------|
| `useUnifiedError` | Centralized error handling |
| `useErrorReporting` | Error boundary integration |

---

## Component Catalog

Access the live component catalog at `/component-catalog` to see all UI components with examples.

### Key Component Categories

- **Layout**: Cards, Dialogs, Sheets, Accordions
- **Forms**: Inputs, Selects, Checkboxes, TextAreas
- **Feedback**: Toasts, Alerts, Progress, Skeletons
- **Navigation**: Tabs, Breadcrumbs, Menus
- **Data Display**: Tables, Charts, Badges

---

## Security Guidelines

### Row Level Security (RLS)

All database tables MUST have RLS enabled with appropriate policies:

```sql
-- Enable RLS
ALTER TABLE public.my_table ENABLE ROW LEVEL SECURITY;

-- User-specific access
CREATE POLICY "Users can view own data"
ON public.my_table FOR SELECT
USING (auth.uid() = user_id);

-- Admin access
CREATE POLICY "Admins have full access"
ON public.my_table FOR ALL
USING (public.is_admin(auth.uid()));
```

### Secret Management

- **Never** store secrets in frontend code
- Use Supabase secrets for API keys
- `LOVABLE_API_KEY` is auto-provisioned
- Access secrets in edge functions via `Deno.env.get()`

### Authentication Flow

1. User authenticates via Supabase Auth
2. JWT token stored in session
3. Token passed to edge functions via headers
4. Functions verify JWT before processing

---

## Development Workflow

### Local Setup

```bash
# Clone repository
git clone <repo-url>
cd <project-name>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Edge Function Development

```bash
# Test functions locally
npx supabase functions serve

# Deploy specific function
npx supabase functions deploy <function-name>
```

### Database Migrations

```bash
# Create new migration
npx supabase migration new <migration-name>

# Apply migrations
npx supabase db push
```

### Testing Guidelines

1. Test error boundaries with mock failures
2. Verify RLS policies with different user roles
3. Test AI functions with rate limit scenarios
4. Check responsive layouts on mobile viewports

### Code Quality

- Run TypeScript checks: `npm run typecheck`
- Format code: `npm run format`
- Lint: `npm run lint`

---

## Additional Resources

- [Lovable Documentation](https://docs.lovable.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Query](https://tanstack.com/query/latest)

---

*Last updated: January 2026*
