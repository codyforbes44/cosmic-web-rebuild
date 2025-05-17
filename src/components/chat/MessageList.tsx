
import React from 'react';
import { Message } from './types';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  scrollAnchorRef: React.RefObject<HTMLDivElement>;
}

export default function MessageList({ messages, isTyping, scrollAnchorRef }: MessageListProps) {
  return (
    <div className="p-4 overflow-y-auto h-[calc(100%-128px)] bg-space-dark-blue">
      {messages.map(msg => (
        <div key={msg.id} className={`message mb-4 ${msg.sender === 'user' ? 'user-message' : 'agent-message'}`}>
          <div className={`message-bubble p-3 rounded-lg max-w-[80%] ${
            msg.sender === 'user' ? 'bg-accent text-white ml-auto' : 'bg-gray-800 text-gray-200'
          }`}>{msg.text}</div>
          <div className={`message-time text-xs text-gray-500 mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>{msg.time}</div>
        </div>
      ))}
      {isTyping && (
        <div className="typing-indicator flex space-x-1 p-2 bg-gray-800 rounded-lg w-16">
          <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
          <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
          <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
        </div>
      )}
      <div ref={scrollAnchorRef} />
    </div>
  );
}
