
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ChatHeaderProps {
  isTyping: boolean;
  minimize: () => void;
  restore: () => void;
  isMinimized: boolean;
}

export default function ChatHeader({ isTyping, minimize, restore, isMinimized }: ChatHeaderProps) {
  return (
    <div className="bg-accent p-3 flex justify-between items-center rounded-t-lg shadow-md h-12">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2.5 shadow-inner">
          <span className="text-accent font-bold text-base">Ʒ</span>
        </div>
        <div>
          <h3 className="font-bold text-white text-sm">Ask Ʒʙɪ</h3>
          <div className="text-xs text-white/80" aria-live="polite">
            {isTyping ? 
              <span className="flex items-center">
                Typing<span className="typing-animation ml-1">...</span>
              </span> : 
              <span className="flex items-center">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>Online
              </span>
            }
          </div>
        </div>
      </div>
      <div className="flex">
        {isMinimized ? (
          <button onClick={restore} aria-label="Restore chat" className="text-white hover:text-white/80 transition-colors">
            <ChevronUp className="h-4 w-4" />
          </button>
        ) : (
          <button onClick={minimize} aria-label="Minimize chat" className="text-white hover:text-white/80 transition-colors">
            <ChevronDown className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
