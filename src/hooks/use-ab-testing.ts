import { useState, useEffect, useCallback } from 'react';

export interface ABTestVariant {
  id: string;
  name: string;
  weight: number;
  config: Record<string, any>;
  isControl?: boolean;
}

export interface ABTest {
  id: string;
  name: string;
  description?: string;
  status: 'draft' | 'running' | 'paused' | 'completed';
  variants: ABTestVariant[];
  targetingRules?: {
    url?: string[];
    userAgent?: string[];
    location?: string[];
    customAttributes?: Record<string, any>;
  };
  startDate?: Date;
  endDate?: Date;
  trafficAllocation: number; // 0-100 percentage
  conversionGoals: string[];
}

export interface ABTestResult {
  testId: string;
  variantId: string;
  userId?: string;
  sessionId: string;
  timestamp: Date;
  conversions: Record<string, boolean>;
  metadata?: Record<string, any>;
}

// A/B Testing Hook
export function useABTesting() {
  const [activeTests, setActiveTests] = useState<ABTest[]>([]);
  const [userVariants, setUserVariants] = useState<Map<string, string>>(new Map());
  const [results, setResults] = useState<ABTestResult[]>([]);

  // Generate a stable user/session ID for consistent variant assignment
  const getUserId = useCallback(() => {
    let userId = localStorage.getItem('ab_test_user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('ab_test_user_id', userId);
    }
    return userId;
  }, []);

  const getSessionId = useCallback(() => {
    let sessionId = sessionStorage.getItem('ab_test_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('ab_test_session_id', sessionId);
    }
    return sessionId;
  }, []);

  // Simple hash function for consistent variant assignment
  const hashString = useCallback((str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }, []);

  // Assign user to a variant based on consistent hashing
  const assignVariant = useCallback((test: ABTest, userId: string): string => {
    // Check if user should be included in test based on traffic allocation
    const userHash = hashString(`${test.id}_${userId}`);
    const trafficThreshold = (test.trafficAllocation / 100) * Number.MAX_SAFE_INTEGER;
    
    if (userHash > trafficThreshold) {
      return 'control'; // User not in test
    }

    // Assign to variant based on weights
    const hash = hashString(`${test.id}_${userId}_variant`);
    const totalWeight = test.variants.reduce((sum, variant) => sum + variant.weight, 0);
    const normalizedHash = hash % totalWeight;

    let weightSum = 0;
    for (const variant of test.variants) {
      weightSum += variant.weight;
      if (normalizedHash < weightSum) {
        return variant.id;
      }
    }

    return test.variants[0]?.id || 'control';
  }, [hashString]);

  // Check if user matches targeting rules
  const matchesTargeting = useCallback((test: ABTest): boolean => {
    if (!test.targetingRules) return true;

    const { url, userAgent, location, customAttributes } = test.targetingRules;

    // URL matching
    if (url && url.length > 0) {
      const currentUrl = window.location.pathname;
      const matches = url.some(pattern => {
        const regex = new RegExp(pattern.replace(/\*/g, '.*'));
        return regex.test(currentUrl);
      });
      if (!matches) return false;
    }

    // User agent matching
    if (userAgent && userAgent.length > 0) {
      const currentUA = navigator.userAgent;
      const matches = userAgent.some(pattern => {
        const regex = new RegExp(pattern, 'i');
        return regex.test(currentUA);
      });
      if (!matches) return false;
    }

    // Custom attributes matching
    if (customAttributes) {
      const storedAttributes = JSON.parse(localStorage.getItem('ab_test_attributes') || '{}');
      for (const [key, value] of Object.entries(customAttributes)) {
        if (storedAttributes[key] !== value) return false;
      }
    }

    return true;
  }, []);

  // Get variant for a specific test
  const getVariant = useCallback((testId: string): string | null => {
    const test = activeTests.find(t => t.id === testId);
    if (!test || test.status !== 'running') return null;

    // Check if test is within date range
    const now = new Date();
    if (test.startDate && now < test.startDate) return null;
    if (test.endDate && now > test.endDate) return null;

    // Check targeting rules
    if (!matchesTargeting(test)) return null;

    // Check if user already has a variant assigned
    const existingVariant = userVariants.get(testId);
    if (existingVariant) return existingVariant;

    // Assign new variant
    const userId = getUserId();
    const variantId = assignVariant(test, userId);
    
    setUserVariants(prev => new Map(prev.set(testId, variantId)));
    
    // Store in localStorage for persistence
    const storedVariants = JSON.parse(localStorage.getItem('ab_test_variants') || '{}');
    storedVariants[testId] = variantId;
    localStorage.setItem('ab_test_variants', JSON.stringify(storedVariants));

    return variantId;
  }, [activeTests, userVariants, matchesTargeting, assignVariant, getUserId]);

  // Get configuration for a variant
  const getVariantConfig = useCallback((testId: string, defaultConfig: Record<string, any> = {}): Record<string, any> => {
    const variantId = getVariant(testId);
    if (!variantId) return defaultConfig;

    const test = activeTests.find(t => t.id === testId);
    if (!test) return defaultConfig;

    const variant = test.variants.find(v => v.id === variantId);
    if (!variant) return defaultConfig;

    return { ...defaultConfig, ...variant.config };
  }, [activeTests, getVariant]);

  // Track conversion event
  const trackConversion = useCallback((testId: string, goalId: string, metadata?: Record<string, any>) => {
    const variantId = getVariant(testId);
    if (!variantId) return;

    const test = activeTests.find(t => t.id === testId);
    if (!test || !test.conversionGoals.includes(goalId)) return;

    const result: ABTestResult = {
      testId,
      variantId,
      userId: getUserId(),
      sessionId: getSessionId(),
      timestamp: new Date(),
      conversions: { [goalId]: true },
      metadata
    };

    setResults(prev => [...prev, result]);

    // Store in localStorage
    const storedResults = JSON.parse(localStorage.getItem('ab_test_results') || '[]');
    storedResults.push(result);
    localStorage.setItem('ab_test_results', JSON.stringify(storedResults));

    console.log('A/B Test Conversion Tracked:', result);
  }, [activeTests, getVariant, getUserId, getSessionId]);

  // Initialize from localStorage
  useEffect(() => {
    const storedVariants = JSON.parse(localStorage.getItem('ab_test_variants') || '{}');
    const storedResults = JSON.parse(localStorage.getItem('ab_test_results') || '[]');
    
    setUserVariants(new Map(Object.entries(storedVariants)));
    setResults(storedResults);
  }, []);

  // Load active tests (in real app, this would come from API/database)
  useEffect(() => {
    // Example tests configuration
    const defaultTests: ABTest[] = [
      {
        id: 'hero_cta_test',
        name: 'Hero CTA Button Test',
        description: 'Testing different CTA button styles on hero section',
        status: 'running',
        variants: [
          {
            id: 'control',
            name: 'Original Button',
            weight: 50,
            config: { buttonVariant: 'default', buttonText: 'Get Started' },
            isControl: true
          },
          {
            id: 'variant_a',
            name: 'Gradient Button',
            weight: 50,
            config: { buttonVariant: 'gradient', buttonText: 'Start Free Trial' }
          }
        ],
        trafficAllocation: 100,
        conversionGoals: ['cta_click', 'signup', 'contact_form']
      },
      {
        id: 'pricing_layout_test',
        name: 'Pricing Page Layout',
        description: 'Testing different pricing page layouts',
        status: 'running',
        variants: [
          {
            id: 'control',
            name: 'Standard Layout',
            weight: 33,
            config: { layout: 'standard', highlightPlan: 'pro' },
            isControl: true
          },
          {
            id: 'variant_a',
            name: 'Comparison Table',
            weight: 33,
            config: { layout: 'comparison', highlightPlan: 'enterprise' }
          },
          {
            id: 'variant_b',
            name: 'Simple Cards',
            weight: 34,
            config: { layout: 'cards', highlightPlan: 'starter' }
          }
        ],
        trafficAllocation: 80,
        conversionGoals: ['plan_selection', 'checkout_start']
      }
    ];

    setActiveTests(defaultTests);
  }, []);

  return {
    activeTests,
    getVariant,
    getVariantConfig,
    trackConversion,
    results,
    userVariants: Object.fromEntries(userVariants)
  };
}

// Hook for feature flags (simpler than A/B tests)
export function useFeatureFlags() {
  const [flags, setFlags] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Load feature flags from localStorage or API
    const storedFlags = JSON.parse(localStorage.getItem('feature_flags') || '{}');
    
    // Default feature flags
    const defaultFlags = {
      'new_dashboard': false,
      'advanced_analytics': true,
      'realtime_chat': false,
      'beta_features': false,
      'dark_mode': true,
      'notifications': true,
      'experimental_ui': false
    };

    setFlags({ ...defaultFlags, ...storedFlags });
  }, []);

  const isEnabled = useCallback((flagName: string): boolean => {
    return flags[flagName] || false;
  }, [flags]);

  const setFlag = useCallback((flagName: string, enabled: boolean) => {
    setFlags(prev => ({ ...prev, [flagName]: enabled }));
    
    const storedFlags = JSON.parse(localStorage.getItem('feature_flags') || '{}');
    storedFlags[flagName] = enabled;
    localStorage.setItem('feature_flags', JSON.stringify(storedFlags));
  }, []);

  return {
    flags,
    isEnabled,
    setFlag
  };
}