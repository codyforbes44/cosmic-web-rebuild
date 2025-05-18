
import React from 'react';
import { MessageSquare, X } from 'lucide-react';

interface ChatToggleButtonProps {
  isOpen: boolean;
  unreadMessages: number;
  onToggle: () => void;
}

const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({
  isOpen,
  unreadMessages,
  onToggle
}) => {
  return (
    <button
      onClick={onToggle}
      className="bg-brand-gold text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-all duration-300 chat-button relative"
      aria-label="Open chat"
    >
      {unreadMessages > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse unread-badge">
          {unreadMessages}
        </span>
      )}
      {!isOpen ? (
        <MessageSquare className="h-6 w-6" />
      ) : (
        <X className="h-6 w-6" />
      )}
    </button>
  );
};

export default ChatToggleButton;
