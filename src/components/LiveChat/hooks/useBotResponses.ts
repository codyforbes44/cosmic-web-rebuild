
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

  const { invoke: invokeOpenAI, isLoading: isAILoading } = useOpenAI({
    functionName: 'openai-chat',
    onSuccess: (data) => {
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
        setIsThinking(false);
        setIsTyping(false);
        
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: "I'm having trouble processing that request. Please try again.",
          sender: 'bot',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, errorMessage]);
      }
    },
    onError: (error) => {
      console.error('OpenAI API error:', error);
      setIsThinking(false);
      setIsTyping(false);
      
      // Fallback to knowledge base
      const knowledgeResponse = findRelevantResponse(lastUserMessage, isAuthenticated);
      const fallbackResponse = knowledgeResponse || 
        "I'm experiencing technical difficulties. How can I help you with our services?";
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: fallbackResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  });

  let lastUserMessage = '';

  // Get suggestions for quick responses from knowledge base
  const getSuggestions = (): string[] => {
    return getSuggestedQuestions();
  };

  const generateBotResponse = async (userMessage: string) => {
    lastUserMessage = userMessage;
    
    // First check if this is a Zapier command
    if (userMessage.toLowerCase().startsWith('zap') || 
        userMessage.toLowerCase().startsWith('zapier') || 
        userMessage.toLowerCase().startsWith('trigger')) {
      const isZapierCommand = handleZapierCommand(userMessage);
      if (isZapierCommand) return;
    }
    
    // Use OpenAI for AI-powered responses
    setIsThinking(true);
    
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
        Be friendly and professional, representing the ƷBI brand.`
      });
      
      await invokeOpenAI(aiRequest);
    } catch (error) {
      console.error('Failed to generate AI response:', error);
      
      // Fallback to knowledge-based response
      setTimeout(() => {
        setIsThinking(false);
        setIsTyping(true);
        
        const knowledgeResponse = findRelevantResponse(userMessage, isAuthenticated);
        const botResponse = knowledgeResponse || 
          "I don't have specific information about that. Could you please provide more details or ask about our services?";
        
        const typingDuration = calculateTypingDuration(botResponse, TYPING_SPEED);
        
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
    }
  };

  return { generateBotResponse, getSuggestions };
};
