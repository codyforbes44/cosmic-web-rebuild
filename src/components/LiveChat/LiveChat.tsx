
import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Send, MessageSquare, X, Mic } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { findRelevantResponse } from "./chatbotKnowledge";
import { useToast } from "@/hooks/use-toast";
import './LiveChat.css';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const chatResponses = [
  "Hello! How can I assist you today?",
  "Thank you for reaching out!",
  "We appreciate your interest!",
  "Please provide more details so I can assist you better.",
  "Our team will get back to you shortly."
];

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    
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

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[350px] h-[500px] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col chat-window dark:bg-slate-900 dark:border dark:border-slate-700">
          {/* Chat Header */}
          <div className="bg-space-cadet p-4 flex justify-between items-center dark:bg-slate-800">
            <div className="flex items-center">
              <Avatar className="w-8 h-8 mr-3">
                <AvatarImage src="/images/3bi-logo-avatar.png" alt="3BI Logo" />
              </Avatar>
              <div>
                <h3 className="text-white font-bold">ƷBI Assistant</h3>
                <p className="text-xs text-slate-300">AI powered support</p>
              </div>
            </div>
            <button 
              onClick={toggleChat} 
              className="text-white hover:bg-slate-700 p-1 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Messages */}
          <div 
            ref={chatContainerRef} 
            className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 dark:bg-slate-900"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} message`}
              >
                {msg.sender === 'bot' && (
                  <Avatar className="w-8 h-8 mr-2 flex-shrink-0 self-end">
                    <AvatarImage src="/images/3bi-logo-avatar.png" alt="3BI Logo" />
                  </Avatar>
                )}
                <div 
                  className={`rounded-lg p-3 max-w-[80%] message-bubble ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white user-message'
                      : 'bg-white border border-slate-200 agent-message dark:bg-slate-800 dark:text-white dark:border-slate-700'
                  }`}
                >
                  {msg.text}
                  <div 
                    className={`text-xs mt-1 ${
                      msg.sender === 'user' 
                        ? 'text-blue-100' 
                        : 'text-slate-400'
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
                {msg.sender === 'user' && (
                  <Avatar className="w-8 h-8 ml-2 flex-shrink-0 self-end">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" alt="User" />
                  </Avatar>
                )}
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start message">
                <Avatar className="w-8 h-8 mr-2 flex-shrink-0">
                  <AvatarImage src="/images/3bi-logo-avatar.png" alt="3BI Logo" />
                </Avatar>
                <div className="bg-white rounded-lg p-3 border border-slate-200 typing-indicator dark:bg-slate-800 dark:text-white dark:border-slate-700">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-slate-300 dot dark:bg-slate-600"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-300 dot animation-delay-150 dark:bg-slate-600"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-300 dot animation-delay-300 dark:bg-slate-600"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                className="flex-1 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="h-4 w-4"/>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="bg-space-cadet text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors chat-button relative"
        aria-label="Open chat"
      >
        {unreadMessages > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full unread-badge">
            {unreadMessages}
          </span>
        )}
        {!isOpen ? (
          <MessageSquare className="h-6 w-6" />
        ) : (
          <X className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};

export default LiveChat;
