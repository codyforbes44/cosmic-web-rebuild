
import React from 'react';
import { ChatMessage } from './types';
import ZapierManager from './ZapierManager';
import ChatHeader from './components/ChatHeader';
import ChatContainer from './components/ChatContainer';
import type { ZephelState } from './hooks/useZephelState';

interface ChatWindowProps {
  messages: ChatMessage[];
  message: string;
  isTyping: boolean;
  isThinking?: boolean;
  showZapierManager?: boolean;
  suggestedQuestions?: string[];
  isMinimized?: boolean;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  onToggleChat: () => void;
  onToggleMinimize?: () => void;
  onToggleZapierManager?: () => void;
  onTogglePin?: () => void;
  isPinned?: boolean;
  chatContainerRef: React.RefObject<HTMLDivElement>;
  isDraggable?: boolean;
  dragRef?: React.RefObject<HTMLDivElement>;
  onMouseDown?: (e: React.MouseEvent) => void;
  zephelState?: ZephelState;
  onDeactivateZephel?: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  message,
  isTyping,
  isThinking = false,
  showZapierManager = false,
  suggestedQuestions = [],
  isMinimized = false,
  onMessageChange,
  onSendMessage,
  onToggleChat,
  onToggleMinimize = () => {},
  onToggleZapierManager = () => {},
  onTogglePin,
  isPinned = false,
  chatContainerRef,
  isDraggable = false,
  dragRef,
  onMouseDown,
  zephelState,
  onDeactivateZephel
}) => {
  const handleQuickResponse = (response: string) => {
    onMessageChange(response);
    onSendMessage();
  };

  return (
    <>
      <div 
        ref={dragRef}
        className={`w-[350px] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col chat-window dark:bg-slate-900 dark:border dark:border-slate-700 transition-all duration-300 ${
          isMinimized ? 'h-auto' : 'h-[500px]'
        }`}
      >
        {/* Chat Header */}
        <ChatHeader 
          onToggleChat={onToggleChat}
          onToggleMinimize={onToggleMinimize}
          onToggleZapierManager={onToggleZapierManager}
          onTogglePin={onTogglePin}
          isPinned={isPinned}
          isMinimized={isMinimized}
          isDraggable={isDraggable}
          onMouseDown={onMouseDown}
          zephelState={zephelState}
          onDeactivateZephel={onDeactivateZephel}
        />

        {/* Chat Container - only show when not minimized */}
        {!isMinimized && (
          <ChatContainer
            messages={messages}
            message={message}
            isTyping={isTyping}
            isThinking={isThinking}
            suggestedQuestions={suggestedQuestions}
            onMessageChange={onMessageChange}
            onSendMessage={onSendMessage}
            chatContainerRef={chatContainerRef}
            onQuickResponseSelect={handleQuickResponse}
          />
        )}
      </div>
      
      {/* Zapier Manager */}
      {showZapierManager && (
        <ZapierManager
          isOpen={showZapierManager}
          onClose={onToggleZapierManager}
        />
      )}
    </>
  );
};

export default ChatWindow;
