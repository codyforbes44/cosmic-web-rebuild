
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
    <div className="p-4 border-t border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700">
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
          className="flex-1 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
        />
        <Button 
          onClick={onSendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Send className="h-4 w-4"/>
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
