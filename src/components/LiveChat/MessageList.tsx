
import React, { useEffect } from 'react';
import { ChatMessage } from './types';
import { Loader2 } from 'lucide-react';

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
  // Scroll to bottom when messages change or typing status changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping, isThinking, chatContainerRef]);

  // Format timestamp
  const formatTime = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  };

  return (
    <div 
      ref={chatContainerRef}
      className="flex-1 overflow-y-auto p-4 bg-white dark:bg-slate-900"
    >
      {messages.map((msg) => (
        <div key={msg.id} className={`message ${msg.sender}`}>
          {msg.text}
          <div className="text-xs opacity-70 text-right mt-1">
            {formatTime(msg.timestamp)}
          </div>
        </div>
      ))}
      
      {/* Thinking indicator */}
      {isThinking && (
        <div className="thinking-spinner">
          <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
        </div>
      )}
      
      {/* Typing indicator */}
      {isTyping && (
        <div className="typing-indicator">
          <span className="flex space-x-1">
            <span className="animate-bounce">·</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>·</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>·</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default MessageList;
