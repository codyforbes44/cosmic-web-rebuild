
import React from 'react';
import { X, Pin, PinOff, Settings, Minimize2, Maximize2 } from 'lucide-react';
import type { ZephelState } from '../hooks/useZephelState';

interface ChatHeaderProps {
  onToggleChat: () => void;
  onToggleMinimize?: () => void;
  onToggleZapierManager?: () => void;
  onTogglePin?: () => void;
  isPinned?: boolean;
  isMinimized?: boolean;
  isDraggable?: boolean;
  onMouseDown?: (e: React.MouseEvent) => void;
  zephelState?: ZephelState;
  onDeactivateZephel?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  onToggleChat,
  onToggleMinimize = () => {},
  onToggleZapierManager = () => {},
  onTogglePin = () => {},
  isPinned = false,
  isMinimized = false,
  isDraggable = false,
  onMouseDown,
  zephelState,
  onDeactivateZephel
}) => {
  return (
    <div 
      className={`bg-accent text-white p-4 flex items-center justify-between ${
        isDraggable ? 'cursor-move' : ''
      }`}
      onMouseDown={onMouseDown}
    >
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        <span className="font-medium">
          {zephelState?.isActive ? '🧠 ZEPHEL Active' : 'ƷBI Assistant'}
        </span>
        {zephelState?.isActive && (
          <button
            onClick={onDeactivateZephel}
            className="text-xs px-2 py-1 bg-red-500 rounded hover:bg-red-600 transition-colors"
          >
            Deactivate
          </button>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        {/* Settings button */}
        <button
          onClick={onToggleZapierManager}
          className="p-1 hover:bg-white/20 rounded transition-colors"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
        
        {/* Pin/Unpin button */}
        <button
          onClick={onTogglePin}
          className="p-1 hover:bg-white/20 rounded transition-colors"
          title={isPinned ? 'Unpin' : 'Pin'}
        >
          {isPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
        </button>
        
        {/* Minimize/Maximize button - only show in floating state */}
        {!isPinned && (
          <button
            onClick={onToggleMinimize}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            title={isMinimized ? 'Maximize' : 'Minimize'}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
        )}
        
        {/* Close button */}
        <button
          onClick={onToggleChat}
          className="p-1 hover:bg-white/20 rounded transition-colors"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
