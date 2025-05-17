
import React from 'react';
import { Message } from './types';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  scrollAnchorRef: React.RefObject<HTMLDivElement>;
}

export default function MessageList({ messages, isTyping, scrollAnchorRef }: MessageListProps) {
  return (
    <div className="p-4 overflow-y-auto h-[calc(100%-128px)] bg-space-dark-blue scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
      {messages.map(msg => (
        <div key={msg.id} className={`message mb-4 ${msg.sender === 'user' ? 'user-message' : 'agent-message'}`}>
          <div className={`message-bubble p-3 rounded-lg max-w-[80%] shadow-sm ${
            msg.sender === 'user' ? 
            'bg-accent text-white ml-auto rounded-tr-none' : 
            'bg-gray-800 text-gray-200 rounded-tl-none'
          }`}>
            {msg.text.split('\n').map((text, i) => (
              <React.Fragment key={i}>
                {text}
                {i !== msg.text.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
          <div className={`message-time text-xs text-gray-500 mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>{msg.time}</div>
        </div>
      ))}
      {isTyping && (
        <div className="typing-indicator flex space-x-1.5 p-3 bg-gray-800 rounded-lg w-24 rounded-tl-none mb-4">
          <span className="dot w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
          <span className="dot w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
          <span className="dot w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
        </div>
      )}
      <div ref={scrollAnchorRef} />
    </div>
  );
}
