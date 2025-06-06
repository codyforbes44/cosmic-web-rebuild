
import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Pin, X, GripHorizontal, Zap } from 'lucide-react';
import type { ZephelState } from '../hooks/useZephelState';

interface ChatHeaderProps {
  onToggleChat: () => void;
  onToggleZapierManager: () => void;
  isPinned?: boolean;
  onTogglePin?: () => void;
  isDraggable?: boolean;
  onMouseDown?: (e: React.MouseEvent) => void;
  zephelState?: ZephelState;
  onDeactivateZephel?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  onToggleChat,
  onToggleZapierManager,
  isPinned = false,
  onTogglePin,
  isDraggable = false,
  onMouseDown,
  zephelState,
  onDeactivateZephel
}) => {
  return (
    <div 
      className={`bg-gradient-to-r ${
        zephelState?.isActive 
          ? 'from-purple-600 to-purple-800' 
          : 'from-brand-gold to-brand-gold/80'
      } p-4 flex justify-between items-center ${
        isDraggable ? 'cursor-move' : ''
      }`}
      onMouseDown={isDraggable ? onMouseDown : undefined}
    >
      <div className="flex items-center">
        <Avatar className="w-10 h-10 mr-3 ring-2 ring-white/30 border-2 border-white/20">
          <AvatarImage src="/lovable-uploads/934f1150-c3bd-4fb4-9445-ec288ccb6c47.png" alt="3BI Logo" />
        </Avatar>
        <div>
          <h3 className="text-white font-bold text-lg">
            {zephelState?.isActive ? '🧠 ZEPHEL' : 'ƷBI Assistant'}
          </h3>
          <p className="text-xs text-white/80">
            {zephelState?.isActive ? 'Architect-Class Directive System' : 'AI powered support'}
          </p>
        </div>
        {isDraggable && (
          <GripHorizontal className="ml-2 text-white/60" size={16} />
        )}
      </div>
      <div className="flex items-center">
        {zephelState?.isActive && onDeactivateZephel && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDeactivateZephel();
            }} 
            className="text-white hover:bg-white/10 p-2 rounded-full transition-colors mr-1"
            aria-label="Deactivate ZEPHEL"
            title="Deactivate ZEPHEL"
          >
            <Zap size={18} />
          </button>
        )}
        {onTogglePin && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin();
            }} 
            className="text-white hover:bg-white/10 p-2 rounded-full transition-colors mr-1"
            aria-label={isPinned ? "Unpin chat" : "Pin chat"}
            title={isPinned ? "Unpin chat" : "Pin chat"}
          >
            <Pin size={18} />
          </button>
        )}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleChat();
          }} 
          className="text-white hover:bg-white/10 p-2 rounded-full transition-colors"
          aria-label="Close chat"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
