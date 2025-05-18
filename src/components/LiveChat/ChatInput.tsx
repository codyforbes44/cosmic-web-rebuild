
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';

interface ChatInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  message, 
  onMessageChange, 
  onSendMessage 
}) => {
  return (
    <div className="p-4 border-t border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-700">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSendMessage();
            }
          }}
          className="flex-1 rounded-full dark:bg-slate-800 dark:border-slate-700 dark:text-white"
        />
        <Button 
          onClick={onSendMessage}
          className="bg-brand-gold hover:bg-brand-gold/80 text-white rounded-full aspect-square p-0 w-10 h-10 flex items-center justify-center"
        >
          <Send className="h-4 w-4"/>
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
