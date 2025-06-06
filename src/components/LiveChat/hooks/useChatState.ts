import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { useToast } from '@/hooks/use-toast';
import { useBotResponses } from './useBotResponses';
import { getRandomDelay, calculateTypingDuration } from './chatUtils';
import { THINKING_DELAY, TYPING_SPEED, ChatState } from './chatStateTypes';
import { useOpenAI } from '@/hooks/useOpenAI';
import { buildOpenAIRequest, formatAIResponse } from '@/utils/aiUtils';

export const useChatState = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [isPinned, setIsPinned] = useState<boolean>(false);
  const [isSendingFirstMessage, setIsSendingFirstMessage] = useState<boolean>(true);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [showZapierManager, setShowZapierManager] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Check if user is authenticated (could connect to your auth system)
  // For now, defaulting to false as most chat visitors are anonymous
  const isAuthenticated = false;

  const { generateBotResponse, getSuggestions } = useBotResponses(
    setMessages, 
    setIsThinking, 
    setIsTyping, 
    isAuthenticated
  );

  // OpenAI hook for welcome message
  const { invoke: invokeWelcomeAI } = useOpenAI({
    functionName: 'openai-chat',
    onSuccess: (data) => {
      setIsThinking(false);
      setIsTyping(true);
      
      try {
        const welcomeText = formatAIResponse(data);
        const typingDuration = Math.min(welcomeText.length * TYPING_SPEED.min, 2000);
        
        setTimeout(() => {
          setIsTyping(false);
          const welcomeMessage: ChatMessage = {
            id: Date.now().toString(),
            text: welcomeText,
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages([welcomeMessage]);
          setIsSendingFirstMessage(false);
        }, typingDuration);
      } catch (error) {
        // Fallback to default welcome message
        setIsThinking(false);
        setIsTyping(true);
        
        const defaultWelcome = "👋 Welcome to ƷBI! How can I help you today?";
        const typingDuration = Math.min(defaultWelcome.length * TYPING_SPEED.min, 2000);
        
        setTimeout(() => {
          setIsTyping(false);
          const welcomeMessage: ChatMessage = {
            id: Date.now().toString(),
            text: defaultWelcome,
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages([welcomeMessage]);
          setIsSendingFirstMessage(false);
        }, typingDuration);
      }
    },
    onError: () => {
      // Fallback to default welcome message
      setIsThinking(false);
      setIsTyping(true);
      
      const defaultWelcome = "👋 Welcome to ƷBI! How can I help you today?";
      const typingDuration = Math.min(defaultWelcome.length * TYPING_SPEED.min, 2000);
      
      setTimeout(() => {
        setIsTyping(false);
        const welcomeMessage: ChatMessage = {
          id: Date.now().toString(),
          text: defaultWelcome,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
        setIsSendingFirstMessage(false);
      }, typingDuration);
    }
  });

  // Get suggested questions from knowledge base
  const suggestedQuestions = getSuggestions();

  useEffect(() => {
    // Update unread count if chat is not open
    if (!isOpen && messages.length > 0 && messages[messages.length - 1].sender === 'bot') {
      setUnreadMessages(prev => prev + 1);
      
      // Show a toast notification when new message arrives and chat is closed
      toast({
        title: "New message from ƷBI Assistant",
        description: messages[messages.length - 1].text.substring(0, 60) + (messages[messages.length - 1].text.length > 60 ? '...' : ''),
        duration: 5000,
      });
    }
  }, [messages, isOpen, toast]);

  useEffect(() => {
    // Show AI-generated welcome message when chat is first opened
    if (isOpen && messages.length === 0) {
      setIsThinking(true);
      
      const welcomeRequest = buildOpenAIRequest(
        "Generate a brief, friendly welcome message for ƷBI's website chat. Keep it under 20 words.",
        {
          model: 'fast',
          systemPrompt: 'You are ƷBI\'s AI assistant. Generate a warm, professional welcome message.',
          maxTokens: 50
        }
      );
      
      try {
        invokeWelcomeAI(welcomeRequest);
      } catch (error) {
        console.error('Failed to generate welcome message:', error);
        // Fallback handled in onError
      }
    }
    
    // Reset unread count when opening the chat
    if (isOpen) {
      setUnreadMessages(0);
    }
  }, [isOpen, invokeWelcomeAI]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const togglePin = () => {
    setIsPinned(prev => !prev);
    
    // Ensure chat is open when pinned
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const toggleZapierManager = () => {
    // Only allow authenticated users to access Zapier Manager
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "You need to sign in to access Zapier integrations.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setShowZapierManager(prev => !prev);
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    // Add the user message to the chat
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setMessage('');
    
    // Generate AI response
    generateBotResponse(message);
  };

  return {
    isOpen,
    messages,
    message,
    isTyping,
    isThinking,
    unreadMessages,
    isPinned,
    isSendingFirstMessage,
    showZapierManager,
    chatContainerRef,
    suggestedQuestions,
    setMessage,
    toggleChat,
    togglePin,
    toggleZapierManager,
    handleSendMessage,
  };
};
