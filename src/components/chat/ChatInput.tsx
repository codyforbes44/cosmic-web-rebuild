
import React from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  newMessage: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function ChatInput({ newMessage, onChange, onSubmit, inputRef }: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="p-4 border-t border-gray-700 bg-space-dark-blue">
      <div className="flex">
        <input
          ref={inputRef}
          type="text"
          className="flex-grow p-2 rounded-l bg-gray-800 border-y border-l border-gray-700 text-gray-200 focus:outline-none"
          placeholder="Type your message..."
          value={newMessage}
          onChange={onChange}
        />
        <button 
          type="submit" 
          className="bg-accent text-white p-2 rounded-r hover:bg-accent/80 transition-colors"
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
