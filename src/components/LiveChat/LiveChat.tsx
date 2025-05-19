
import React from 'react';
import { useChatState } from './hooks/useChatState';
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
    showZapierManager,
    chatContainerRef,
    suggestedQuestions,
    setMessage,
    toggleChat,
    togglePin,
    toggleZapierManager,
    handleSendMessage,
  } = useChatState();

  return (
    <div className={`chat-container dark ${isPinned ? 'chat-pinned' : 'chat-floating'}`}>
      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window-wrapper">
          <ChatWindow
            messages={messages}
            message={message}
            isTyping={isTyping}
            isThinking={isThinking}
            showZapierManager={showZapierManager}
            suggestedQuestions={suggestedQuestions}
            onMessageChange={setMessage}
            onSendMessage={handleSendMessage}
            onToggleChat={toggleChat}
            onToggleZapierManager={toggleZapierManager}
            onTogglePin={togglePin}
            isPinned={isPinned}
            chatContainerRef={chatContainerRef}
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
