
import { ChatMessage } from '../types';
import { findRelevantResponse } from '../chatbotKnowledge';
import { useZapierChat } from './useZapierChat';
import { getRandomDelay, calculateTypingDuration } from './chatUtils';
import { THINKING_DELAY, TYPING_SPEED } from './chatStateTypes';

export const useBotResponses = (
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  setIsThinking: React.Dispatch<React.SetStateAction<boolean>>,
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>,
  isAuthenticated: boolean
) => {
  const { handleZapierCommand } = useZapierChat(
    isAuthenticated,
    setMessages,
    setIsThinking,
    setIsTyping
  );

  const generateBotResponse = (userMessage: string) => {
    // First check if this is a Zapier command
    if (userMessage.toLowerCase().startsWith('zap') || 
        userMessage.toLowerCase().startsWith('zapier') || 
        userMessage.toLowerCase().startsWith('trigger')) {
      // Try to process as a Zapier command first
      const isZapierCommand = handleZapierCommand(userMessage);
      if (isZapierCommand) return;
    }
    
    // Regular chatbot response flow
    setIsThinking(true);
    
    // Thinking delay to make it feel more human-like
    setTimeout(() => {
      setIsThinking(false);
      setIsTyping(true);
      
      // First try to find a relevant response from our knowledge base
      // Pass authentication status to the findRelevantResponse function
      const knowledgeResponse = findRelevantResponse(userMessage, isAuthenticated);
      
      // If we have a knowledge-based response, use it
      const botResponse = knowledgeResponse || 
        "I don't have specific information about that. Could you please provide more details or ask about our services, products, or company information?";
      
      // Calculate typing duration based on response length
      const typingDuration = calculateTypingDuration(botResponse, TYPING_SPEED);
      
      // Show bot response after a realistic typing delay
      setTimeout(() => {
        setIsTyping(false);
        
        const newBotMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: 'bot',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, newBotMessage]);
      }, typingDuration);
    }, getRandomDelay(THINKING_DELAY.min, THINKING_DELAY.max));
  };

  return { generateBotResponse };
};
