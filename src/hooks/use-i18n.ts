import { useState, useEffect, useCallback, createContext, useContext } from 'react';

export interface Translation {
  [key: string]: string | Translation;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
}

export interface I18nContextType {
  currentLanguage: string;
  languages: Language[];
  translations: Translation;
  t: (key: string, params?: Record<string, string | number>) => string;
  changeLanguage: (languageCode: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Available languages
const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true }
];

// Default English translations
const DEFAULT_TRANSLATIONS: Translation = {
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    create: 'Create',
    update: 'Update',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    close: 'Close',
    open: 'Open',
    yes: 'Yes',
    no: 'No',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    select: 'Select',
    all: 'All',
    none: 'None'
  },
  navigation: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    portfolio: 'Portfolio',
    contact: 'Contact',
    weather: 'Weather',
    dashboard: 'Dashboard',
    settings: 'Settings',
    profile: 'Profile',
    logout: 'Logout'
  },
  hero: {
    title: 'Professional Recruitment Marketing Services',
    subtitle: 'Find qualified candidates faster and more cost-effectively with our specialized recruitment marketing solutions.',
    cta: 'Get Started',
    ctaSecondary: 'Learn More'
  },
  features: {
    title: 'Our Features',
    costReduction: {
      title: 'Cost Reduction',
      description: 'Reduce your cost-per-hire by up to 40% with targeted campaigns'
    },
    targetedCampaigns: {
      title: 'Targeted Campaigns',
      description: 'Reach the right candidates with precision marketing strategies'
    },
    dataAnalytics: {
      title: 'Data Analytics',
      description: 'Make informed decisions with comprehensive recruitment analytics'
    }
  },
  contact: {
    title: 'Contact Us',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send Message',
    success: 'Message sent successfully!',
    error: 'Failed to send message. Please try again.'
  },
  weather: {
    title: 'Weather Information',
    current: 'Current Weather',
    forecast: 'Forecast',
    temperature: 'Temperature',
    humidity: 'Humidity',
    windSpeed: 'Wind Speed',
    pressure: 'Pressure',
    visibility: 'Visibility',
    loading: 'Loading weather data...',
    error: 'Failed to load weather data'
  },
  portfolio: {
    title: 'Our Portfolio',
    subtitle: 'Explore our successful recruitment marketing campaigns',
    viewProject: 'View Project',
    category: 'Category',
    client: 'Client',
    results: 'Results'
  },
  footer: {
    company: 'ZBI',
    description: 'Professional recruitment marketing services that deliver results.',
    quickLinks: 'Quick Links',
    services: 'Services',
    legal: 'Legal',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    copyright: '© 2024 ZBI. All rights reserved.'
  },
  errors: {
    notFound: 'Page not found',
    serverError: 'Server error',
    networkError: 'Network error',
    retry: 'Retry',
    goHome: 'Go Home'
  },
  notifications: {
    title: 'Notifications',
    noNotifications: 'No notifications',
    markAllRead: 'Mark all as read'
  }
};

// Detect user's preferred language
const detectLanguage = (): string => {
  // Check localStorage first
  const saved = localStorage.getItem('preferred_language');
  if (saved && SUPPORTED_LANGUAGES.find(lang => lang.code === saved)) {
    return saved;
  }

  // Check browser language
  const browserLang = navigator.language.split('-')[0];
  if (SUPPORTED_LANGUAGES.find(lang => lang.code === browserLang)) {
    return browserLang;
  }

  return 'en'; // Default to English
};

// Translation hook
export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// I18n Provider component
export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<string>(detectLanguage());
  const [translations, setTranslations] = useState<Translation>(DEFAULT_TRANSLATIONS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load translations for a specific language
  const loadTranslations = useCallback(async (languageCode: string): Promise<Translation> => {
    if (languageCode === 'en') {
      return DEFAULT_TRANSLATIONS;
    }

    try {
      // In a real app, you would fetch from an API or import language files
      // For now, we'll return a subset of translated content
      const response = await fetch(`/translations/${languageCode}.json`).catch(() => {
        // Fallback translations for demo
        return {
          json: () => Promise.resolve({
            common: {
              loading: languageCode === 'es' ? 'Cargando...' : 
                       languageCode === 'fr' ? 'Chargement...' :
                       languageCode === 'de' ? 'Wird geladen...' :
                       'Loading...',
              error: languageCode === 'es' ? 'Error' :
                     languageCode === 'fr' ? 'Erreur' :
                     languageCode === 'de' ? 'Fehler' :
                     'Error'
            },
            hero: {
              title: languageCode === 'es' ? 'Servicios Profesionales de Marketing de Reclutamiento' :
                     languageCode === 'fr' ? 'Services Professionnels de Marketing de Recrutement' :
                     languageCode === 'de' ? 'Professionelle Recruiting-Marketing-Services' :
                     'Professional Recruitment Marketing Services'
            }
          })
        };
      });

      const data = await response.json();
      
      // Merge with default translations to ensure all keys exist
      return mergeTranslations(DEFAULT_TRANSLATIONS, data);
    } catch (err) {
      console.error(`Failed to load translations for ${languageCode}:`, err);
      return DEFAULT_TRANSLATIONS;
    }
  }, []);

  // Merge translations objects recursively
  const mergeTranslations = (defaults: Translation, override: Translation): Translation => {
    const result = { ...defaults };
    
    for (const [key, value] of Object.entries(override)) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        result[key] = mergeTranslations(
          (defaults[key] as Translation) || {},
          value as Translation
        );
      } else {
        result[key] = value;
      }
    }
    
    return result;
  };

  // Translation function
  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key; // Return the key if translation not found
      }
    }

    let result = typeof value === 'string' ? value : key;

    // Replace parameters
    if (params) {
      Object.entries(params).forEach(([param, paramValue]) => {
        const regex = new RegExp(`\\{\\{${param}\\}\\}`, 'g');
        result = result.replace(regex, String(paramValue));
      });
    }

    return result;
  }, [translations]);

  // Change language
  const changeLanguage = useCallback(async (languageCode: string) => {
    if (languageCode === currentLanguage) return;

    setIsLoading(true);
    setError(null);

    try {
      const newTranslations = await loadTranslations(languageCode);
      setTranslations(newTranslations);
      setCurrentLanguage(languageCode);
      
      // Save to localStorage
      localStorage.setItem('preferred_language', languageCode);
      
      // Update document language and direction
      document.documentElement.lang = languageCode;
      const language = SUPPORTED_LANGUAGES.find(lang => lang.code === languageCode);
      document.documentElement.dir = language?.rtl ? 'rtl' : 'ltr';
      
    } catch (err) {
      setError('Failed to change language');
      console.error('Language change error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [currentLanguage, loadTranslations]);

  // Initialize
  useEffect(() => {
    loadTranslations(currentLanguage).then(setTranslations);
  }, [currentLanguage, loadTranslations]);

  const value: I18nContextType = {
    currentLanguage,
    languages: SUPPORTED_LANGUAGES,
    translations,
    t,
    changeLanguage,
    isLoading,
    error
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

// Language selector hook
export function useLanguageSelector() {
  const { currentLanguage, languages, changeLanguage, isLoading } = useI18n();

  const currentLanguageInfo = languages.find(lang => lang.code === currentLanguage);

  return {
    currentLanguage: currentLanguageInfo,
    languages,
    changeLanguage,
    isLoading
  };
}

// Format number according to locale
export function useNumberFormat() {
  const { currentLanguage } = useI18n();

  const formatNumber = useCallback((number: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat(currentLanguage, options).format(number);
  }, [currentLanguage]);

  const formatCurrency = useCallback((amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat(currentLanguage, {
      style: 'currency',
      currency
    }).format(amount);
  }, [currentLanguage]);

  const formatPercent = useCallback((value: number) => {
    return new Intl.NumberFormat(currentLanguage, {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value);
  }, [currentLanguage]);

  return {
    formatNumber,
    formatCurrency,
    formatPercent
  };
}

// Date formatting according to locale
export function useDateFormat() {
  const { currentLanguage } = useI18n();

  const formatDate = useCallback((date: Date, options?: Intl.DateTimeFormatOptions) => {
    return new Intl.DateTimeFormat(currentLanguage, options).format(date);
  }, [currentLanguage]);

  const formatRelative = useCallback((date: Date) => {
    const rtf = new Intl.RelativeTimeFormat(currentLanguage, { numeric: 'auto' });
    const diff = date.getTime() - Date.now();
    const days = Math.round(diff / (1000 * 60 * 60 * 24));
    
    if (Math.abs(days) < 1) {
      const hours = Math.round(diff / (1000 * 60 * 60));
      if (Math.abs(hours) < 1) {
        const minutes = Math.round(diff / (1000 * 60));
        return rtf.format(minutes, 'minute');
      }
      return rtf.format(hours, 'hour');
    }
    
    return rtf.format(days, 'day');
  }, [currentLanguage]);

  return {
    formatDate,
    formatRelative
  };
}