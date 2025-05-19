
import React, { useEffect } from 'react';
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { BrainCircuit, Loader2 } from 'lucide-react';
import { ChatMessage } from './types';

interface MessageListProps {
  messages: ChatMessage[];
  isTyping: boolean;
  isThinking?: boolean;
  chatContainerRef: React.RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  isTyping, 
  isThinking = false,
  chatContainerRef 
}) => {
  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping, isThinking]);

  return (
    <div 
      ref={chatContainerRef} 
      className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 dark:bg-slate-900"
    >
      {messages.map((msg) => (
        <div 
          key={msg.id} 
          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} message animate-fade-in`}
        >
          {msg.sender === 'bot' && (
            <Avatar className="w-8 h-8 mr-2 flex-shrink-0 self-end border-2 border-white/10 dark:border-slate-700">
              <AvatarImage src="/lovable-uploads/934f1150-c3bd-4fb4-9445-ec288ccb6c47.png" alt="3BI Logo" />
            </Avatar>
          )}
          <div 
            className={`rounded-2xl p-3 max-w-[80%] message-bubble ${
              msg.sender === 'user' 
                ? 'bg-brand-gold text-white user-message'
                : 'bg-white border border-slate-100 agent-message dark:bg-slate-800 dark:text-white dark:border-slate-700'
            }`}
          >
            {msg.text}
            <div 
              className={`text-xs mt-1 ${
                msg.sender === 'user' 
                  ? 'text-white/70' 
                  : 'text-slate-400'
              }`}
            >
              {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
          </div>
          {msg.sender === 'user' && (
            <Avatar className="w-8 h-8 ml-2 flex-shrink-0 self-end border-2 border-white/10 dark:border-slate-700">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" alt="User" />
            </Avatar>
          )}
        </div>
      ))}
      
      {/* Thinking indicator */}
      {isThinking && (
        <div className="flex justify-start message animate-fade-in">
          <Avatar className="w-8 h-8 mr-2 flex-shrink-0 border-2 border-white/10 dark:border-slate-700">
            <AvatarImage src="/lovable-uploads/934f1150-c3bd-4fb4-9445-ec288ccb6c47.png" alt="3BI Logo" />
          </Avatar>
          <div className="bg-white rounded-2xl p-3 border border-slate-100 thinking-indicator dark:bg-slate-800 dark:text-white dark:border-slate-700 flex items-center">
            <BrainCircuit size={16} className="mr-2 text-brand-gold animate-pulse" />
            <span className="text-sm text-slate-500 dark:text-slate-300">Thinking</span>
            <Loader2 className="ml-2 h-4 w-4 animate-spin text-brand-gold" />
          </div>
        </div>
      )}
      
      {/* Typing indicator */}
      {isTyping && (
        <div className="flex justify-start message animate-fade-in">
          <Avatar className="w-8 h-8 mr-2 flex-shrink-0 border-2 border-white/10 dark:border-slate-700">
            <AvatarImage src="/lovable-uploads/934f1150-c3bd-4fb4-9445-ec288ccb6c47.png" alt="3BI Logo" />
          </Avatar>
          <div className="bg-white rounded-2xl p-3 border border-slate-100 typing-indicator dark:bg-slate-800 dark:text-white dark:border-slate-700">
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-brand-gold animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;
