
import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { findRelevantResponse } from "../chatbotKnowledge";

const chatResponses = [
  "Hello! How can I assist you today?",
  "Thank you for reaching out!",
  "We appreciate your interest!",
  "Please provide more details so I can assist you better.",
  "Our team will get back to you shortly."
];

export const useChatState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update unread count if chat is not open
    if (!isOpen && messages.length > 0 && messages[messages.length - 1].sender === 'bot') {
      setUnreadMessages(prev => prev + 1);
    }
  }, [messages, isOpen]);

  useEffect(() => {
    // Show welcome message when chat is first opened
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        const welcomeMessage: ChatMessage = {
          id: Date.now().toString(),
          text: "👋 Welcome to ƷBI! How can I help you today?",
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
      }, 500);
    }
    
    // Reset unread count when opening the chat
    if (isOpen) {
      setUnreadMessages(0);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
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
    
    // Show typing indicator
    setIsTyping(true);
    
    // Generate AI response with a realistic delay
    setTimeout(() => {
      setIsTyping(false);
      
      // First try to find a relevant response from our knowledge base
      const knowledgeResponse = findRelevantResponse(message);
      
      // If we have a knowledge-based response, use it
      if (knowledgeResponse) {
        const newBotMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: knowledgeResponse,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, newBotMessage]);
      } else {
        // Fall back to predefined responses
        const responseIndex = Math.floor(Math.random() * chatResponses.length);
        const botResponse = chatResponses[responseIndex];
        
        const newBotMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, newBotMessage]);
      }
    }, Math.random() * 1000 + 1000); // Random delay between 1-2 seconds for realism
  };

  return {
    isOpen,
    messages,
    message,
    isTyping,
    unreadMessages,
    chatContainerRef,
    setMessage,
    toggleChat,
    handleSendMessage,
  };
};
