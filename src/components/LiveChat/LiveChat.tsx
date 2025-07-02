
import React from 'react';
import { useChatState } from './hooks/useChatState';
import { useDragWindow } from './hooks/useDragWindow';
import ChatWindow from './ChatWindow';
import ChatToggleButton from './ChatToggleButton';
import './LiveChat.css';

const LiveChat = () => {
  const {
    isOpen,
    messages,
    message,
    isTyping,
    isThinking,
    unreadMessages,
    isPinned,
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

  const { position, isDragging, dragRef, handleMouseDown } = useDragWindow();

  return (
    <div className={`chat-container dark ${isPinned ? 'chat-pinned' : 'chat-floating'}`}>
      {/* Chat Window */}
      {isOpen && (
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
      )}

      {/* Chat Button - only show when not pinned or chat is closed */}
      {(!isPinned || !isOpen) && (
        <ChatToggleButton
          isOpen={isOpen}
          unreadMessages={unreadMessages}
          onToggle={toggleChat}
        />
      )}
    </div>
  );
};

export default LiveChat;
