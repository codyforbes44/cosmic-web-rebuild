
import { MessageCircle, X } from 'lucide-react';

interface ChatButtonProps {
  isOpen: boolean;
  unreadCount: number;
  toggle: () => void;
}

export default function ChatButton({ isOpen, unreadCount, toggle }: ChatButtonProps) {
  return (
    <button
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
      className="w-16 h-16 rounded-full bg-accent hover:bg-accent/80 text-white flex items-center justify-center shadow-lg transition-colors relative"
      onClick={toggle}
    >
      {isOpen ? (
        <X className="h-8 w-8" />
      ) : (
        <>
          <MessageCircle className="h-8 w-8" />
          {unreadCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
              {unreadCount}
            </div>
          )}
        </>
      )}
    </button>
  );
}
