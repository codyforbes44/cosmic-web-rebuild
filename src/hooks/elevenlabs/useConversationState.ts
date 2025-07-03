
import { useState } from 'react';
import { ConversationState, ConversationMessage } from './types';

export const useConversationState = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAgentId, setCurrentAgentId] = useState<string | null>(null);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const addMessage = (message: ConversationMessage) => {
    setMessages(prev => [...prev, message]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const resetConversation = () => {
    setConversationId(null);
    setIsConnected(false);
    clearMessages();
  };

  return {
    // State
    isConnected,
    isLoading,
    currentAgentId,
    signedUrl,
    messages,
    conversationId,
    
    // Setters
    setIsConnected,
    setIsLoading,
    setCurrentAgentId,
    setSignedUrl,
    setConversationId,
    
    // Actions
    addMessage,
    clearMessages,
    resetConversation
  };
};
