
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
      className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-300 z-50 flex items-center justify-center ${
        isOpen 
          ? 'bg-red-500 hover:bg-red-600' 
          : 'bg-accent hover:bg-accent/90'
      }`}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      {isOpen ? (
        <X className="w-6 h-6 text-white" />
      ) : (
        <div className="relative">
          <MessageSquare className="w-6 h-6 text-white" />
          {unreadMessages > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadMessages > 9 ? '9+' : unreadMessages}
            </span>
          )}
        </div>
      )}
    </button>
  );
};

export default ChatToggleButton;
