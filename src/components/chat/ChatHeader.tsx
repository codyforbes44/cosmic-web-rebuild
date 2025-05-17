
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ChatHeaderProps {
  isTyping: boolean;
  minimize: () => void;
  restore: () => void;
  isMinimized: boolean;
}

export default function ChatHeader({ isTyping, minimize, restore, isMinimized }: ChatHeaderProps) {
  return (
    <div className="bg-accent p-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
          <span className="text-accent font-bold text-lg">Ʒ</span>
        </div>
        <div>
          <h3 className="font-bold text-white">Ʒʙɪ Support</h3>
          <div className="text-xs text-white/80" aria-live="polite">
            {isTyping ? 'Typing...' : 'Online'}
          </div>
        </div>
      </div>
      <div className="flex">
        {isMinimized ? (
          <button onClick={restore} aria-label="Restore chat" className="text-white hover:text-white/80">
            <ChevronUp className="h-5 w-5" />
          </button>
        ) : (
          <button onClick={minimize} aria-label="Minimize chat" className="text-white hover:text-white/80 mr-2">
            <ChevronDown className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
