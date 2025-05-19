
import React from 'react';
import { useChatState } from './hooks/useChatState';
import ChatWindow from './ChatWindow';
import ChatToggleButton from './ChatToggleButton';
import { Pin, PinOff } from 'lucide-react';
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
    chatContainerRef,
    setMessage,
    toggleChat,
    togglePin,
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
            onMessageChange={setMessage}
            onSendMessage={handleSendMessage}
            onToggleChat={toggleChat}
            chatContainerRef={chatContainerRef}
          />
          <button 
            onClick={togglePin} 
            className="pin-button"
            aria-label={isPinned ? "Unpin chat" : "Pin chat"}
            title={isPinned ? "Unpin chat" : "Pin chat"}
          >
            {isPinned ? <PinOff size={16} /> : <Pin size={16} />}
          </button>
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
