import React, { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface FloatingButtonContextType {
  // Chat state
  isChatOpen: boolean;
  toggleChat: () => void;
  unreadMessages: number;
  setUnreadMessages: React.Dispatch<React.SetStateAction<number>>;
  
  // Chat window state
  isMinimized: boolean;
  toggleMinimize: () => void;
  isPinned: boolean;
  togglePin: () => void;
  
  // Messages
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  
  // Refs
  chatContainerRef: React.RefObject<HTMLDivElement>;
}

const FloatingButtonContext = createContext<FloatingButtonContextType | null>(null);

export const useFloatingButtonContext = () => {
  const context = useContext(FloatingButtonContext);
  if (!context) {
    throw new Error('useFloatingButtonContext must be used within a FloatingButtonProvider');
  }
  return context;
};

interface FloatingButtonProviderProps {
  children: ReactNode;
}

export const FloatingButtonProvider: React.FC<FloatingButtonProviderProps> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const toggleChat = useCallback(() => {
    setIsChatOpen(prev => {
      if (!prev) {
        setUnreadMessages(0);
        setIsMinimized(false);
      }
      return !prev;
    });
  }, []);

  const toggleMinimize = useCallback(() => {
    setIsMinimized(prev => !prev);
  }, []);

  const togglePin = useCallback(() => {
    setIsPinned(prev => !prev);
    if (!isChatOpen) {
      setIsChatOpen(true);
    }
  }, [isChatOpen]);

  return (
    <FloatingButtonContext.Provider
      value={{
        isChatOpen,
        toggleChat,
        unreadMessages,
        setUnreadMessages,
        isMinimized,
        toggleMinimize,
        isPinned,
        togglePin,
        messages,
        setMessages,
        chatContainerRef,
      }}
    >
      {children}
    </FloatingButtonContext.Provider>
  );
};

export default FloatingButtonContext;
