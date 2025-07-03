
import { useCallback } from 'react';
import { ConversationMessage } from './types';

export const useMessageHandler = (addMessage: (message: ConversationMessage) => void) => {
  const handleMessage = useCallback((message: any) => {
    console.log('Voice message received:', message);
    
    // Handle different message types from ElevenLabs
    if (typeof message === 'object' && message !== null) {
      const messageContent = message.message || message.content || message.text || '';
      const messageSource = message.source || message.role || 'assistant';
      
      if (messageContent && typeof messageContent === 'string' && messageContent.trim()) {
        addMessage({
          id: Date.now().toString(),
          content: messageContent,
          role: messageSource === 'user' ? 'user' : 'assistant',
          timestamp: new Date()
        });
      }
    } else if (typeof message === 'string' && message.trim()) {
      // Handle string messages
      addMessage({
        id: Date.now().toString(),
        content: message,
        role: 'assistant',
        timestamp: new Date()
      });
    }
  }, [addMessage]);

  return { handleMessage };
};
