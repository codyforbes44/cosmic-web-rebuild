
import { X } from 'lucide-react';

interface ChatButtonProps {
  isOpen: boolean;
  unreadCount: number;
  toggle: () => void;
}

export default function ChatButton({ isOpen, unreadCount, toggle }: ChatButtonProps) {
  return (
    <button
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
      className="w-16 h-16 rounded-full bg-accent hover:bg-accent/90 text-white flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105 pulse-animation overflow-hidden border-2 border-white"
      onClick={toggle}
    >
      {isOpen ? (
        <X className="h-8 w-8" />
      ) : (
        <>
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-accent to-accent/70">
            <div className="font-bold text-xl">ƷBI</div>
          </div>
          {unreadCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
              {unreadCount}
            </div>
          )}
        </>
      )}
    </button>
  );
}
