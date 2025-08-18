import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';

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
  }
};

// Detect user's preferred language
const detectLanguage = (): string => {
  const saved = localStorage.getItem('preferred_language');
  if (saved && SUPPORTED_LANGUAGES.find(lang => lang.code === saved)) {
    return saved;
  }

  const browserLang = navigator.language.split('-')[0];
  if (SUPPORTED_LANGUAGES.find(lang => lang.code === browserLang)) {
    return browserLang;
  }

  return 'en';
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

  // Translation function with parameter replacement
  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn('Translation key not found: ' + key);
        return key;
      }
    }

    let result = typeof value === 'string' ? value : key;

    if (params) {
      Object.entries(params).forEach(([param, paramValue]) => {
        const pattern = '{{' + param + '}}';
        result = result.replace(new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), String(paramValue));
      });
    }

    return result;
  }, [translations]);

  // Change language function
  const changeLanguage = useCallback(async (languageCode: string) => {
    if (languageCode === currentLanguage) return;

    setIsLoading(true);
    setError(null);

    try {
      setCurrentLanguage(languageCode);
      localStorage.setItem('preferred_language', languageCode);
      document.documentElement.lang = languageCode;
      
      const language = SUPPORTED_LANGUAGES.find(lang => lang.code === languageCode);
      document.documentElement.dir = language?.rtl ? 'rtl' : 'ltr';
    } catch (err) {
      setError('Failed to change language');
      console.error('Language change error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [currentLanguage]);

  const value: I18nContextType = {
    currentLanguage,
    languages: SUPPORTED_LANGUAGES,
    translations,
    t,
    changeLanguage,
    isLoading,
    error
  };

  return React.createElement(I18nContext.Provider, { value }, children);
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