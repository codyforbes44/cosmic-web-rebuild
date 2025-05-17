
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
    <form onSubmit={onSubmit} className="p-4 border-t border-gray-700 bg-space-dark-blue rounded-b-lg">
      <div className="flex shadow-sm rounded-full overflow-hidden border border-gray-600 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all duration-200">
        <input
          ref={inputRef}
          type="text"
          className="flex-grow p-3 bg-gray-800 text-gray-200 focus:outline-none placeholder:text-gray-400 rounded-l-full"
          placeholder="Type your message..."
          value={newMessage}
          onChange={onChange}
        />
        <button 
          type="submit" 
          className="bg-accent text-white p-3 hover:bg-accent/80 transition-colors rounded-r-full"
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
