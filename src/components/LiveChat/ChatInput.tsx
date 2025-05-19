
import React, { KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  isDisabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  message, 
  onMessageChange, 
  onSendMessage,
  isDisabled = false
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isDisabled && message.trim()) {
        onSendMessage();
      }
    }
  };

  return (
    <div className={`p-3 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-end gap-2 ${isDisabled ? 'opacity-70' : ''}`}>
      <Textarea
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={isDisabled ? "Please wait..." : "Type your message..."}
        className="min-h-[40px] max-h-[120px] focus-visible:ring-1 focus-visible:ring-brand-gold focus-visible:ring-offset-0 resize-none"
        disabled={isDisabled}
      />
      <button
        onClick={onSendMessage}
        disabled={isDisabled || !message.trim()}
        className={`p-2 rounded-full bg-brand-gold text-white 
                   ${(!message.trim() || isDisabled) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-gold/80'} 
                   flex-shrink-0 transition-colors`}
        aria-label="Send message"
      >
        <Send size={18} />
      </button>
    </div>
  );
};

export default ChatInput;
