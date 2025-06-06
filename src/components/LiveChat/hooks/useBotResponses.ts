
import { ChatMessage } from '../types';
import { findRelevantResponse, getSuggestedQuestions } from '../chatbotKnowledge';
import { useZapierChat } from './useZapierChat';
import { getRandomDelay, calculateTypingDuration } from './chatUtils';
import { THINKING_DELAY, TYPING_SPEED } from './chatStateTypes';
import { useOpenAI } from '@/hooks/useOpenAI';
import { buildOpenAIRequest, formatAIResponse } from '@/utils/aiUtils';

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

  let lastUserMessage = '';
  let isRequestInProgress = false;

  const { invoke: invokeOpenAI, isLoading: isAILoading } = useOpenAI({
    functionName: 'openai-chat',
    onSuccess: (data) => {
      isRequestInProgress = false;
      setIsThinking(false);
      setIsTyping(true);
      
      try {
        const aiResponse = formatAIResponse(data);
        const typingDuration = calculateTypingDuration(aiResponse, TYPING_SPEED);
        
        setTimeout(() => {
          setIsTyping(false);
          
          const newBotMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: aiResponse,
            sender: 'bot',
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, newBotMessage]);
        }, typingDuration);
      } catch (error) {
        console.error('Error formatting AI response:', error);
        handleFallbackResponse();
      }
    },
    onError: (error) => {
      console.error('OpenAI API error:', error);
      isRequestInProgress = false;
      handleFallbackResponse();
    }
  });

  const handleFallbackResponse = () => {
    setIsThinking(false);
    setIsTyping(true);
    
    const knowledgeResponse = findRelevantResponse(lastUserMessage, isAuthenticated);
    const fallbackResponse = knowledgeResponse || 
      "I'm experiencing technical difficulties. How can I help you with our services?";
    
    const typingDuration = calculateTypingDuration(fallbackResponse, TYPING_SPEED);
    
    setTimeout(() => {
      setIsTyping(false);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: fallbackResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }, typingDuration);
  };

  // Get suggestions for quick responses from knowledge base
  const getSuggestions = (): string[] => {
    return getSuggestedQuestions();
  };

  const generateBotResponse = async (userMessage: string) => {
    // Prevent multiple concurrent requests
    if (isRequestInProgress || isAILoading) {
      console.log('Request already in progress, skipping...');
      return;
    }

    lastUserMessage = userMessage;
    
    // First check if this is a Zapier command
    if (userMessage.toLowerCase().startsWith('zap') || 
        userMessage.toLowerCase().startsWith('zapier') || 
        userMessage.toLowerCase().startsWith('trigger')) {
      const isZapierCommand = handleZapierCommand(userMessage);
      if (isZapierCommand) return;
    }
    
    // Try OpenAI first, but with rate limiting protection
    setIsThinking(true);
    isRequestInProgress = true;
    
    try {
      const aiRequest = buildOpenAIRequest(userMessage, {
        model: 'fast',
        systemPrompt: `You are ƷBI's helpful AI assistant. You help visitors learn about ƷBI's services including:
        - AI Solutions & Custom Development
        - Digital Marketing & Social Media
        - Web Development & Design
        - Business Strategy & Analytics
        - Recruitment Marketing
        
        Keep responses conversational, helpful, and focused on how ƷBI can help their business grow.
        If asked about pricing or specific quotes, direct them to contact the sales team.
        Be friendly and professional, representing the ƷBI brand.
        Keep responses under 100 words when possible.`
      });
      
      // Add a small delay to help with rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
      await invokeOpenAI(aiRequest);
    } catch (error) {
      console.error('Failed to generate AI response:', error);
      isRequestInProgress = false;
      
      // Immediate fallback to knowledge-based response
      setTimeout(() => {
        handleFallbackResponse();
      }, getRandomDelay(THINKING_DELAY.min, THINKING_DELAY.max));
    }
  };

  return { generateBotResponse, getSuggestions };
};
