
import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { Send } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { findRelevantResponse } from "./chatbotKnowledge";

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
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
    
    // Generate AI response
    setTimeout(() => {
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
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 h-[450px] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col">
          {/* Chat Header */}
          <div className="bg-space-cadet p-4 text-white font-bold">
            Live Chat
          </div>

          {/* Chat Messages */}
          <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-2">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg p-2 max-w-[70%] ${msg.sender === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200">
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
              />
              <Button onClick={handleSendMessage}><Send className="h-4 w-4"/></Button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="bg-space-cadet text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
      >
        <Avatar className="w-10 h-10">
          <AvatarImage src="/images/3bi-logo-avatar.png" alt="3BI Logo" />
        </Avatar>
      </button>
    </div>
  );
};

export default LiveChat;
