
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { OPENAI_CONFIG } from '@/config/openai';

interface AIContextType {
  isAIEnabled: boolean;
  currentModel: string;
  setCurrentModel: (model: string) => void;
  apiUsage: {
    requestsToday: number;
    tokensUsed: number;
  };
  incrementUsage: (tokens: number) => void;
  resetDailyUsage: () => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

interface AIProviderProps {
  children: ReactNode;
}

export const AIProvider = ({ children }: AIProviderProps) => {
  const [currentModel, setCurrentModelState] = useState(OPENAI_CONFIG.models.fast);
  const [apiUsage, setApiUsage] = useState({
    requestsToday: 0,
    tokensUsed: 0
  });

  const setCurrentModel = (model: string) => {
    setCurrentModelState(model);
  };

  const incrementUsage = (tokens: number) => {
    setApiUsage(prev => ({
      requestsToday: prev.requestsToday + 1,
      tokensUsed: prev.tokensUsed + tokens
    }));
  };

  const resetDailyUsage = () => {
    setApiUsage({
      requestsToday: 0,
      tokensUsed: 0
    });
  };

  const isAIEnabled = true; // Could be based on environment or user settings

  return (
    <AIContext.Provider value={{
      isAIEnabled,
      currentModel,
      setCurrentModel,
      apiUsage,
      incrementUsage,
      resetDailyUsage
    }}>
      {children}
    </AIContext.Provider>
  );
};
