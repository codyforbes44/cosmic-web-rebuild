import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { findRelevantResponse } from "../chatbotKnowledge";
import { useToast } from '@/hooks/use-toast';
import { 
  processZapierCommand, 
  findWebhookByCategory, 
  triggerZapierWebhook,
  parseZapierResponse,
} from '../zapierIntegration';

export const useChatState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [isSendingFirstMessage, setIsSendingFirstMessage] = useState(true);
  const [isThinking, setIsThinking] = useState(false);
  const [showZapierManager, setShowZapierManager] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Check if user is authenticated (could connect to your auth system)
  // For now, defaulting to false as most chat visitors are anonymous
  const isAuthenticated = false;

  // Animation timing constants for more realistic typing
  const THINKING_DELAY = { min: 300, max: 800 };
  const TYPING_SPEED = { min: 30, max: 70 }; // ms per character

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
    // Show welcome message when chat is first opened
    if (isOpen && messages.length === 0) {
      setIsThinking(true);
      setTimeout(() => {
        setIsThinking(false);
        setIsTyping(true);
        
        const welcomeText = "👋 Welcome to ƷBI! How can I help you today?";
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
      }, getRandomDelay(THINKING_DELAY.min, THINKING_DELAY.max));
    }
    
    // Reset unread count when opening the chat
    if (isOpen) {
      setUnreadMessages(0);
    }
  }, [isOpen]);

  const getRandomDelay = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const calculateTypingDuration = (text: string) => {
    // Calculate a realistic typing duration based on text length
    const baseDelay = 500; // base delay in milliseconds
    const charsPerSecond = getRandomDelay(TYPING_SPEED.min, TYPING_SPEED.max);
    return baseDelay + (text.length / charsPerSecond) * 1000;
  };

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

  // Handle Zapier command processing
  const handleZapierCommand = async (userMessage: string) => {
    // Block Zapier commands for unauthenticated users
    if (!isAuthenticated) {
      setIsThinking(true);
      setTimeout(() => {
        setIsThinking(false);
        setIsTyping(true);
        
        const authRequiredText = "I'm sorry, Zapier integration features are only available to authenticated users. Please sign in to access this functionality.";
        const typingDuration = calculateTypingDuration(authRequiredText);
        
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
        const typingDuration = calculateTypingDuration(notFoundText);
        
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
      
      const typingDuration = calculateTypingDuration(processingText);
      
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
            
            const resultTypingDuration = calculateTypingDuration(resultText);
            
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
        "I don't have specific information about that. Could you provide more details or ask about our services, products, or company information?";
      
      // Calculate typing duration based on response length
      const typingDuration = calculateTypingDuration(botResponse);
      
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
    
    // Generate AI response with a realistic delay
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
    setMessage,
    toggleChat,
    togglePin,
    toggleZapierManager,
    handleSendMessage,
  };
};
