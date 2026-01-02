import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  BookOpen, 
  Loader2, 
  AlertTriangle, 
  Image as ImageIcon, 
  Layout, 
  Box,
  Code,
  Copy,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import UnifiedLoading, { 
  PageLoading, 
  SectionLoading, 
  InlineLoading, 
  ButtonLoading,
  WeatherSkeleton,
  DashboardSkeleton
} from '@/components/ui/UnifiedLoading';
import { PageError, InlineError, EmptyState } from '@/components/ui/PageError';
import OptimizedImage from '@/components/common/OptimizedImage';
import SafeImage from '@/components/common/SafeImage';
import PageContainer from '@/components/common/PageContainer';
import EmptyStateComponent from '@/components/common/EmptyState';
import { cn } from '@/lib/utils';

/**
 * ComponentCatalog - Developer reference page for all reusable components.
 * 
 * This page serves as living documentation showing component usage,
 * props, and live examples for the design system.
 */
const ComponentCatalog: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <>
      <Helmet>
        <title>Component Catalog | Developer Documentation</title>
        <meta name="description" content="Developer reference for all reusable UI components" />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-accent/10">
                <BookOpen className="h-6 w-6 text-accent" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Component Catalog</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Developer reference for all reusable UI components. Each component includes 
              live examples, usage guidelines, and copy-ready code snippets.
            </p>
          </div>

          <Tabs defaultValue="loading" className="space-y-6">
            <TabsList className="flex-wrap h-auto gap-2">
              <TabsTrigger value="loading" className="gap-2">
                <Loader2 className="h-4 w-4" />
                Loading States
              </TabsTrigger>
              <TabsTrigger value="errors" className="gap-2">
                <AlertTriangle className="h-4 w-4" />
                Error Handling
              </TabsTrigger>
              <TabsTrigger value="images" className="gap-2">
                <ImageIcon className="h-4 w-4" />
                Images
              </TabsTrigger>
              <TabsTrigger value="layout" className="gap-2">
                <Layout className="h-4 w-4" />
                Layout
              </TabsTrigger>
              <TabsTrigger value="empty" className="gap-2">
                <Box className="h-4 w-4" />
                Empty States
              </TabsTrigger>
            </TabsList>

            {/* Loading States */}
            <TabsContent value="loading" className="space-y-8">
              <ComponentSection
                title="UnifiedLoading"
                description="Single source of truth for all loading states. Supports multiple variants and sizes."
                code={`import UnifiedLoading from '@/components/ui/UnifiedLoading';

// Basic spinner
<UnifiedLoading />

// With custom message
<UnifiedLoading message="Loading data..." />

// Different variants
<UnifiedLoading variant="dots" />
<UnifiedLoading variant="pulse" />
<UnifiedLoading variant="skeleton" />

// Inline for buttons
<UnifiedLoading variant="inline" size="sm" />`}
                copiedCode={copiedCode}
                onCopy={copyCode}
              >
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <ComponentExample title="Spinner (default)">
                    <UnifiedLoading variant="spinner" size="md" />
                  </ComponentExample>
                  <ComponentExample title="Dots">
                    <UnifiedLoading variant="dots" size="md" />
                  </ComponentExample>
                  <ComponentExample title="Pulse">
                    <UnifiedLoading variant="pulse" size="md" />
                  </ComponentExample>
                  <ComponentExample title="Inline">
                    <InlineLoading message="Saving..." />
                  </ComponentExample>
                </div>
              </ComponentSection>

              <ComponentSection
                title="Convenience Components"
                description="Pre-configured loading components for common use cases."
                code={`import { 
  PageLoading, 
  SectionLoading, 
  InlineLoading, 
  ButtonLoading 
} from '@/components/ui/UnifiedLoading';

// Full page loading
<PageLoading message="Loading page..." />

// Section loading
<SectionLoading message="Loading data..." />

// Inside buttons
<Button disabled>
  <ButtonLoading />
  Saving...
</Button>`}
                copiedCode={copiedCode}
                onCopy={copyCode}
              >
                <div className="grid gap-6 md:grid-cols-3">
                  <ComponentExample title="SectionLoading">
                    <SectionLoading message="Loading section..." />
                  </ComponentExample>
                  <ComponentExample title="ButtonLoading">
                    <Button disabled className="gap-2">
                      <ButtonLoading />
                      Saving...
                    </Button>
                  </ComponentExample>
                  <ComponentExample title="Size Variants">
                    <div className="flex items-center gap-4">
                      <UnifiedLoading variant="spinner" size="xs" showMessage={false} />
                      <UnifiedLoading variant="spinner" size="sm" showMessage={false} />
                      <UnifiedLoading variant="spinner" size="md" showMessage={false} />
                      <UnifiedLoading variant="spinner" size="lg" showMessage={false} />
                    </div>
                  </ComponentExample>
                </div>
              </ComponentSection>

              <ComponentSection
                title="Skeleton Variants"
                description="Specialized skeleton loaders for different page types."
                code={`import { 
  WeatherSkeleton, 
  DashboardSkeleton, 
  PortfolioSkeleton 
} from '@/components/ui/UnifiedLoading';

// Weather page loading
<WeatherSkeleton />

// Dashboard loading
<DashboardSkeleton />

// Portfolio grid loading
<PortfolioSkeleton />`}
                copiedCode={copiedCode}
                onCopy={copyCode}
              >
                <div className="grid gap-6 lg:grid-cols-2">
                  <ComponentExample title="WeatherSkeleton">
                    <div className="max-h-64 overflow-hidden">
                      <WeatherSkeleton />
                    </div>
                  </ComponentExample>
                  <ComponentExample title="DashboardSkeleton">
                    <div className="max-h-64 overflow-hidden">
                      <DashboardSkeleton />
                    </div>
                  </ComponentExample>
                </div>
              </ComponentSection>
            </TabsContent>

            {/* Error Handling */}
            <TabsContent value="errors" className="space-y-8">
              <ComponentSection
                title="PageError"
                description="Full page error display with category-specific styling and recovery actions."
                code={`import { PageError } from '@/components/ui/PageError';

// Basic usage
<PageError 
  error={error} 
  onRetry={refetch} 
/>

// With custom title and category
<PageError
  title="Unable to connect"
  description="Please check your internet connection"
  category="network"
  onRetry={handleRetry}
/>

// Compact mode for inline errors
<PageError error={error} compact />`}
                copiedCode={copiedCode}
                onCopy={copyCode}
              >
                <div className="grid gap-6 lg:grid-cols-2">
                  <ComponentExample title="Network Error">
                    <PageError
                      title="Connection Error"
                      description="Unable to reach the server"
                      category="network"
                      showHomeButton={false}
                      compact
                    />
                  </ComponentExample>
                  <ComponentExample title="Auth Error">
                    <PageError
                      title="Session Expired"
                      description="Please sign in again"
                      category="auth"
                      showHomeButton={false}
                      compact
                    />
                  </ComponentExample>
                </div>
              </ComponentSection>

              <ComponentSection
                title="InlineError"
                description="Inline error display for forms and smaller sections."
                code={`import { InlineError } from '@/components/ui/PageError';

<InlineError 
  message="Failed to save changes" 
  onRetry={handleRetry} 
/>`}
                copiedCode={copiedCode}
                onCopy={copyCode}
              >
                <div className="max-w-md">
                  <InlineError 
                    message="Failed to save your changes. Please try again." 
                    onRetry={() => {}} 
                  />
                </div>
              </ComponentSection>

              <ComponentSection
                title="useUnifiedError Hook"
                description="Hook for consistent error handling with automatic categorization and toast notifications."
                code={`import { useUnifiedError } from '@/hooks/useUnifiedError';

const { handleError, error, clearError } = useUnifiedError();

// Handle any error
try {
  await fetchData();
} catch (err) {
  handleError(err);
}

// With custom options
handleError(err, {
  showToast: true,
  duration: 8000,
  action: { label: 'Retry', onClick: refetch }
});`}
                copiedCode={copiedCode}
                onCopy={copyCode}
              >
                <div className="p-4 bg-muted/50 rounded-lg">
                  <code className="text-sm text-muted-foreground">
                    See code example above for hook usage
                  </code>
                </div>
              </ComponentSection>
            </TabsContent>

            {/* Images */}
            <TabsContent value="images" className="space-y-8">
              <ComponentSection
                title="OptimizedImage"
                description="Performance-optimized image with lazy loading using Intersection Observer."
                code={`import OptimizedImage from '@/components/common/OptimizedImage';

// Basic lazy loading
<OptimizedImage 
  src="/images/hero.jpg" 
  alt="Hero banner" 
/>

// Priority loading for LCP
<OptimizedImage 
  src="/images/hero.jpg" 
  alt="Hero"
  priority
  aspectRatio="video"
/>

// With aspect ratio and fallback
<OptimizedImage 
  src={user.avatar} 
  alt="Avatar"
  fallbackSrc="/default-avatar.png"
  aspectRatio="square"
/>`}
                copiedCode={copiedCode}
                onCopy={copyCode}
              >
                <div className="grid gap-6 md:grid-cols-3">
                  <ComponentExample title="Square Aspect Ratio">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300"
                      alt="Nature"
                      aspectRatio="square"
                      className="rounded-lg"
                    />
                  </ComponentExample>
                  <ComponentExample title="Video Aspect Ratio">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400"
                      alt="Landscape"
                      aspectRatio="video"
                      className="rounded-lg"
                    />
                  </ComponentExample>
                  <ComponentExample title="With Fallback">
                    <OptimizedImage
                      src="/broken-image.jpg"
                      alt="Fallback demo"
                      fallbackSrc="/placeholder.svg"
                      aspectRatio="square"
                      className="rounded-lg"
                    />
                  </ComponentExample>
                </div>
              </ComponentSection>

              <ComponentSection
                title="SafeImage"
                description="Image component with error handling and fallback support."
                code={`import SafeImage from '@/components/common/SafeImage';

<SafeImage
  src={imageUrl}
  alt="Description"
  fallbackSrc="/fallback.png"
  showLoadingState
/>`}
                copiedCode={copiedCode}
                onCopy={copyCode}
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <ComponentExample title="Normal Image">
                    <SafeImage
                      src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300"
                      alt="Ocean"
                      className="w-full h-48 object-cover rounded-lg"
                      showLoadingState
                    />
                  </ComponentExample>
                  <ComponentExample title="Error State (Fallback)">
                    <SafeImage
                      src="/broken-image.jpg"
                      alt="Fallback"
                      fallbackSrc="/placeholder.svg"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </ComponentExample>
                </div>
              </ComponentSection>
            </TabsContent>

            {/* Layout */}
            <TabsContent value="layout" className="space-y-8">
              <ComponentSection
                title="PageContainer"
                description="Consistent container with responsive max-width and padding options."
                code={`import PageContainer from '@/components/common/PageContainer';

// Default (6xl max-width, md padding)
<PageContainer>
  <YourContent />
</PageContainer>

// Custom options
<PageContainer 
  maxWidth="4xl" 
  padding="lg"
  className="py-8"
>
  <YourContent />
</PageContainer>`}
                copiedCode={copiedCode}
                onCopy={copyCode}
              >
                <div className="space-y-4">
                  {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
                    <div key={size} className="bg-muted/30 rounded-lg overflow-hidden">
                      <PageContainer maxWidth={size} className="py-2">
                        <div className="bg-accent/20 rounded px-4 py-2 text-sm">
                          maxWidth=&quot;{size}&quot;
                        </div>
                      </PageContainer>
                    </div>
                  ))}
                </div>
              </ComponentSection>
            </TabsContent>

            {/* Empty States */}
            <TabsContent value="empty" className="space-y-8">
              <ComponentSection
                title="EmptyState"
                description="Standardized component for displaying when no data is available."
                code={`import EmptyState from '@/components/common/EmptyState';
import { Inbox, Search, Users } from 'lucide-react';

// Basic usage
<EmptyState
  title="No items found"
  description="Try adjusting your search or filters"
/>

// With icon and action
<EmptyState
  icon={Inbox}
  title="No messages"
  description="Your inbox is empty"
  action={{
    label: 'Compose',
    onClick: () => openCompose()
  }}
/>`}
                copiedCode={copiedCode}
                onCopy={copyCode}
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <ComponentExample title="Basic Empty State">
                    <EmptyStateComponent
                      title="No results found"
                      description="Try adjusting your search criteria"
                      size="sm"
                    />
                  </ComponentExample>
                  <ComponentExample title="With Action">
                    <EmptyStateComponent
                      title="No projects yet"
                      description="Create your first project to get started"
                      action={{
                        label: 'Create Project',
                        onClick: () => {}
                      }}
                      size="sm"
                    />
                  </ComponentExample>
                </div>
              </ComponentSection>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

// Helper Components

interface ComponentSectionProps {
  title: string;
  description: string;
  code: string;
  children: React.ReactNode;
  copiedCode: string | null;
  onCopy: (code: string, id: string) => void;
}

const ComponentSection: React.FC<ComponentSectionProps> = ({
  title,
  description,
  code,
  children,
  copiedCode,
  onCopy,
}) => {
  const id = title.toLowerCase().replace(/\s/g, '-');
  const isCopied = copiedCode === id;

  return (
    <EnhancedCard variant="default" className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      {/* Live Examples */}
      <div className="mb-6">{children}</div>

      {/* Code Example */}
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Code className="h-3 w-3" />
            Usage
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCopy(code, id)}
            className="h-7 px-2 text-xs gap-1"
          >
            {isCopied ? (
              <>
                <Check className="h-3 w-3" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                Copy
              </>
            )}
          </Button>
        </div>
        <pre className="bg-muted/50 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-foreground/80">{code}</code>
        </pre>
      </div>
    </EnhancedCard>
  );
};

interface ComponentExampleProps {
  title: string;
  children: React.ReactNode;
}

const ComponentExample: React.FC<ComponentExampleProps> = ({ title, children }) => (
  <div className="space-y-2">
    <span className="text-xs font-medium text-muted-foreground">{title}</span>
    <div className="p-4 border border-border/50 rounded-lg bg-background/50">
      {children}
    </div>
  </div>
);

export default ComponentCatalog;
