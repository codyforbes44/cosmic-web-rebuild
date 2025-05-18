
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
    unreadMessages,
    chatContainerRef,
    setMessage,
    toggleChat,
    handleSendMessage,
  } = useChatState();

  return (
    <div className="fixed bottom-6 right-6 z-50 dark">
      {/* Chat Window */}
      {isOpen && (
        <ChatWindow
          messages={messages}
          message={message}
          isTyping={isTyping}
          onMessageChange={setMessage}
          onSendMessage={handleSendMessage}
          onToggleChat={toggleChat}
          chatContainerRef={chatContainerRef}
        />
      )}

      {/* Chat Button */}
      <ChatToggleButton
        isOpen={isOpen}
        unreadMessages={unreadMessages}
        onToggle={toggleChat}
      />
    </div>
  );
};

export default LiveChat;
