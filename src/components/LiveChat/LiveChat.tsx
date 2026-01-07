import React from 'react';
import { useChatState } from './hooks/useChatState';
import { useDragWindow } from './hooks/useDragWindow';
import ChatWindow from './ChatWindow';
import { useFloatingButtonContext } from '@/context/FloatingButtonContext';
import './LiveChat.css';

const LiveChat = () => {
  const { isChatOpen: isOpen, isPinned } = useFloatingButtonContext();
  
  const {
    messages,
    message,
    isTyping,
    isThinking,
    isMinimized,
    showZapierManager,
    chatContainerRef,
    suggestedQuestions,
    zephelState,
    deactivateZephel,
    setMessage,
    toggleChat,
    toggleMinimize,
    togglePin,
    toggleZapierManager,
    handleSendMessage,
  } = useChatState();

  const { position, dragRef, handleMouseDown } = useDragWindow();

  if (!isOpen) return null;

  return (
    <div className={`chat-container dark ${isPinned ? 'chat-pinned' : 'chat-floating'}`}>
      <div 
        className="chat-window-wrapper"
        style={
          isPinned 
            ? { 
                position: 'fixed',
                left: `${position.x}px`,
                top: `${position.y}px`,
                bottom: 'auto',
                right: 'auto',
                zIndex: 1000
              } 
            : {}
        }
      >
        <ChatWindow
          messages={messages}
          message={message}
          isTyping={isTyping}
          isThinking={isThinking}
          showZapierManager={showZapierManager}
          suggestedQuestions={suggestedQuestions}
          isMinimized={isMinimized}
          onMessageChange={setMessage}
          onSendMessage={handleSendMessage}
          onToggleChat={toggleChat}
          onToggleMinimize={toggleMinimize}
          onToggleZapierManager={toggleZapierManager}
          onTogglePin={togglePin}
          isPinned={isPinned}
          chatContainerRef={chatContainerRef}
          isDraggable={isPinned}
          dragRef={isPinned ? dragRef : undefined}
          onMouseDown={isPinned ? handleMouseDown : undefined}
          zephelState={zephelState}
          onDeactivateZephel={deactivateZephel}
        />
      </div>
    </div>
  );
};

export default LiveChat;
