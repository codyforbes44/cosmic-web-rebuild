
import { useState } from 'react';
import { ChatMessage } from '../types';
import { useToast } from '@/hooks/use-toast';
import { 
  processZapierCommand, 
  findWebhookByCategory, 
  triggerZapierWebhook,
  parseZapierResponse,
} from '../zapierIntegration';
import { getRandomDelay, calculateTypingDuration } from './chatUtils';
import { THINKING_DELAY, TYPING_SPEED } from './chatStateTypes';

export const useZapierChat = (
  isAuthenticated: boolean,
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  setIsThinking: React.Dispatch<React.SetStateAction<boolean>>,
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const { toast } = useToast();

  const handleZapierCommand = async (userMessage: string): Promise<boolean> => {
    // Block Zapier commands for unauthenticated users
    if (!isAuthenticated) {
      setIsThinking(true);
      setTimeout(() => {
        setIsThinking(false);
        setIsTyping(true);
        
        const authRequiredText = "I'm sorry, Zapier integration features are only available to authenticated users. Please sign in to access this functionality.";
        const typingDuration = calculateTypingDuration(authRequiredText, TYPING_SPEED);
        
        setTimeout(() => {
          setIsTyping(false);
          
          const botResponse: ChatMessage = {
            id: Date.now().toString(),
            text: authRequiredText,
            sender: 'bot',
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, botResponse]);
        }, typingDuration);
      }, getRandomDelay(THINKING_DELAY.min, THINKING_DELAY.max));
      
      return true;
    }

    const { isCommand, webhookCategory, payload } = processZapierCommand(userMessage);
    
    if (!isCommand || !webhookCategory) return false;
    
    // Find the webhook by category
    const webhook = findWebhookByCategory(webhookCategory);
    
    if (!webhook) {
      // Webhook not found response
      setIsThinking(true);
      setTimeout(() => {
        setIsThinking(false);
        setIsTyping(true);
        
        const notFoundText = `I couldn't find a Zapier webhook for "${webhookCategory}". Please add this webhook in the Zapier Manager or check the category name.`;
        const typingDuration = calculateTypingDuration(notFoundText, TYPING_SPEED);
        
        setTimeout(() => {
          setIsTyping(false);
          
          const botResponse: ChatMessage = {
            id: Date.now().toString(),
            text: notFoundText,
            sender: 'bot',
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, botResponse]);
        }, typingDuration);
      }, getRandomDelay(THINKING_DELAY.min, THINKING_DELAY.max));
      
      return true;
    }
    
    // Webhook found, trigger it
    setIsThinking(true);
    const processingText = `Processing your request with ${webhook.name}...`;
    
    setTimeout(() => {
      setIsThinking(false);
      setIsTyping(true);
      
      const typingDuration = calculateTypingDuration(processingText, TYPING_SPEED);
      
      setTimeout(() => {
        setIsTyping(false);
        
        const processingMessage: ChatMessage = {
          id: Date.now().toString(),
          text: processingText,
          sender: 'bot',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, processingMessage]);
        
        // Now trigger the webhook
        triggerZapierWebhook(webhook, payload || {})
          .then(response => {
            setIsTyping(true);
            
            let resultText;
            if (response.success) {
              resultText = `✅ Successfully triggered "${webhook.name}"! ${response.data ? '\n\n' + parseZapierResponse(response.data) : ''}`;
            } else {
              resultText = `❌ Failed to trigger "${webhook.name}". ${response.error || ''}`;
            }
            
            const resultTypingDuration = calculateTypingDuration(resultText, TYPING_SPEED);
            
            setTimeout(() => {
              setIsTyping(false);
              
              const resultMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                text: resultText,
                sender: 'bot',
                timestamp: new Date(),
              };
              
              setMessages(prev => [...prev, resultMessage]);
            }, resultTypingDuration);
          });
      }, typingDuration);
    }, getRandomDelay(THINKING_DELAY.min, THINKING_DELAY.max));
    
    return true;
  };

  return { handleZapierCommand };
};
