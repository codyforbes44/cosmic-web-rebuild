
import React, { useEffect } from 'react';
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { ChatMessage } from './types';

interface MessageListProps {
  messages: ChatMessage[];
  isTyping: boolean;
  chatContainerRef: React.RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping, chatContainerRef }) => {
  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
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
  );
};

export default MessageList;
