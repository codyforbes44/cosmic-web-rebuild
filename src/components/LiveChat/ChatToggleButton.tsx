import React from 'react';
import { MessageSquare, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatToggleButtonProps {
  isOpen: boolean;
  unreadMessages: number;
  onToggle: () => void;
  className?: string;
}

const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({
  isOpen,
  unreadMessages,
  onToggle,
  className
}) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center",
        isOpen 
          ? 'bg-destructive hover:bg-destructive/90' 
          : 'bg-accent hover:bg-accent/90',
        className
      )}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      {isOpen ? (
        <X className="w-6 h-6 text-white" />
      ) : (
        <div className="relative">
          <MessageSquare className="w-6 h-6 text-white" />
          {unreadMessages > 0 && (
            <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadMessages > 9 ? '9+' : unreadMessages}
            </span>
          )}
        </div>
      )}
    </button>
  );
};

export default ChatToggleButton;
