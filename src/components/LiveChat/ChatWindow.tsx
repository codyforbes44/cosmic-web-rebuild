
import React from 'react';
import { ChatMessage } from './types';
import ZapierManager from './ZapierManager';
import ChatHeader from './components/ChatHeader';
import ChatContainer from './components/ChatContainer';

interface ChatWindowProps {
  messages: ChatMessage[];
  message: string;
  isTyping: boolean;
  isThinking?: boolean;
  showZapierManager?: boolean;
  suggestedQuestions?: string[];
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  onToggleChat: () => void;
  onToggleZapierManager?: () => void;
  onTogglePin?: () => void;
  isPinned?: boolean;
  chatContainerRef: React.RefObject<HTMLDivElement>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  message,
  isTyping,
  isThinking = false,
  showZapierManager = false,
  suggestedQuestions = [],
  onMessageChange,
  onSendMessage,
  onToggleChat,
  onToggleZapierManager = () => {},
  onTogglePin,
  isPinned = false,
  chatContainerRef
}) => {
  const handleQuickResponse = (response: string) => {
    onMessageChange(response);
    onSendMessage();
  };

  return (
    <>
      <div className="w-[350px] h-[500px] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col chat-window dark:bg-slate-900 dark:border dark:border-slate-700">
        {/* Chat Header */}
        <ChatHeader 
          onToggleChat={onToggleChat}
          onToggleZapierManager={onToggleZapierManager}
          onTogglePin={onTogglePin}
          isPinned={isPinned}
        />

        {/* Chat Container with all messaging components */}
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
